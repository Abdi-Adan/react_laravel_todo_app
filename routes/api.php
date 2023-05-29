<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\ItemController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Protected Routes
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', function (Request $request) {
        return $request->user();
    });
    Route::apiResource('/users', UserController::class);
});
Route::middleware('auth:sanctum')->post('/todo', [ItemController::class, 'index']);

// Authentication Routes
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);

// Todo Routes
Route::get('/todo', [ItemController::class, 'index']);
Route::prefix('/todo')->group(function () {
    Route::post('/add', [ItemController::class, 'store']);
    Route::put('/{id}', [ItemController::class, 'update']);
    Route::put('/edit/{id}', [ItemController::class, 'edit']);
    Route::delete('/{id}', [ItemController::class, 'destroy']);
});
