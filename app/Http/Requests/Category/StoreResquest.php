<?php

namespace App\Http\Requests\Category;

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
            'name' => 'required|min:5|max:500',
            'slug' => 'required|min:5|max:500|unique:categories',
        ];
    }
}
