<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Task>
 */
class TaskFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => $this->faker->sentence(),
            // 'description' => $this->faker->paragraph(3),
            'description' => $this->faker->realText(),
            // 'deadline' => $this->faker->dateTimeBetween('-30 days', '+1 month'),
            'due_date' => $this->faker->dateTimeBetween('now', '+1 year'),
            'status' => $this->faker->randomElement(['pending', 'in-progress', 'completed', 'cancelled']),
            'priority' => $this->faker->randomElement(['low', 'medium', 'high']),
            'image_path' => $this->faker->imageUrl(),
            'assigned_to' => 2,
            'created_by' => 1,
            'updated_by' => 2,
            'created_at' => time(),
            'updated_at' => time(),
        ];
    }
}
