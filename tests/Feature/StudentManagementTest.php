<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class StudentManagementTest extends TestCase
{
    use RefreshDatabase;

    private User $user;

    protected function setUp(): void
    {
        parent::setUp();
        
        $this->user = User::factory()->create();
    }

    public function test_authenticated_users_can_view_students_index()
    {
        Student::factory()->count(5)->create();

        $response = $this->actingAs($this->user)
            ->get(route('students.index'));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('students/index')
                ->has('students.data', 5)
        );
    }

    public function test_guest_users_cannot_access_student_management()
    {
        $response = $this->get(route('students.index'));

        $response->assertRedirect(route('login'));
    }

    public function test_authenticated_users_can_create_students()
    {
        $studentData = [
            'student_id' => 'STU12345',
            'name' => 'John Doe',
            'major' => 'Computer Science',
            'graduation_status' => 'pending',
            'graduation_date' => '',
            'notes' => 'Excellent student',
        ];

        $response = $this->actingAs($this->user)
            ->post(route('students.store'), $studentData);

        $response->assertRedirect();
        $this->assertDatabaseHas('students', [
            'student_id' => 'STU12345',
            'name' => 'John Doe',
            'major' => 'Computer Science',
            'graduation_status' => 'pending',
        ]);
    }

    public function test_student_creation_validates_required_fields()
    {
        $response = $this->actingAs($this->user)
            ->post(route('students.store'), []);

        $response->assertSessionHasErrors([
            'student_id',
            'name',
            'major',
            'graduation_status',
        ]);
    }

    public function test_student_id_must_be_unique()
    {
        Student::factory()->create(['student_id' => 'STU12345']);

        $response = $this->actingAs($this->user)
            ->post(route('students.store'), [
                'student_id' => 'STU12345',
                'name' => 'Jane Doe',
                'major' => 'Business',
                'graduation_status' => 'pending',
            ]);

        $response->assertSessionHasErrors(['student_id']);
    }

    public function test_authenticated_users_can_update_students()
    {
        $student = Student::factory()->create([
            'name' => 'Old Name',
            'graduation_status' => 'pending',
        ]);

        $response = $this->actingAs($this->user)
            ->put(route('students.update', $student), [
                'student_id' => $student->student_id,
                'name' => 'New Name',
                'major' => $student->major,
                'graduation_status' => 'graduated',
                'graduation_date' => '2024-05-15',
                'notes' => 'Successfully completed all requirements',
            ]);

        $response->assertRedirect();
        $this->assertDatabaseHas('students', [
            'id' => $student->id,
            'name' => 'New Name',
            'graduation_status' => 'graduated',
        ]);
    }

    public function test_authenticated_users_can_delete_students()
    {
        $student = Student::factory()->create();

        $response = $this->actingAs($this->user)
            ->delete(route('students.destroy', $student));

        $response->assertRedirect(route('students.index'));
        $this->assertDatabaseMissing('students', ['id' => $student->id]);
    }

    public function test_authenticated_users_can_view_individual_student()
    {
        $student = Student::factory()->create();

        $response = $this->actingAs($this->user)
            ->get(route('students.show', $student));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('students/show')
                ->where('student.id', $student->id)
                ->where('student.name', $student->name)
        );
    }

    public function test_students_index_can_filter_by_status()
    {
        Student::factory()->graduated()->count(3)->create();
        Student::factory()->pending()->count(2)->create();

        $response = $this->actingAs($this->user)
            ->get(route('students.index', ['status' => 'graduated']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('students/index')
                ->has('students.data', 3)
                ->where('filters.status', 'graduated')
        );
    }

    public function test_students_index_can_search_by_name()
    {
        Student::factory()->create(['name' => 'Alice Johnson']);
        Student::factory()->create(['name' => 'Bob Smith']);

        $response = $this->actingAs($this->user)
            ->get(route('students.index', ['search' => 'Alice']));

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('students/index')
                ->has('students.data', 1)
                ->where('students.data.0.name', 'Alice Johnson')
        );
    }
}