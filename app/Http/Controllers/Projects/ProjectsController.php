<?php

namespace App\Http\Controllers\Projects;


use App\Models\Task;
use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use App\Http\Requests\StoreProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Http\Resources\Tasks\TasksResource;
use App\Http\Resources\Projects\ProjectResource;

class ProjectsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $query = Project::query();

        $sortField = request("sort_field", "created_at"); // sort by created_at by default if not provided
        $sortDirection = request("sort_direction", "desc"); // sort by DESC order by default if not provided


        if(request("name")) {
            $query->where("name", "like", "%". request("name"). "%");
        }

        if(request("status")) {
            $query->where("status", request("status"));
        }

        $projects = $query->orderBy($sortField, $sortDirection)
            ->paginate(15)
            ->onEachSide(1);

        return inertia("Project/Index", [
            "projects" => ProjectResource::Collection($projects),
            "queryParams" => request()->query() ?: null,
            "success" => session("success"),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return inertia("Project/Create");
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreProjectRequest $request)
    {
        $data = $request->validated();
        $data['created_by'] = Auth::id();
        $data['updated_by'] = Auth::id();

        $image = $data['image'] ?? null;
        if($image){
            $data["image_path"] = $image->store("project/".Str::random(25), "public");
        }
        
        // dd($data);
        Project::create([
            "name" => $data["name"],
            "status" => $data["status"],
            "description" => $data["description"],
            "due_date" => $data["due_date"],
            "created_by" => $data["created_by"],
            "updated_by" => $data["updated_by"],
            "image_path" => $data["image_path"],
        ]);

        return to_route("projects.index")->with('success', "New project added successfully.");
    }

    /**
     * Display the specified resource.
     */
    public function show(Project $project)
    {
        $query = $project->tasks();

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

        return inertia("Project/Show", [
            "project" => new ProjectResource($project),
            "queryParams" => request()->query() ?: null,
            "tasks" => TasksResource::Collection($tasks) ?: null
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Project $project)
    {
        return inertia("Project/Edit",
            [
                "project" => new ProjectResource($project),
            ]
        );
    }


    
    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateProjectRequest $request, Project $project)
    {
        $data = $request->validated();
        $image = $data['image'] ?? null;
        if($image){
            if($project->image_path){
                Storage::disk("public")->deleteDirectory(dirname($project->image_path)); // delete old image before storing new one.
            }
            $data["image_path"] = $image->store("project/".Str::random(25), "public");
        }

        $data['updated_by'] = Auth::id();
        $payload = [
            "id" => $project->id,
            "name" => $data["name"],
            "status" => $data["status"],
            "description" => $data["description"],
            "due_date" => $data["due_date"],
            "updated_by" => $data["updated_by"],
            "image_path" => $data["image_path"],
        ];
        $project->update($payload);

        return to_route("projects.index", $project)->with("success", "Project \"$project->name\" was updated successfully");
    }



    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Project $project)
    {
        Task::where('project_id', $project->id)->delete();
        // $project->tasks()->delete();  // delete all related tasks before deleting the project itself.
        $project->delete(); 

        if($project->image_path){
            Storage::disk("public")->deleteDirectory(dirname($project->image_path)); // delete old image before storing new one.
        }
        $name = $project->name;
        return to_route("projects.index")->with("success", "Successfully deleted \"$name\" from storage");
    }
}
