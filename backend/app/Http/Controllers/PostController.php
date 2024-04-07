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
            'image' => 'required|string',
            'caption' => 'required|string',
        ]);

        $post = Post::create([
            'user_id' => auth()->id(),
            'image' => $request->image,
            'caption' => $request->caption,
        ]);

        return response()->json([
            'status' => 'success',
            'message' => 'Post created successfully',
            'post' => $post,
        ]);
    }
}