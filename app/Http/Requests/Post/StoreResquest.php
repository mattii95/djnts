<?php

namespace App\Http\Requests\Post;

use Illuminate\Foundation\Http\FormRequest;

class StoreResquest extends FormRequest
{

    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'title' => 'required|min:5|max:500',
            'slug' => 'required|min:5|max:500|unique:posts',
            'content' => 'required|min:7',
            'description' => 'required|min:7',
            'category_id' => 'required|integer',
            'posted' => 'required',
            'image' => 'image|mimes:jpg,jpeg,png,gif|max:30000'
        ];
    }
}
