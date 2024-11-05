<?php

namespace App\Http\Controllers\Api;

use App\Models\Post;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\Facades\Cache;
use App\Http\Requests\Post\PutResquest;
use App\Http\Requests\Post\StoreResquest;

class PostController extends Controller
{

    public function all()
    {
        if (!cache()->has('post_all')) {
            $posts = Post::with(['category', 'tags', 'user'])->get();
            cache()->put('post_all', $posts);
        }
        return response()->json(cache()->get('post_all'));
    }

    public function index()
    {
        return response()->json(Post::with('category')->paginate(10));
    }

    public function store(StoreResquest $request)
    {
        $post = new Post($request->validated());

        $filename = time() . '.' . $request->file('image')->extension();
        $request->file('image')->move(public_path('uploads/images'), $filename);
        $post->image = $filename;

        auth()->user()->posts()->save($post);

        if ($request->tags) {
            $post->tags()->sync($request->tags);
        }
        // Eliminar cache
        Cache::forget('post_all');
        return response()->json($post);
    }

    public function show(int $postId)
    {
        $post = Post::with(['category', 'tags', 'user'])->find($postId);
        return response()->json(['data' => $post]);
    }

    public function slug(Post $post)
    {
        return response()->json($post);
    }

    public function update(PutResquest $request, Post $post)
    {
        if (!Gate::allows('update', $post)) {
            return response()->json('No estas autorizado', 401);
        }

        $data = $request->validated();

        if (isset($data['image']) && $data['image'] === '') {
            unset($data['image']);
        }

        // Guardar imagen
        if ($request->hasFile('image')) {
            $uploadPath = public_path('uploads/images');
            if ($post->image && file_exists($uploadPath . '/' . $post->image)) {
                unlink($uploadPath . '/' . $post->image);
            }

            $filename = time() . '.' . $request->file('image')->extension();
            $request->file('image')->move($uploadPath, $filename);
            $data['image'] = $filename;
        }

        if ($request->tags) {
            $post->tags()->sync($request->tags);
        }
        $post->update($data);

        // Eliminar cache
        Cache::forget('post_all');

        return response()->json($post);
    }

    public function destroy(Post $post)
    {
        if (!Gate::allows('delete', $post)) {
            return response()->json('No estas autorizado', 401);
        }
        $uploadPath = public_path('uploads/images');
        if ($post->image && file_exists($uploadPath . '/' . $post->image)) {
            unlink($uploadPath . '/' . $post->image);
        }
        $post->delete();
        return response()->json("ok");
    }

    public function upload(Request $request, Post $post)
    {
        $filename = time() . '.' . $request['image']->extension();
        $data['image'] = $filename;
        $request->image->move(public_path('uploads/images'), $filename);
        $post->update($data);
        return response()->json($post);
    }

    public function getPostsByPosted() {
        $posts = Post::with(['category', 'tags', 'user'])->where('posted', 'yes')->get();
        return response()->json(['data' => $posts]);
    }
}
