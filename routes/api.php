<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\PermissionController;
use App\Http\Controllers\Api\TagController;
use App\Http\Controllers\api\UserController;
use App\Http\Middleware\UserAccessDashboardMiddleware;

Route::post('auth/login', [AuthController::class, 'login']);
Route::post('auth/check-token', [AuthController::class, 'checkToken']);

Route::get('post/get-posts-posted', [PostController::class, 'getPostsByPosted']);

Route::get('/user', function (Request $request) {
    $user = $request->user(); 

    // Si el usuario tiene roles, puedes devolverlos
    $user->roles = $user->getRoleNames();

    return response()->json($user); 
})->middleware('auth:sanctum');

Route::group(['middleware' => 'auth:sanctum'], function () {
    // Auth
    Route::post('auth/logout', [AuthController::class, 'logout']);

    Route::middleware([UserAccessDashboardMiddleware::class])->group(function () {
        // Roles and Permissions
        Route::apiResource('roles', RoleController::class);
        Route::get('roles/{role}/permission', [RoleController::class, 'getPermissionsByRol']);
        Route::post('roles/{role}/assign-permission', [RoleController::class, 'addPermissionToRol']);
        Route::post('roles/{role}/delete-permission', [RoleController::class, 'removePermissionToRol']);
        Route::apiResource('permissions', PermissionController::class);

        // Users
        Route::apiResource('users', UserController::class);
        Route::post('users/{user}/assign-role', [UserController::class, 'addRolToUser']);
        Route::post('users/{user}/delete-role', [UserController::class, 'deleteRolToUser']);

        // Categories
        Route::get('category/all', [CategoryController::class, 'all']);
        Route::get('category/slug/{category:slug}', [CategoryController::class, 'slug']);
        Route::apiResource('category', CategoryController::class);

        // Tags
        Route::apiResource('tag', TagController::class);

        // Posts
        Route::get('post/all-posts', [PostController::class, 'all']);
        Route::get('post/slug/{post:slug}', [PostController::class, 'slug']);
        Route::apiResource('post', PostController::class);
    });
});
