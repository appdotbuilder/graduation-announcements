<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStudentRequest extends FormRequest
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
            'student_id' => 'required|string|max:20|unique:students,student_id,' . $this->route('student')->id,
            'name' => 'required|string|max:255',
            'major' => 'required|string|max:255',
            'graduation_status' => 'required|in:pending,graduated,incomplete',
            'graduation_date' => 'nullable|date',
            'notes' => 'nullable|string',
        ];
    }

    /**
     * Get custom error messages for validator errors.
     *
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'student_id.required' => 'Student ID is required.',
            'student_id.unique' => 'This student ID is already registered to another student.',
            'name.required' => 'Student name is required.',
            'major.required' => 'Major is required.',
            'graduation_status.required' => 'Graduation status is required.',
            'graduation_status.in' => 'Graduation status must be pending, graduated, or incomplete.',
        ];
    }
}