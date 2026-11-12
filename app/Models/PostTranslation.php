<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PostTranslation extends Model
{
    protected $fillable = [
        'post_id', 'locale', 'title', 'excerpt', 'body', 'category_label',
    ];

    public function post(): BelongsTo
    {
        return $this->belongsTo(Post::class);
    }
}
