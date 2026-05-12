# TruekApp

TruekApp es una app de intercambio de servicios entre usuarios. Cada persona publica lo que sabe hacer, encuentra servicios compatibles y puede proponer intercambios directamente desde la plataforma.

## Stack y arquitectura

| Capa | Tecnología | Qué hace |
|---|---|---|
| Frontend | React + Vite | Interfaz de usuario, rutas y consumo de API |
| Backend | Laravel 11 (API REST) | Lógica de negocio, validaciones, autenticación y endpoints |
| Base de datos | MySQL | Persistencia de usuarios, servicios, solicitudes y reseñas |
| Auth | Laravel Sanctum + Bearer Token | Login, sesión API y protección de rutas |

- El frontend corre de forma independiente y consume la API Laravel.
- La autenticación se envía en cabecera `Authorization: Bearer <token>`.
- Las rutas privadas del backend usan `auth:sanctum`.

## Puesta en marcha rápida

Antes de instalar las dependencias, se recomienda comprobar las versiones de PHP, Node.js y Composer utilizadas durante el desarrollo del proyecto.

El entorno principal de desarrollo fue:

PHP 8.2.x
Composer 2.9.x
Node.js 22.x
npm 11.x

Durante el desarrollo se detectaron posibles incompatibilidades utilizando versiones más recientes de PHP y Node.js, especialmente en macOS. En caso de errores relacionados con Laravel, Vite o dependencias del frontend/backend, se recomienda utilizar las versiones indicadas anteriormente.

Configuración recomendada en macOS
PHP 8.2
- brew install php@8.2
- brew unlink php
- brew link php@8.2 --force --overwrite
Node.js 22
- nvm install 22
- nvm use 22
Composer
- brew reinstall composer

### 1) Backend (Laravel)

```bash
cd TruekkApp-Backend
composer install
cp .env.example .env
php artisan key:generate
php artisan migrate
php artisan serve
php artisan storage:link (para cargar la foto de perfil)
```

Backend por defecto en: `http://127.0.0.1:8000`

### 2) Frontend (React + Vite)

```bash
cd TruekkApp-Frontend
npm install
npm run dev
```

Frontend por defecto en: `http://127.0.0.1:5173`

> Si hace falta, define `VITE_API_URL` apuntando al backend.

## Usuarios de prueba
Nota: recomendación del autor probar el sistema de mensajería con los dos usuarios.
### Usuario 1
- Email: 12@g.com
- Contraseña: 123456

### Usuario 2
- Email: mimate@gmail.com
- Contraseña: 123456

### Administrador
- Email: mariadmin@test.com
- Contraseña: 123456

## Estructura principal

```text
.
├── TruekkApp-Backend/
│   ├── app/Http/Controllers/Api/
│   ├── app/Models/
│   ├── database/migrations/
│   ├── routes/api.php
│   └── README.md
├── TruekkApp-Frontend/
│   ├── src/api/
│   ├── src/components/
│   ├── src/pages/
│   └── README.md
└── README.md
```

## Endpoints principales (resumen)

Base: `http://127.0.0.1:8000/api`

### Auth
- `POST /register`
- `POST /login`
- `GET /me` (auth)
- `POST /logout` (auth)

### Services
- `GET /services`
- `GET /services/{id}`
- `GET /my-services` (auth)
- `POST /services` (auth)
- `PUT /services/{id}` (auth)
- `DELETE /services/{id}` (auth)
- `GET /services/{id}/matches` (auth)
- `GET /recommendations` (auth)

### Categories
- `GET /categories`

### Reviews
- `POST /reviews` (auth)
- `GET /users/{id}/reviews` (auth)

### Saved Services
- `GET /saved-services` (auth)
- `GET /services/{id}/saved` (auth)
- `POST /services/{id}/save` (auth)
- `DELETE /services/{id}/save` (auth)

### Trade Requests
- `GET /trade-requests` (auth)
- `POST /trade-requests` (auth)
- `GET /trade-requests/{id}` (auth)
- `PATCH /trade-requests/{id}/accept` (auth)
- `PATCH /trade-requests/{id}/reject` (auth)
- `PATCH /trade-requests/{id}/cancel` (auth)
- `PATCH /trade-requests/{id}/complete` (auth)
- `GET /trade-requests/{id}/messages` (auth)
- `POST /trade-requests/{id}/messages` (auth)

### Admin
Prefijo: `/admin` (auth + rol admin)

- `GET /admin/services`
- `GET /admin/services/pending`
- `GET /admin/services/{id}`
- `PATCH /admin/services/{id}/approve`
- `PATCH /admin/services/{id}/reject`
- `DELETE /admin/services/{id}`
- `GET /admin/users`
- `POST /admin/users`
- `PATCH /admin/users/{id}/verify`
- `PATCH /admin/users/{id}/block`

## Roles

- **USER**
  - Publica y gestiona sus servicios.
  - Guarda servicios, envía solicitudes de intercambio y deja reseñas.
- **ADMIN**
  - Accede a endpoints de administración.
  - Modera servicios y gestiona estado/verificación de usuarios.

## Moderación de servicios

Los servicios pueden pasar por un flujo de moderación antes de ser visibles públicamente. Desde el panel admin se pueden listar pendientes, aprobar, rechazar o eliminar servicios según las reglas del sistema.

## Nota técnica (PHP)

Se recomienda usar **PHP 8.2 o 8.3** para desarrollo de este proyecto. Con PHP 8.5 pueden aparecer warnings por dependencias o librerías que todavía no están totalmente adaptadas.

