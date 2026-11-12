<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Lead;
use App\Models\Page;
use App\Models\Post;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('admin/dashboard', [
            'stats' => [
                'pages' => Page::count(),
                'posts' => Post::count(),
                'leads' => Lead::count(),
            ],
            'recentLeads' => Lead::latest()->limit(5)->get(),
        ]);
    }
}
