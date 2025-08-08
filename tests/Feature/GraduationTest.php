<?php

namespace Tests\Feature;

use App\Models\Student;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class GraduationTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_displays_graduation_announcements()
    {
        // Create some test students
        Student::factory()->graduated()->count(5)->create();
        Student::factory()->pending()->count(3)->create();

        $response = $this->get('/');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('graduation/index')
                ->has('students.data', 5) // Should show graduated students by default
                ->has('stats')
        );
    }

    public function test_student_search_by_id_works()
    {
        $student = Student::factory()->graduated()->create([
            'student_id' => 'STU12345',
            'name' => 'John Doe',
        ]);

        $response = $this->post(route('graduation.search'), [
            'student_id' => 'STU12345',
        ]);

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('graduation/student')
                ->where('student.student_id', 'STU12345')
                ->where('student.name', 'John Doe')
        );
    }

    public function test_student_search_with_invalid_id_redirects_with_error()
    {
        $response = $this->post(route('graduation.search'), [
            'student_id' => 'INVALID_ID',
        ]);

        $response->assertRedirect();
        $response->assertSessionHas('error');
    }

    public function test_graduation_page_can_filter_by_status()
    {
        Student::factory()->graduated()->count(3)->create();
        Student::factory()->pending()->count(2)->create();

        $response = $this->get('/?status=pending');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('graduation/index')
                ->has('students.data', 2)
                ->where('filters.status', 'pending')
        );
    }

    public function test_graduation_page_can_search_students()
    {
        Student::factory()->graduated()->create(['name' => 'Alice Johnson']);
        Student::factory()->graduated()->create(['name' => 'Bob Smith']);

        $response = $this->get('/?search=Alice');

        $response->assertStatus(200);
        $response->assertInertia(fn ($page) =>
            $page->component('graduation/index')
                ->has('students.data', 1)
                ->where('students.data.0.name', 'Alice Johnson')
        );
    }
}