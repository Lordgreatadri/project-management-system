<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTaskRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            "name" => ['required', 'string', 'max:255'],
            "status" => ['required', 'in:pending,in-progress,completed,cancelled'],
            "priority" => ['required', 'in:low,medium,high'],
            "assigned_to" => ['required', 'integer', 'exists:users,id'],
            "project_id" => ['required', 'integer', 'exists:projects,id'],
            "description" => ['required', 'string', 'max:700'],
            "due_date" => 'required|date|after:'.now()->format('Y-m-d'),
            "image" => 'required|max:450|min:5',//|mimes:jpeg,png,jpg,bmp,webp,gif,svg
        ];
    }
}
