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

    public function allFollowingsPosts() {
        $user = Auth::user();

        $posts = $user->following()
            ->with([
                'posts.user.profile',
                'posts.comments.user.profile',
                'posts.likes'
            ])
            ->get()->pluck('posts')->flatten()->sortByDesc('created_at');

        return response()->json([
           'status' =>'success',
           'message' => 'Posts retrieved successfully',
           'posts' => $posts,
           'user_id' => $user->id
        ], 200);
    }

    public function like(Request $request) {
        $request->validate([
            'post_id' => 'required|integer'
        ]);

        $user = Auth::user();
        $post = Post::findOrFail($request->post_id);
        $post->likes()->create(['user_id' => $user->id]);

        return response()->json([
           'status' =>'success',
           'message' => 'Post liked successfully'
        ], 201);
    }

    public function unlike(Request $request) {
        $request->validate([
            'post_id' => 'required|integer'
        ]);

        $user = Auth::user();
        $post = Post::findOrFail($request->post_id);
        $post->likes()->where('user_id', $user->id)->delete();

        return response()->json([
           'status' =>'success',
           'message' => 'Post unliked successfully'
        ], 200);
    }

    public function comment(Request $request) {
        $request->validate([
            'post_id' => 'required|integer',
            'comment' =>'required|string'
        ]);

        $user = Auth::user();
        $post = Post::findOrFail($request->post_id);
        $post->comments()->create([
            'user_id' => $user->id,
            'comment_text' => $request->comment
        ]);

        return response()->json([
           'status' =>'success',
           'message' => 'Comment added successfully'
        ], 201);
    }
}