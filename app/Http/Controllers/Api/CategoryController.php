<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Category\PutResquest;
use App\Http\Requests\Category\StoreResquest;
use App\Models\Category;

class CategoryController extends Controller
{

    public function all()
    {
        return response()->json(Category::get());
    }
    
    public function index()
    {
        return response()->json(Category::paginate(10));
    }

    public function store(StoreResquest $request)
    {
        $result = Category::create($request->validated());
        if (!$result) {
            return response()->json('Error creating category', 400);
        }
        return response()->json('Category created successful', 201);
    }

    public function show(Category $category)
    {
        return response()->json($category);
    }
   
    public function slug(Category $category)
    {
        return response()->json($category);
    }

    public function update(PutResquest $request, Category $category)
    {
        $category->update($request->validated());
        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete($category);
        return response()->json('ok');
    }
}
