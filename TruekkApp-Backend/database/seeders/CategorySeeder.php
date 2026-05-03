<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            'Tecnología',
            'Programación',
            'Diseño',
            'Marketing',
            'Fotografía y vídeo',
            'Clases particulares',
            'Idiomas',
            'Música',
            'Arte',
            'Deporte',
            'Salud y bienestar',
            'Hogar',
            'Reparaciones',
            'Eventos',
            'Mascotas',
            'Transporte',
            'Cocina',
            'Jardinería',
            'Administración',
            'Otros',
        ];

        foreach ($categories as $category) {
            Category::firstOrCreate([
                'name' => $category,
            ]);
        }
    }
}