<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Category>
 */
class CategoryFactory extends Factory
{
    public function definition(): array
    {
        $title = $this->faker->jobTitle;
        return [
            'name' => $title,
            'slug' => str_replace(' ', '-', strtolower($title))
        ];
    }
}
