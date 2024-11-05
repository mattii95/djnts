<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Post>
 */
class PostFactory extends Factory
{
   
    public function definition(): array
    {
        $title = $this->faker->jobTitle;
        $text = $this->faker->text;
        return [
            'title' => $title,
            'slug' => str_replace(' ', '-', strtolower($title)),
            'description' => $text,
            'content' => "<p>" . $text . "</p>",
            'posted' => 'not',
            'category_id' => $this->faker->randomElement([1,2,3,4,5]),
            'user_id' => 1
        ];
    }
}
