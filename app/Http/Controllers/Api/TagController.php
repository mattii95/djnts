<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Tag\PutRequest;
use App\Http\Requests\Tag\StoreRequest;
use App\Models\Tag;
use Illuminate\Http\Request;

class TagController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tags = Tag::all();
        return response()->json(['data' => $tags]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $result = Tag::create($request->validated());

        if (!$result) {
            return response()->json('Error en crear el Tag', 400);
        }

        return response()->json('Tag created successful', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $tagId)
    {
        $tag = Tag::find($tagId);
        return response()->json(['data' => $tag]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PutRequest $request, string $tagId)
    {
        $tag = Tag::find($tagId);

        if (!$tag) {
            return response()->json('Tag not found', 404);
        }

        $result = Tag::where('id', $tagId)->update($request->validated());

        if (!$result) {
            return response()->json('Error en actualizar el tag', 400);
        }

        return response()->json('Tag updated successful');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $tagId)
    {
        $tag = new Tag();

        $hasTag = $tag->find($tagId);

        if (!$hasTag) {
            return response()->json('Tag not found', 404);
        }

        $result = $tag::where('id', $tagId)->delete();

        if (!$result) {
            return response()->json('Error en eliminar el tag', 400);
        }

        return response()->json('Tag deleted successful');
    }
}
