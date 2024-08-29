<?php

namespace App\Http\Controllers\Users;

use App\Http\Controllers\Controller;
use App\Models\User;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Http\Resources\Users\UserResource;


class UsersController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = User::query();

        $sortField = request("sort_field", "created_at"); // sort by created_at by default if not provided
        $sortDirection = request("sort_direction", "desc"); // sort by DESC order by default if not provided


        if(request("name")) {
            $query->where("name", "like", "%". request("name"). "%");
        }

        if(request("email")) {
            $query->where("email", "like", "%". request("email"). "%");
        }

        $users = $query->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->onEachSide(1);

        return inertia("User/Index", [
            "users" => UserResource::Collection($users),
            "queryParams" => request()->query() ?: null,
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("User/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->validated();
        
        // dd($data);
        User::create([
            "name" => $data["name"],
            "email" => $data["email"],
            "password" => bcrypt($data["password"]),
        ]);

        return to_route("users.index")->with('success', "New user added successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return inertia("User/Edit",
            [
                "user" => new UserResource($user),
            ]
        );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->validated();
        $password = $data['password'] ?? null;
        unset($data['password_confirmation']);
        if ($password) 
        {
            $data['password'] = bcrypt($password);
        }
        else{
            unset($data['password']);  // remove password from data if not provided in request
        }

        $user->update($data);

        return to_route("users.index", $user)->with("success", "User \"$user->name\" was updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();

        return to_route("users.index")->with("success", "User \"$user->name\" was deleted successfully");
    }
}
