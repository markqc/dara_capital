<?php

namespace Database\Seeders;

use App\Models\Page;
use App\Models\Post;
use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    public function run(): void
    {
        User::updateOrCreate(
            ['email' => 'mark@m-caneda.com'],
            [
                'name' => 'Mark Caneda',
                'password' => Hash::make('!Password1234'),
                'email_verified_at' => now(),
                'is_admin' => true,
            ],
        );

        foreach (EnContent::pages() as $key => $data) {
            $page = Page::firstOrCreate(['key' => $key]);
            $page->translations()->updateOrCreate(
                ['locale' => 'en'],
                ['data' => $data],
            );
        }

        foreach (EsContent::pages() as $key => $data) {
            $page = Page::firstOrCreate(['key' => $key]);
            $page->translations()->updateOrCreate(
                ['locale' => 'es'],
                ['data' => $data],
            );
        }

        foreach (EnContent::posts() as $order => $post) {
            $record = Post::updateOrCreate(
                ['slug' => $post['slug']],
                [
                    'category' => $post['category'],
                    'artwork' => $post['artwork'],
                    'published_at' => $post['published_at'],
                    'sort_order' => $order,
                    'is_published' => true,
                ],
            );
            $record->translations()->updateOrCreate(
                ['locale' => 'en'],
                [
                    'title' => $post['title'],
                    'excerpt' => $post['excerpt'],
                    'body' => $post['body'],
                    'category_label' => $post['category_label'],
                ],
            );
        }

        foreach (EsContent::posts() as $slug => $t) {
            $post = Post::where('slug', $slug)->first();
            $post?->translations()->updateOrCreate(['locale' => 'es'], $t);
        }
    }
}
