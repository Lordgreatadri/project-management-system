<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\SUpport\Facades\Validator;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
        $user = $this->route('user'); //will get you the user being updated from the route

        return [
            'name' =>'nullable|string|max:255',
            'email' =>['nullable','email','max:255',
                Rule::unique('users')->ignore($user->id)],
            'password' => ['nullable','confirmed',
                Password::min(8)->letters()->numbers()->symbols()->uncompromised()],
        ];
    }
}
