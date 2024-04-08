<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function search(Request $request) {
        $request->validate([
            'query' =>'required|string',
        ]);

        $query = $request->query('query');

        $userId = Auth::id();

        $users = User::where('id', '!=', $userId)
            ->where(function ($queryBuilder) use ($query) {
                $queryBuilder->where('name', 'LIKE', '%'. $query. '%')
                            ->orWhere('username', 'LIKE', '%'. $query. '%')
                            ->orWhere('email', 'LIKE', '%'. $query. '%');
            })
            ->get();

        return response()->json([
           'status' =>'success',
            'users' => $users,
        ]);
    }

    public function follow(Request $request) {
        $request->validate([
            'userId' =>'required|integer',
        ]);

        $user = Auth::user();
        $userToFollow = User::findOrFail($request->userId);

        $user->following()->attach($userToFollow->id);

        return response()->json([
            'status' => 'success',
            'message' => 'User followed successfully'
        ]);
    }

    public function unfollow(Request $request) {
        $request->validate([
            'userId' =>'required|integer',
        ]);

        $user = Auth::user();
        $userToUnFollow = User::findOrFail($request->userId);

        $user->following()->detach($userToUnFollow->id);

        return response()->json([
            'status' => 'success',
            'message' => 'User unfollowed successfully'
        ]);
    }

    public function viewUserProfile(Request $request) {
        $request->validate([
            'userId' =>'required|integer',
        ]);

        $user = Auth::user();
        $userToView = User::findOrFail($request->userId);
        
        $followed = false;

        if($user->isFollowing($userToView->id)) {
            $followed = true;
        }

        return response()->json([
            'status' => 'success',
            'user' => $userToView,
            'profile' => $userToView->profile,
            'followed' => $followed,
        ]);
    }
}
