<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Illuminate\Support\Facades\File;

class UserController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function editProfile(Request $request) {
        $request->validate([
            'name' =>'required|string',
            'username' =>'required|string',
            'bio' =>'required|string',
        ]);
        
        $user = Auth::user();
        $profile = $user->profile;

        if ($request->hasFile('profile_picture')) {
            $file = $request->file('profile_picture');
            $extension = $file->getClientOriginalExtension();
            $filename = time() . '.' . $extension;
            $file->move(public_path('/profile_pictures/'), $filename);

            $profile->profile_picture = $filename;

            if (File::exists(public_path('/profile_pictures') . $user->profile->profile_picture)) {
                File::delete((public_path('/profile_pictures') . $user->profile->profile_picture));
            }
        }
        
        $profile->bio = $request->bio;
        $profile->save();

        $user->name = $request->name;
        $user->username = $request->username;
        $user->save();

        return response()->json([
            'status' => 'success',
            'message' => 'Profile updated successfully'
        ]);
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

    public function viewMyProfile() {
        $user = Auth::user();

        return response()->json([
           'status' =>'success',
            'user' => $user,
            'profile' => $user->profile,
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
