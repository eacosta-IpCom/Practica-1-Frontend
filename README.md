@'
# Práctica Técnica 1: Gestión de Tareas (Fullstack)

## Descripción
Este proyecto consiste en una aplicación de **Gestión de Tareas** diseñada para demostrar la integración entre una API REST construida en **.NET 8** y una interfaz de usuario moderna desarrollada en **Angular**. La solución permite realizar el ciclo completo de creación, listado y actualización de estados de tareas en tiempo real.

## Stack Tecnológico
* **Backend:** ASP.NET Core 8 Web API.
* **Frontend:** Angular 18 (Standalone Components).
* **UI Library:** Angular Material.
* **Comunicación:** HttpClient con Promesas (async/await).
* **Persistencia:** Almacenamiento en memoria (Singleton pattern).

## Detalle de la API (Endpoints)
| Método | Endpoint | Descripción |
| :--- | :--- | :--- |
| `GET` | `/api/tasks/GetAll` | Retorna el listado completo de tareas actuales. |
| `POST` | `/api/tasks/Create` | Registra una nueva tarea. Requiere un título en el cuerpo. |
| `PUT` | `/api/tasks/MarkComplete/{id}` | Alterna el estado de una tarea entre "Pendiente" y "Completada". |

## Configuración y Ejecución

### 1. Requisitos previos
* [.NET 8 SDK](https://dotnet.microsoft.com/download/dotnet/8.0)
* [Node.js](https://nodejs.org/) (v18 o superior)
* [Angular CLI](https://angular.io/cli)

### 2. Ejecución del Backend
dotnet run
* URL Local: http://localhost:5062/swagger/index.html

### 3. Ejecución del Frontend
* Instalar dependencias
npm install
* Iniciar servidor de desarrollo
ng serve

*URL Local http://localhost:5062/swagger/index.html
