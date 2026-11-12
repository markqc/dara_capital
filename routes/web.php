<?php

use App\Http\Controllers\Admin\ArtworkController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\LeadInboxController;
use App\Http\Controllers\Admin\PageContentController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Site\InsightsController;
use App\Http\Controllers\Site\LeadController;
use App\Http\Controllers\Site\PageController;
use App\Http\Middleware\EnsureUserIsAdmin;
use App\Http\Middleware\SetLocale;
use Illuminate\Support\Facades\Route;

Route::permanentRedirect('/', '/en')->name('home');

Route::prefix('{locale}')
    ->where(['locale' => '[a-z]{2}'])
    ->middleware(SetLocale::class)
    ->name('site.')
    ->group(function () {
        Route::get('/', [PageController::class, 'home'])->name('home');
        Route::get('about', [PageController::class, 'about'])->name('about');
        Route::get('services', [PageController::class, 'services'])->name('services');
        Route::get('intelligence', [PageController::class, 'intelligence'])->name('intelligence');
        Route::get('insights', [InsightsController::class, 'index'])->name('insights');
        Route::get('insights/{slug}', [InsightsController::class, 'show'])->name('insight');
        Route::get('contact', [PageController::class, 'contact'])->name('contact');
        Route::post('contact', [LeadController::class, 'store'])->name('leads.store');
    });

Route::middleware(['auth', 'verified', EnsureUserIsAdmin::class])
    ->prefix('console')
    ->name('admin.')
    ->group(function () {
        Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

        Route::get('pages', [PageContentController::class, 'index'])->name('pages.index');
        Route::get('pages/{key}/{locale}', [PageContentController::class, 'edit'])->name('pages.edit');
        Route::put('pages/{key}/{locale}', [PageContentController::class, 'update'])->name('pages.update');

        Route::get('artwork', [ArtworkController::class, 'index'])->name('artwork.index');
        Route::post('artwork/{key}', [ArtworkController::class, 'update'])->name('artwork.update');
        Route::delete('artwork/{key}', [ArtworkController::class, 'destroy'])->name('artwork.destroy');

        Route::resource('posts', PostController::class)->except(['show']);
        Route::get('leads', [LeadInboxController::class, 'index'])->name('leads.index');
        Route::get('leads/export', [LeadInboxController::class, 'export'])->name('leads.export');
        Route::patch('leads/{lead}', [LeadInboxController::class, 'update'])->name('leads.update');
        Route::delete('leads/{lead}', [LeadInboxController::class, 'destroy'])->name('leads.destroy');
    });

require __DIR__.'/settings.php';
