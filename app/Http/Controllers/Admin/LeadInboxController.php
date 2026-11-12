<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class LeadInboxController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/leads/index', [
            'leads' => Lead::latest()->paginate(20),
        ]);
    }

    public function destroy(Lead $lead): RedirectResponse
    {
        $lead->delete();

        return back()->with('success', true);
    }
}
