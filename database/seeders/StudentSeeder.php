<?php

namespace Database\Seeders;

use App\Models\Student;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class StudentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create graduated students
        Student::factory(50)->graduated()->create();

        // Create pending students
        Student::factory(25)->pending()->create();

        // Create some incomplete students
        Student::factory(10)->create([
            'graduation_status' => 'incomplete',
        ]);
    }
}