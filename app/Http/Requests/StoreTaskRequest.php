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
            'name' => 'required|string',
            'description' => 'nullable|string',
            'board_id' => 'required|integer|exists:boards,id',
            'priority' => 'required|in:low,medium,high',
            'status' => 'required|in:to_do,in_progress,done',
            'due_date' => 'required|date',
            'notification_duration' => 'required|in:6 hours,12 hours,1 day,3 days,5 days,7 days'
        ];
    }
}
