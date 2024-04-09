<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;

class PostController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function create(Request $request)
    {
        $request->validate([
            'image' => 'required|File',
        ]);
        
        $file = $request->file('image');
        $extension = $file->getClientOriginalExtension();
        $filename = time() . '.' . $extension;
        $file->move(public_path('/posts_images/'), $filename);

        $post = Post::create([
            'user_id' => auth()->id(),
            'image' => $filename,
            'caption' => $request->caption,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'post' => $post,
        ]);
    }
}