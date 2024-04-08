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
    Route::get('search', 'search');
    Route::post('follow', 'follow');
});

Route::controller(PostController::class)->group(function () {
    Route::post('post', 'create');
});