<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Cache;
use Laravel\Sanctum\PersonalAccessToken;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $validator = validator()->make(
            $request->all(),
            [
                'email' => 'required|email',
                'password' => 'required',
            ]
        );

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $validator->valid();

        if (Auth::attempt($credentials)) {
            $user = Auth::user();

            // Revisar password
            if (Hash::check($request->password, $user->password)) {
                response()->json(['error' => 'Invalid credentials'], 401);
            }

            // Genero el token
            $token = $user->createToken('authToken')->plainTextToken;

            Cache::forget('post_all');
            
            return response()->json(['token' => $token]);
        }

        return response()->json('The username and/or password do not match.', 422);
    }

    public function logout(Request $request) {
        $user = $request->user();
        $user->currentAccessToken()->delete();
        return response()->json('ok');
    }

    public function checkToken() {
        try {
            [$id, $token] = explode('|', request('token'));
            $tokenHash = hash('sha256', $token);
            $tokenModel = PersonalAccessToken::where('token', $tokenHash)->first();

            if ($tokenModel) {
                return response()->json(['token' => request('token')]);
            }
        } catch (Exception $e) {
            return response()->json(['error' => $e]);
        }

        return response()->json(['error' => 'invalid user'], 422);
    }
}
