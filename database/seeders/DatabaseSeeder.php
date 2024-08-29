<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Project;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        User::factory()->create([
            'name' => 'Emmanuel',
            'email' => 'emma@email.com',
            'password' => bcrypt('12345'),
            'email_verified_at' => time()
        ]);

        User::factory()->create([
            'name' => 'Test User',
            'email' => 'test@example.com',
            'password' => bcrypt('12345'),
            'email_verified_at' => time()
        ]);


        Project::factory()->count(50)->hasTasks(50)->create();
    }
}
