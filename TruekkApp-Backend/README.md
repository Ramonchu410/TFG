# TruekApp Backend (Laravel 11)

API REST de TruekApp. Gestiona autenticación, servicios, reseñas, guardados, solicitudes de intercambio, mensajería y administración.

## Requisitos

- PHP 8.2 / 8.3
- Composer 2.8+
- MySQL

## Arranque

```bash
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
```

API en `http://127.0.0.1:8000` (rutas bajo `/api`).

## Puntos clave

- Middleware `auth:sanctum` en rutas privadas.
- Middleware `admin` para endpoints de moderación/administración.
- Rutas definidas en `routes/api.php`.

## Estructura principal

- `app/Http/Controllers/Api` → controladores de la API
- `app/Models` → modelos Eloquent
- `app/Http/Middleware` → middlewares personalizados
- `routes/api.php` → definición de endpoints
- `database/migrations` → estructura de base de datos

## Autenticación

La API utiliza Laravel Sanctum con Bearer Tokens para proteger rutas privadas y endpoints administrativos.