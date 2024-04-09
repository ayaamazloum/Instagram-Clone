<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Post;
use Illuminate\Support\Facades\Auth;

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
        ], 201);
    }

    public function getAllPosts() {
        $user = Auth::user();

        $posts = $user->following()
            ->with(['posts' => function ($query) {
                $query->with(['user' => function ($query1) {
                    $query1->with('profile');
                }]);
            }])
            ->get()->pluck('posts')->flatten()->sortByDesc('created_at');

        return response()->json([
           'status' =>'success',
           'message' => 'Posts retrieved successfully',
            'posts' => $posts,
        ], 200);
    }
}