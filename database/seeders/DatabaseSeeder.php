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
        $email = env('DARA_EDITOR_EMAIL', 'editor@daracapital.test');
        $password = env('DARA_EDITOR_PASSWORD');

        if (! $password) {
            $password = 'password';
            $this->command?->warn(
                'DARA_EDITOR_PASSWORD is not set, seeding the editor with the insecure local default "password". Set it in .env before deploying anywhere real.'
            );
        }

        User::updateOrCreate(
            ['email' => $email],
            [
                'name' => 'DARA Editor',
                'password' => Hash::make($password),
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
