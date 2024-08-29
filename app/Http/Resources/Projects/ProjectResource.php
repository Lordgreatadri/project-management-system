<?php

namespace App\Http\Resources\Projects;

use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use App\Http\Resources\Users\UserResource;
use Illuminate\Http\Resources\Json\JsonResource;

class ProjectResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "id" => $this->id,
            "name" => $this->name,
            "description" => $this->description,
            "image_path" => $this->image_path ? Storage::url($this->image_path) : null,
            // "image_path" => $this->image_path ?? null,
            "status" => $this->status,
            "due_date" => (new Carbon($this->due_date))->format('Y-m-d'),
            "created_at" => (new Carbon($this->created_at))->format('Y-m-d'),
            "createdBy" => new UserResource($this->createdBy),
            "updatedBy" => new UserResource($this->updatedBy),
            
        ];
    }
}
