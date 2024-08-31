<?php

namespace App\Http\Controllers\Tasks;


use App\Http\Resources\Tasks\TasksResource;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\User;

class UserTasksController extends Controller
{
    /**
     * Handle the incoming request.
     */
    public function __invoke(Request $request)
    {
        $user = auth()->user();

        $query = Task::query()->where('assigned_to', $user->id);

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
            "success" => session("success"),
        ]);
    }
}
