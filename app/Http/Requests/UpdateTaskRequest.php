<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTaskRequest extends FormRequest
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
            name => ['required', 'string', 'max:255'],
            description => ['required', 'string'],
            priority => ['required', 'string', 'in:low,medium,high'],
            status => ['required', 'string', 'in:to_do,in_progress,done'],
            assigned_id => ['required', 'integer', 'exists:users,id'],
            board_id => ['required', 'integer', 'exists:boards,id'],
            due_date => ['nullable', 'date'],
        ];
    }
}
