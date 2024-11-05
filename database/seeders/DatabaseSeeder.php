<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Database\Seeders\PostSeeder;
use Illuminate\Support\Facades\DB;
use Database\Seeders\CategorySeeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
         // Limpio los datos de las tablas
         DB::table('categories')->truncate();

         // Llamo los seeders
         $this->call(CategorySeeder::class);
         $this->call(PostSeeder::class);
    }
}
