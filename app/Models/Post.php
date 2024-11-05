<?php

namespace App\Models;

use Carbon\Carbon;
use App\Models\Category;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'slug',
        'description',
        'content',
        'image',
        'posted',
        'category_id',
        'created_at',
        'updated_at',
        'user_id'
    ];

    public function category() {
        return $this->belongsTo(Category::class);
    }
    public function user() {
        return $this->belongsTo(User::class);
    }

    public function getPublishedAgoAttribute() {
        return Carbon::parse($this->created_at)->diffForHumans();
    }
    
    public function getUpdatedAgoAttribute() {
        return Carbon::parse($this->updated_at)->diffForHumans();
    }

    public function tags() {
        return $this->morphToMany(Tag::class, 'taggable');
    }
}
