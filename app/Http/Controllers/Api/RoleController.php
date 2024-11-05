<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use Spatie\Permission\Models\Role;
use App\Http\Controllers\Controller;
use App\Http\Requests\Role\PutRequest;
use App\Http\Requests\Role\StoreRequest;
use Spatie\Permission\Models\Permission;

class RoleController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $roles = Role::all();
        return response()->json(['data' => $roles]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $result = Role::create($request->validated());

        if (!$result) {
            return response()->json('Error en crear el rol', 400);
        }

        return response()->json('Rol created successful', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $rol = Role::with('permissions')->find($id);
        return response()->json(['data' => $rol]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PutRequest $request, string $id)
    {
        $rol = Role::find($id);

        if (!$rol) {
            return response()->json('Rol not found', 404);
        }

        $result = Role::where('id', $id)->update($request->validated());

        if (!$result) {
            return response()->json('Error en actualizar el rol', 400);
        }

        return response()->json('Rol updated successful');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $rol = new Role();

        $hasRol = $rol->find($id);

        if (!$hasRol) {
            return response()->json('Rol not found', 404);
        }

        $result = $rol::where('id', $id)->delete();

        if (!$result) {
            return response()->json('Error en eliminar el rol', 400);
        }

        return response()->json('Rol deleted successful');
    }

    public function getPermissionsByRol(string $id) {
        $rol = Role::find($id);
        $permissions = $rol->permissions;

        return response()->json(['data' => $permissions]);
    }

    
    public function addPermissionToRol(string $rolId, Request $request) {

        $validate = validator()->make($request->all(), [
            'permission_id' => 'required|exists:permissions,id'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $permission = Permission::find($request->permission_id);

        $rol = Role::find($rolId);
        // TODO: Validar que exista el rol

        // Asiganar permiso
        $rol->givePermissionTo($permission);

        return response()->json('El permiso se agrego correctamente');
    }
    
    public function removePermissionToRol(string $rolId, Request $request) {

        $validate = validator()->make($request->all(), [
            'permission_id' => 'required|exists:permissions,id'
        ]);

        if ($validate->fails()) {
            return response()->json($validate->errors(), 422);
        }

        $permission = Permission::find($request->permission_id);

        $rol = Role::find($rolId);
        // TODO: Validar que exista el rol

        // Asiganar permiso
        $rol->revokePermissionTo($permission);

        return response()->json('El permiso se elimino correctamente');
    }
}
