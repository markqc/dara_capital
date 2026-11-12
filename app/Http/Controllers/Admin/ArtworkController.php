<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Artwork;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ArtworkController extends Controller
{
    /**
     * Registry of the provisional artwork keys. Final client assets replace
     * these via upload without touching templates.
     */
    public static function keys(): array
    {
        return [
            'globe-market-chart' => 'Home hero',
            'reception-lobby' => 'About hero',
            'red-architectural-facade' => 'Services hero',
            'earth-hemisphere' => 'Insights hero',
            'city-skyline' => 'Article: Global Investment Outlook',
            'ai-brain' => 'Article: AI in Due Diligence',
            'fintech-network' => 'Article: Fintech Funding Report',
            'world-map' => 'Article: Emerging Markets',
        ];
    }

    public function index(): Response
    {
        $overrides = Artwork::all()->keyBy('key');

        $items = collect(self::keys())->map(fn ($usage, $key) => [
            'key' => $key,
            'usage' => $usage,
            'path' => $overrides->get($key)?->path,
            'url' => $overrides->get($key)?->url(),
            'alt' => $overrides->get($key)?->alt,
            'overridden' => $overrides->get($key)?->path !== null,
        ])->values();

        return Inertia::render('admin/artwork/index', ['items' => $items]);
    }

    public function update(Request $request, string $key): RedirectResponse
    {
        abort_unless(array_key_exists($key, self::keys()), 404);

        $validated = $request->validate([
            'alt' => ['nullable', 'string', 'max:255'],
            'image' => ['nullable', 'image', 'mimes:jpg,jpeg,png,webp', 'max:4096'],
        ]);

        $artwork = Artwork::firstOrNew(['key' => $key]);
        $artwork->alt = $validated['alt'] ?? null;

        if ($request->hasFile('image')) {
            if ($artwork->path) {
                Storage::disk('public')->delete($artwork->path);
            }
            $artwork->path = $request->file('image')->store("artwork/{$key}", 'public');
        }

        $artwork->save();

        return back()->with('success', true);
    }

    public function destroy(string $key): RedirectResponse
    {
        $artwork = Artwork::where('key', $key)->first();

        if ($artwork?->path) {
            Storage::disk('public')->delete($artwork->path);
            $artwork->update(['path' => null]);
        }

        return back()->with('success', true);
    }
}
