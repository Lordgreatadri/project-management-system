<?php

namespace App\Http\Controllers\Tasks;

use App\Http\Controllers\Controller;
use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Support\Str;
use App\Http\Resources\Users\UserResource;
use App\Http\Resources\Projects\ProjectResource;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
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
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::query()->orderBy('name')->get();
        $projects = Project::query()->orderBy('name')->get();

        return inertia("Task/Create", [
            "users" =>  UserResource::Collection($users),
            "projects" => ProjectResource::Collection($projects),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreTaskRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $image = $data['image'] ?? null;
        if($image){
            $data["image_path"] = $image->store("task/".Str::random(25), "public");
            unset($data['image']);
        }
        
        Task::create($data);

        return to_route("tasks.index")->with('success', "New task added successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Task $task)
    {
        $query = $task->tasks();

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

        $tasks = $query->orderBy($sortField, $sortDirection)->paginate(15)->onEachSide(1);

        return inertia("Task/Show", [
            "task" => new TaskResource($task),
            "queryParams" => request()->query() ?: null,
            "tasks" => TasksResource::Collection($tasks) ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Task $task)
    {
        $users = User::query()->orderBy('name')->get();
        $projects = Project::query()->orderBy('name')->get();
        
        return inertia("Task/Edit",
        [
            "task" => new TasksResource($task),
            "users" =>  UserResource::Collection($users),
            "projects" => ProjectResource::Collection($projects),
        ]
    );
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateTaskRequest $request, Task $task)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if($image){
            if($task->image_path){
                Storage::disk("public")->deleteDirectory(dirname($task->image_path)); // delete old image before storing new one.
            }
            $data["image_path"] = $image->store("task/".Str::random(25), "public");
            unset($data['image']);
        }else{
            unset($data['image']); // if no new image provided, then keep the old one.
        }

        $data['updated_by'] = Auth::id();
        // $payload = [
        //     "id" => $task->id,
        //     "name" => $data["name"],
        //     "status" => $data["status"],
        //     "description" => $data["description"],
        //     "due_date" => $data["due_date"],
        //     "assigned_to" => $data["assigned_to"],
        //     "project_id" => $data["project_id"],
        //     "priority" => $data["priority"],
        //     "updated_by" => $data["updated_by"],
        //     "image_path" => $data["image_path"],
        // ];
        $task->update($data);

        return to_route("tasks.index", $task)->with("success", "Task \"$task->name\" was updated successfully");
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Task $task)
    {
        // Task::where('task_id', $task->id)->delete();
        // $task->tasks()->delete();  // delete all related tasks before deleting the task itself.
        $task->delete(); 

        if($task->image_path){
            Storage::disk("public")->deleteDirectory(dirname($task->image_path)); // delete old image before storing new one.
        }
        $name = $task->name;
        return to_route("tasks.index")->with("success", "Successfully deleted \"$name\" from storage");
    }
}
