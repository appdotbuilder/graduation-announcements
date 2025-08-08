<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Student>
 */
class StudentFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $majors = [
            'Computer Science',
            'Business Administration',
            'Engineering',
            'Psychology',
            'Biology',
            'Mathematics',
            'English Literature',
            'History',
            'Economics',
            'Art and Design',
            'Physics',
            'Chemistry',
            'Political Science',
            'Sociology',
            'Education',
        ];

        return [
            'student_id' => 'STU' . str_pad((string)fake()->unique()->numberBetween(1000, 9999), 4, '0', STR_PAD_LEFT),
            'name' => fake()->name(),
            'major' => fake()->randomElement($majors),
            'graduation_status' => fake()->randomElement(['pending', 'graduated', 'incomplete']),
            'graduation_date' => fake()->optional(0.7)->dateTimeBetween('-2 years', '+1 year'),
            'notes' => fake()->optional(0.3)->sentence(),
        ];
    }

    /**
     * Indicate that the student has graduated.
     */
    public function graduated(): static
    {
        return $this->state(fn (array $attributes) => [
            'graduation_status' => 'graduated',
            'graduation_date' => fake()->dateTimeBetween('-2 years', 'now'),
        ]);
    }

    /**
     * Indicate that the student is pending graduation.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'graduation_status' => 'pending',
            'graduation_date' => null,
        ]);
    }
}