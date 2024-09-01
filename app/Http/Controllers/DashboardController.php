<?php

namespace App\Http\Controllers;

use App\Models\Task;
use App\Models\User;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Http\Resources\Tasks\TasksResource;

class DashboardController extends Controller
{
    public function index(Request $request) {
        $user = auth()->user();
        $totalTasks = Task::query()->count();
        $myTasks = Task::query()->where("assigned_to", $user->id)->count();

        $totalPendingTasks = Task::query()->where("status", "pending")->count();
        $myPendingTasks = Task::query()->where("status", "pending")->where("assigned_to", $user->id)->count();

        $totalCompletedTasks = Task::query()->where("status", "completed")->count();
        $myCompletedTasks = Task::query()->where("status", "completed")->where("assigned_to", $user->id)->count();

        $totalInProgressTasks = Task::query()->where("status", "in-progress")->count();
        $myInProgressTasks = Task::query()->where("status", "in-progress")->where("assigned_to", $user->id)->count();

        $totalCancelledTasks = Task::query()->where("status", "cancelled")->count();
        $myCancelledTasks = Task::query()->where("status", "cancelled")->where("assigned_to", $user->id)->count();

        $tasks = Task::query();
        $activeTasks = $tasks->with('project')->whereIn("status", ["pending", "in-progress"])->where("assigned_to", $user->id)->limit(10)->get();

        return inertia('Dashboard', 
            [
                "totalTasks" => $totalTasks,
                "myTasks" => $myTasks, 
                "myPendingTasks" => $myPendingTasks, 
                "totalPendingTasks" => $totalPendingTasks, 
                "totalCompletedTasks" => $totalCompletedTasks, 
                "myCompletedTasks" => $myCompletedTasks, 
                "totalInProgressTasks" => $totalInProgressTasks, 
                "myInProgressTasks" => $myInProgressTasks, 
                "activeTasks" => TasksResource::Collection($activeTasks)
            ]
        );
    }
}
