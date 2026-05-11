-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: localhost
-- Tiempo de generación: 11-05-2026 a las 18:57:22
-- Versión del servidor: 10.4.28-MariaDB
-- Versión de PHP: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `tfg_trueque`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `categories`
--

INSERT INTO `categories` (`id`, `name`, `created_at`, `updated_at`) VALUES
(1, 'Tecnología', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(2, 'Programación', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(3, 'Diseño', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(4, 'Marketing', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(5, 'Fotografía y vídeo', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(6, 'Clases particulares', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(7, 'Idiomas', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(8, 'Música', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(9, 'Arte', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(10, 'Deporte', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(11, 'Salud y bienestar', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(12, 'Hogar', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(13, 'Reparaciones', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(14, 'Eventos', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(15, 'Mascotas', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(16, 'Transporte', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(17, 'Cocina', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(18, 'Jardinería', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(19, 'Administración', '2026-05-01 06:53:25', '2026-05-01 06:53:25'),
(20, 'Otros', '2026-05-01 06:53:25', '2026-05-01 06:53:25');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` text NOT NULL,
  `queue` text NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` tinyint(3) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_users_table', 1),
(2, '0001_01_01_000001_create_cache_table', 1),
(3, '0001_01_01_000002_create_jobs_table', 1),
(4, '2026_02_09_142520_create_categories_table', 1),
(5, '2026_02_09_142533_create_services_table', 1),
(6, '2026_02_09_142542_create_trade_requests_table', 1),
(7, '2026_02_09_142549_create_reviews_table', 1),
(8, '2026_02_10_124810_add_role_and_status_to_users_table', 1),
(9, '2026_02_10_155917_add_moderation_fields_to_services_table', 1),
(10, '2026_04_24_102247_create_personal_access_tokens_table', 2),
(11, '2026_04_30_210224_create_notifications_table', 3),
(12, '2026_04_30_213016_create_trade_messages_table', 4),
(13, '2026_05_01_102201_add_avatar_path_to_users_table', 5),
(14, '2026_05_01_111016_create_saved_services_table', 6);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `notifications`
--

CREATE TABLE `notifications` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `type` varchar(255) NOT NULL DEFAULT 'INFO',
  `title` varchar(255) NOT NULL,
  `message` text NOT NULL,
  `read_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `notifications`
--

INSERT INTO `notifications` (`id`, `user_id`, `type`, `title`, `message`, `read_at`, `created_at`, `updated_at`) VALUES
(1, 9, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"mimate\" ha sido aprobado y ya aparece en el marketplace.', '2026-04-30 19:10:25', '2026-04-30 19:08:45', '2026-04-30 19:10:25'),
(2, 9, 'SERVICE_DELETED', 'Servicio eliminado por moderación', 'Tu servicio \"mimate\" ha sido eliminado por moderación y ya no está disponible en TruekApp.', '2026-04-30 19:10:25', '2026-04-30 19:09:58', '2026-04-30 19:10:25'),
(3, 10, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"probamos?\" ha sido aprobado y ya aparece en el marketplace.', '2026-05-01 06:54:34', '2026-04-30 19:13:29', '2026-05-01 06:54:34'),
(4, 9, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"Delirio a las 12 de la noche\" ha sido aprobado y ya aparece en el marketplace.', NULL, '2026-04-30 19:14:56', '2026-04-30 19:14:56'),
(5, 10, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"Clases de Judo\" ha sido aprobado y ya aparece en el marketplace.', '2026-05-01 07:20:48', '2026-05-01 07:19:25', '2026-05-01 07:20:48'),
(6, 10, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"Clases de tenis\" ha sido aprobado y ya aparece en el marketplace.', '2026-05-01 08:40:20', '2026-05-01 07:21:01', '2026-05-01 08:40:20'),
(7, 9, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"PIN PON AL AIRE LIBRE\" ha sido aprobado y ya aparece en el marketplace.', NULL, '2026-05-01 07:34:55', '2026-05-01 07:34:55'),
(8, 9, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"DANZA AL AIRE LIBRE\" ha sido aprobado y ya aparece en el marketplace.', NULL, '2026-05-01 07:34:57', '2026-05-01 07:34:57'),
(9, 9, 'SERVICE_APPROVED', 'Servicio aprobado', 'Tu servicio \"Me gustaría aprender a pintar, alguien que sepa ?\" ha sido aprobado y ya aparece en el marketplace.', NULL, '2026-05-01 08:36:09', '2026-05-01 08:36:09'),
(10, 10, 'SERVICE_REJECTED', 'Servicio rechazado', 'Tu servicio \"Clases de tenis\" ha sido rechazado. Motivo: No cumple las políticas de publicación.', '2026-05-01 08:40:20', '2026-05-01 08:39:29', '2026-05-01 08:40:20'),
(11, 10, 'SERVICE_DELETED', 'Servicio eliminado por moderación', 'Tu servicio \"probamos?\" ha sido eliminado por moderación y ya no está disponible en TruekApp.', NULL, '2026-05-03 19:08:08', '2026-05-03 19:08:08'),
(12, 9, 'SERVICE_DELETED', 'Servicio eliminado por moderación', 'Tu servicio \"Delirio a las 12 de la noche\" ha sido eliminado por moderación y ya no está disponible en TruekApp.', NULL, '2026-05-03 19:08:15', '2026-05-03 19:08:15');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `personal_access_tokens`
--

INSERT INTO `personal_access_tokens` (`id`, `tokenable_type`, `tokenable_id`, `name`, `token`, `abilities`, `last_used_at`, `expires_at`, `created_at`, `updated_at`) VALUES
(3, 'App\\Models\\User', 9, 'frontend-token', '54793f58e8096a28304c976036fa2fd53fbb4614fedcc136325ab7cec5abd7bd', '[\"*\"]', '2026-04-24 09:43:15', NULL, '2026-04-24 09:37:46', '2026-04-24 09:43:15'),
(4, 'App\\Models\\User', 9, 'frontend-token', '8e6979574637250aa60b295c1a5068e3bff2861990e05a95240373cb580e2b65', '[\"*\"]', '2026-04-27 16:17:55', NULL, '2026-04-27 14:33:46', '2026-04-27 16:17:55'),
(17, 'App\\Models\\User', 10, 'frontend-token', '31316416c5cc8ebfffa9d6eafcd43986a06c3c92fbd47cdf15e41e4ff3e23ec4', '[\"*\"]', NULL, NULL, '2026-04-30 19:11:35', '2026-04-30 19:11:35'),
(32, 'App\\Models\\User', 10, 'frontend-token', '201e1bed70b8d4b0d144abfd51b5c1439964a63ac64a9b96294dadaa76a9952e', '[\"*\"]', '2026-05-01 07:35:40', NULL, '2026-05-01 07:35:19', '2026-05-01 07:35:40'),
(37, 'App\\Models\\User', 10, 'frontend-token', 'a7750e0a8ff16612cb0a620f573089f5fd9881e0dd8f9416d28d3c9d256d6ee5', '[\"*\"]', '2026-05-01 14:21:06', NULL, '2026-05-01 08:39:57', '2026-05-01 14:21:06'),
(40, 'App\\Models\\User', 10, 'frontend-token', 'f8256ef7f8bdcf69cb8ef7ee33a49e33bf54e472b560685628225d15e5325f04', '[\"*\"]', '2026-05-10 19:46:39', NULL, '2026-05-10 18:40:36', '2026-05-10 19:46:39'),
(41, 'App\\Models\\User', 10, 'frontend-token', 'b369e4acf4ca4eae184ee4f27f57589829eb8537011573937664251404b3ea39', '[\"*\"]', '2026-05-11 14:44:20', NULL, '2026-05-11 12:50:51', '2026-05-11 14:44:20');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reviews`
--

CREATE TABLE `reviews` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `from_user_id` bigint(20) UNSIGNED NOT NULL,
  `to_user_id` bigint(20) UNSIGNED NOT NULL,
  `trade_request_id` bigint(20) UNSIGNED NOT NULL,
  `rating` tinyint(3) UNSIGNED NOT NULL,
  `comment` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `saved_services`
--

CREATE TABLE `saved_services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `service_id` bigint(20) UNSIGNED NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `services`
--

CREATE TABLE `services` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED NOT NULL,
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `type` enum('OFFER','REQUEST') NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `moderation_status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `reviewed_by` bigint(20) UNSIGNED DEFAULT NULL,
  `reviewed_at` timestamp NULL DEFAULT NULL,
  `rejection_reason` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `services`
--

INSERT INTO `services` (`id`, `user_id`, `category_id`, `type`, `title`, `description`, `location`, `is_active`, `created_at`, `updated_at`, `moderation_status`, `reviewed_by`, `reviewed_at`, `rejection_reason`) VALUES
(1, 1, NULL, 'OFFER', 'Clases de piano', 'Principiantes y nivel medio', 'Murcia', 1, '2026-02-10 16:19:19', '2026-02-10 16:28:56', 'APPROVED', 1, '2026-02-10 16:28:56', NULL),
(2, 2, NULL, 'OFFER', 'Clases de patinaje', 'Principiantes y nivel medio', 'Granada', 1, '2026-02-10 16:20:03', '2026-02-24 20:38:56', 'APPROVED', 1, '2026-02-24 20:38:56', NULL),
(8, 10, 10, 'OFFER', 'Clases de Judo', 'Nivel intermedio - Avanzado', 'Burgos', 1, '2026-05-01 06:54:26', '2026-05-01 07:19:25', 'APPROVED', 6, '2026-05-01 07:19:25', NULL),
(9, 10, 10, 'OFFER', 'Clases de tenis', 'Nivel básico, para los más peques', 'Zaragoza', 1, '2026-05-01 07:20:42', '2026-05-01 08:39:29', 'REJECTED', 6, '2026-05-01 08:39:29', 'No cumple las políticas de publicación.'),
(12, 9, 9, 'REQUEST', 'Me gustaría aprender a pintar, alguien que sepa ?', 'no tengo ni idea de nada, sería desde 0', 'Murcia', 1, '2026-05-01 08:35:42', '2026-05-01 08:36:09', 'APPROVED', 6, '2026-05-01 08:36:09', NULL);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('5X1eWNkzrSOR9guW5wZBbK41CawgFy7N1xlzl30Q', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiWXo1aXFJU2VuVHJxUm5LeUhHTmpncFBQMkx3MmRLc1dUM2dFbXAzWCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777021838),
('gehNVLqKduYTKRkhNyPem2r1pILZy4HXO6t1rMJY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiVHBnSnJKS3FSM2pWMU5heXVxVE9aRm0zSEk4c3FRWXNHdUJIYkU4aCI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly9sb2NhbGhvc3Q6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777019069),
('KqUHhXp5D7cr4c9cfjBRwVA5UDYrDCdI5QuPJb9t', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiR2M5QnlUdDh3ZjFwSU1oZ2NzcXlvUktZZWtBUjY5QUdFbzcxTU5TYSI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1777631490),
('s1GJjlILROnz3eiW3Vb2L9o75xDJlxKDmyZLGMNz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/145.0.0.0 Safari/537.36', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSWhjdTFIbUwzNDg4aWU5dWs5WXBZYVFwdk44OU83S1ExSEhTbmZKYyI7czo5OiJfcHJldmlvdXMiO2E6Mjp7czozOiJ1cmwiO3M6MjE6Imh0dHA6Ly8xMjcuMC4wLjE6ODAwMCI7czo1OiJyb3V0ZSI7Tjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1771958904);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trade_messages`
--

CREATE TABLE `trade_messages` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `trade_request_id` bigint(20) UNSIGNED NOT NULL,
  `sender_id` bigint(20) UNSIGNED NOT NULL,
  `message` text NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `trade_requests`
--

CREATE TABLE `trade_requests` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `requester_id` bigint(20) UNSIGNED NOT NULL,
  `target_service_id` bigint(20) UNSIGNED NOT NULL,
  `offer_service_id` bigint(20) UNSIGNED DEFAULT NULL,
  `status` enum('PENDING','ACCEPTED','REJECTED','CANCELLED','COMPLETED') NOT NULL DEFAULT 'PENDING',
  `message` text DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `role` enum('ADMIN','USER') NOT NULL DEFAULT 'USER',
  `status` enum('PENDING','APPROVED','REJECTED') NOT NULL DEFAULT 'PENDING',
  `avatar_path` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`, `role`, `status`, `avatar_path`) VALUES
(1, 'Jesón', 'jeson@test.com', NULL, '$2y$12$96EerJSJKiqn6s.Il8BuI.41akx.4BSio1l8/mjezvBIegkZY7HCm', NULL, '2026-02-10 15:37:05', '2026-02-10 15:37:05', 'USER', 'PENDING', NULL),
(2, 'Monchito', 'monchito@test.com', NULL, '$2y$12$fvDAM85Dgh7Vr7d04v9MDuhwboHTMRFN1O/7.HMVeajuYG1mjxy.C', NULL, '2026-02-10 15:37:20', '2026-02-10 15:37:20', 'USER', 'PENDING', NULL),
(5, 'mari', 'mari@test.com', NULL, '$2y$12$AV6ScaAr1N5MZmPRSteWhuFs1G2xvVVQywpcQiN2Z4qHjnQKasAWe', NULL, '2026-02-10 15:52:58', '2026-02-10 15:52:58', 'USER', 'PENDING', NULL),
(6, 'Mari Admin', 'mariadmin@test.com', NULL, '$2y$12$GJh2WmuhNxjopXLq5CBuKujefsQny.BoB.FbUcrzcdgsMOfezGdUu', NULL, '2026-02-10 16:02:35', '2026-02-10 16:02:35', 'ADMIN', 'PENDING', NULL),
(7, 'Pepe', 'pepe@test.com', NULL, '$2y$12$CO9YrYkOxLYrl1WBpwsms.DPXfwJi0/sXtlRYPMtpS8SUGOf4BDve', NULL, '2026-02-10 16:14:52', '2026-02-10 16:14:52', 'USER', 'PENDING', NULL),
(8, 'Ramon', 'asdasd@gmail.com', NULL, '$2y$12$2h.NGRWYTvKC12SsTVaOb.BC7zvteNnMpQuUnDx0W1PObZa8668nC', NULL, '2026-02-24 21:54:55', '2026-02-24 21:54:55', 'USER', 'PENDING', NULL),
(9, 'mimate', 'mimate@gmail.com', NULL, '$2y$12$/TGDbxhOqxOnfA4hE4DNhOsJKnAqd6aOKPkXWbctjcWKlWJk9kDl6', NULL, '2026-04-24 07:21:33', '2026-05-01 08:34:03', 'USER', 'PENDING', 'avatars/rvJrHcsPe4PgkkSj5pBBVCKsWcGfINob0LvtbpEQ.jpg'),
(10, 'Ramoncin', '12@g.com', NULL, '$2y$12$ONWkKRI77JjSu1fHQvx1EeMMdsGXEhRMHYZbd9sdBi50PiCDXkfXq', NULL, '2026-04-30 19:11:35', '2026-05-03 18:50:50', 'USER', 'PENDING', 'avatars/7uaCQ0k3KavQuAq5aGxADEnTcnQaIXGr92rgm7Zf.jpg');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`);

--
-- Indices de la tabla `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_name_unique` (`name`);

--
-- Indices de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`);

--
-- Indices de la tabla `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Indices de la tabla `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD PRIMARY KEY (`id`),
  ADD KEY `notifications_user_id_foreign` (`user_id`);

--
-- Indices de la tabla `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Indices de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Indices de la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `reviews_from_user_id_trade_request_id_unique` (`from_user_id`,`trade_request_id`),
  ADD KEY `reviews_to_user_id_foreign` (`to_user_id`),
  ADD KEY `reviews_trade_request_id_foreign` (`trade_request_id`);

--
-- Indices de la tabla `saved_services`
--
ALTER TABLE `saved_services`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `saved_services_user_id_service_id_unique` (`user_id`,`service_id`),
  ADD KEY `saved_services_service_id_foreign` (`service_id`);

--
-- Indices de la tabla `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`id`),
  ADD KEY `services_user_id_foreign` (`user_id`),
  ADD KEY `services_category_id_foreign` (`category_id`),
  ADD KEY `services_type_category_id_is_active_index` (`type`,`category_id`,`is_active`),
  ADD KEY `services_reviewed_by_foreign` (`reviewed_by`);

--
-- Indices de la tabla `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Indices de la tabla `trade_messages`
--
ALTER TABLE `trade_messages`
  ADD PRIMARY KEY (`id`),
  ADD KEY `trade_messages_trade_request_id_foreign` (`trade_request_id`),
  ADD KEY `trade_messages_sender_id_foreign` (`sender_id`);

--
-- Indices de la tabla `trade_requests`
--
ALTER TABLE `trade_requests`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `trade_requests_requester_id_target_service_id_unique` (`requester_id`,`target_service_id`),
  ADD KEY `trade_requests_target_service_id_foreign` (`target_service_id`),
  ADD KEY `trade_requests_offer_service_id_foreign` (`offer_service_id`);

--
-- Indices de la tabla `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT de la tabla `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT de la tabla `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT de la tabla `notifications`
--
ALTER TABLE `notifications`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=42;

--
-- AUTO_INCREMENT de la tabla `reviews`
--
ALTER TABLE `reviews`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `saved_services`
--
ALTER TABLE `saved_services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `services`
--
ALTER TABLE `services`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT de la tabla `trade_messages`
--
ALTER TABLE `trade_messages`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `trade_requests`
--
ALTER TABLE `trade_requests`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `notifications`
--
ALTER TABLE `notifications`
  ADD CONSTRAINT `notifications_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `reviews`
--
ALTER TABLE `reviews`
  ADD CONSTRAINT `reviews_from_user_id_foreign` FOREIGN KEY (`from_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_to_user_id_foreign` FOREIGN KEY (`to_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `reviews_trade_request_id_foreign` FOREIGN KEY (`trade_request_id`) REFERENCES `trade_requests` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `saved_services`
--
ALTER TABLE `saved_services`
  ADD CONSTRAINT `saved_services_service_id_foreign` FOREIGN KEY (`service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `saved_services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `services_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_reviewed_by_foreign` FOREIGN KEY (`reviewed_by`) REFERENCES `users` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `services_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `trade_messages`
--
ALTER TABLE `trade_messages`
  ADD CONSTRAINT `trade_messages_sender_id_foreign` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `trade_messages_trade_request_id_foreign` FOREIGN KEY (`trade_request_id`) REFERENCES `trade_requests` (`id`) ON DELETE CASCADE;

--
-- Filtros para la tabla `trade_requests`
--
ALTER TABLE `trade_requests`
  ADD CONSTRAINT `trade_requests_offer_service_id_foreign` FOREIGN KEY (`offer_service_id`) REFERENCES `services` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `trade_requests_requester_id_foreign` FOREIGN KEY (`requester_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `trade_requests_target_service_id_foreign` FOREIGN KEY (`target_service_id`) REFERENCES `services` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
