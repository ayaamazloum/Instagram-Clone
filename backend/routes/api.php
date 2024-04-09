<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\PostController;

Route::controller(AuthController::class)->group(function () {
    Route::post('login', 'login');
    Route::post('register', 'register');
    Route::get('logout', 'logout');
    Route::get('refresh', 'refresh');
});

Route::controller(UserController::class)->group(function () {
    Route::post('editProfile', 'editProfile');
    Route::get('search', 'search');
    Route::post('follow', 'follow');
    Route::post('unfollow', 'unfollow');
    Route::get('userProfile', 'viewMyProfile');
    Route::post('userProfile', 'viewUserProfile');
});

Route::controller(PostController::class)->group(function () {
    Route::post('post', 'create');
    Route::get('posts', 'allFollowingsPosts');
    Route::post('like', 'like');
    Route::post('unlike', 'unlike');
    Route::post('comment', 'comment');
});