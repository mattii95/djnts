<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Spatie\Permission\Models\Permission;
use App\Http\Requests\Permission\PutRequest;
use App\Http\Requests\Permission\StoreRequest;

class PermissionController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $permissions = Permission::all();
        return response()->json(['data' => $permissions]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreRequest $request)
    {
        $result = Permission::create($request->validated());

        if (!$result) {
            return response()->json('Error en crear el Permission', 400);
        }

        return response()->json('Permission created successful', 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $permission = Permission::findById($id);
        return response()->json(['data' => $permission]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PutRequest $request, string $id)
    {
        $permission = Permission::findById($id);

        if (!$permission) {
            return response()->json('Permission not found', 404);
        }

        $result = Permission::where('id', $id)->update($request->validated());

        if (!$result) {
            return response()->json('Error en actualizar el permission', 400);
        }

        return response()->json('Permission updated successful');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $permission = new Permission();

        $hasPermission = $permission->find($id);

        if (!$hasPermission) {
            return response()->json('Permission not found', 404);
        }

        $result = $permission::where('id', $id)->delete();

        if (!$result) {
            return response()->json('Error en eliminar el permission', 400);
        }

        return response()->json('Permission deleted successful');
    }

}
