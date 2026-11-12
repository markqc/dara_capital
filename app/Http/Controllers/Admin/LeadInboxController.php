<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\StreamedResponse;

class LeadInboxController extends Controller
{
    public function index(Request $request): Response
    {
        $status = $request->string('status')->toString();

        return Inertia::render('admin/leads/index', [
            'leads' => Lead::latest()
                ->when(in_array($status, Lead::STATUSES, true), fn ($q) => $q->where('status', $status))
                ->paginate(20)
                ->withQueryString(),
            'statuses' => Lead::STATUSES,
            'filter' => in_array($status, Lead::STATUSES, true) ? $status : null,
        ]);
    }

    public function update(Request $request, Lead $lead): RedirectResponse
    {
        $validated = $request->validate([
            'status' => ['required', Rule::in(Lead::STATUSES)],
        ]);

        $lead->update($validated);

        return back()->with('success', true);
    }

    public function export(): StreamedResponse
    {
        return response()->streamDownload(function () {
            $out = fopen('php://output', 'w');
            if ($out === false) {
                return;
            }

            fputcsv($out, [
                'id', 'name', 'email', 'company', 'industry',
                'funding_range', 'status', 'message', 'created_at',
            ], escape: '');

            Lead::latest()->cursor()->each(function (Lead $lead) use ($out) {
                fputcsv($out, [
                    $lead->id,
                    $lead->name,
                    $lead->email,
                    $lead->company,
                    $lead->industry,
                    $lead->funding_range,
                    $lead->status,
                    $lead->message,
                    $lead->created_at,
                ], escape: '');
            });

            fclose($out);
        }, 'leads-'.now()->format('Y-m-d').'.csv', [
            'Content-Type' => 'text/csv; charset=UTF-8',
        ]);
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();

        return back()->with('success', true);
    }
}
