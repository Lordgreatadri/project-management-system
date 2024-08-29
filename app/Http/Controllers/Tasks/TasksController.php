<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Models\Task;
use Illuminate\Support\Facades\Log;
use App\Http\Requests\StoreTaskRequest;
use App\Http\Requests\UpdateTaskRequest;
use App\Http\Resources\Tasks\TasksResource;

class TasksController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Task::query();

        $sortField = request("sort_field", "created_at"); // sort by created_at by default if not provided
        $sortDirection = request("sort_direction", "desc"); // sort by DESC order by default if not provided


        if(request("name")) {
            $query->where("name", "like", "%". request("name"). "%");
        }

        if(request("status")) {
            $query->where("status", request("status"));
        }

        if(request("priority")) {
            $query->where("priority", request("priority"));
        }

        $tasks = $query->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->onEachSide(1);

        return inertia("Task/Index", [
            "tasks" => TasksResource::Collection($tasks),
            "queryParams" => request()->query() ?: null,
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        //
    }
}
