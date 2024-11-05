<?php

namespace App\Http\Controllers\api;

use App\Models\User;
use App\Http\Controllers\Controller;
use App\Http\Requests\User\PutRequest;
use App\Http\Requests\User\StoreRequest;
use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return response()->json(['data' => $users]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $data = $request->validated();
        $result = User::create([
            'name' => $data['name'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);

        if (!$result) {
            return response()->json('Error en crear el User', 400);
        }

        return response()->json('User created successful', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::with('roles')->find($id);
        return response()->json(['data' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PutRequest $request, string $id)
    {
        $user = User::findById($id);

        if (!$user) {
            return response()->json('User not found', 404);
        }

        $result = User::where('id', $id)->update($request->validated());

        if (!$result) {
            return response()->json('Error en actualizar el user', 400);
        }

        return response()->json('User updated successful');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = new User();

        $hasUser = $user->find($id);

        if (!$hasUser) {
            return response()->json('User not found', 404);
        }

        $result = $user::where('id', $id)->delete();

        if (!$result) {
            return response()->json('Error en eliminar el user', 400);
        }

        return response()->json('User deleted successful');
    }

    // Asignar rol al usuario
    public function addRolToUser(string $userId, Request $request) {

        $validate = validator()->make($request->all(), [
            'role_id' => 'required|exists:roles,id'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $role = Role::find($request->role_id);

        $user = User::find($userId);
        // TODO: Validar que exista el rol

        // Asiganar rol
        $user->assignRole($role);

        return response()->json('El permiso se agrego correctamente');
    }
    
    // Remover rol al usuario
    public function deleteRolToUser(string $userId, Request $request) {

        $validate = validator()->make($request->all(), [
            'role_id' => 'required|exists:roles,id'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $role = Role::find($request->role_id);

        $user = User::find($userId);
        // TODO: Validar que exista el rol

        // Asiganar permiso
        $user->removeRole($role);

        return response()->json('El rol se elimino correctamente');
    }
}
