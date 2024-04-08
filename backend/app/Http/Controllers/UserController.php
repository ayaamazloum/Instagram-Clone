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

    public function follow($userId) {
        $user = Auth::user();
        $userToFollow = User::findOrFail($userId);

        $user->following()->attach($userToFollow->id);
        return response()->json([
            'status' => 'success',
            'message' => 'User followed successfully'
        ]);
    }
}
