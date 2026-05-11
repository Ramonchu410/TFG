# TruekApp Frontend (React + Vite)

Cliente web de TruekApp. Consume la API Laravel y gestiona navegación, sesión de usuario y vistas de intercambio.

## Requisitos

- Node.js 22+
- npm 10+

## Arranque

```bash
npm install
npm run dev
```

App en `http://127.0.0.1:5173`.

## Configuración API

El cliente usa `VITE_API_URL` para apuntar al backend.

Ejemplo:

```bash
VITE_API_URL=http://127.0.0.1:8000
```

Si no se define, usa ese valor por defecto.
