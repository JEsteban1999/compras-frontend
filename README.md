# Frontend Sistema de Órdenes y Productos (Angular)

## Descripción

Aplicación frontend desarrollada en Angular 19 que consume una API REST para gestionar órdenes de compra y productos. Proporciona una interfaz intuitiva para realizar operaciones CRUD.

## Tecnologías utilizadas

* Angular 19 (Standalone Components)
* Angular Material UI
* TypeScript
* RxJS
* HTML5/CSS3

## Requisitos previos

* Node.js 18+
* npm 9+ o yarn
* Angular CLI 19+
* Backend funcionando (ver README del backend)

## Configuración del proyecto

Instalación:

1. Clonar el repositorio:

```bash
  git clone [url-del-repositorio]
```

2. Navegar al directorio del proyecto:

```bash
  cd [nombre-del-proyecto]
```

3. Instalar dependencias:
```bash
  npm install
```

## Funcionalidades principales

Módulo de Productos:

* Listado de productos con paginación
* Creación/edición de productos
* Eliminación de productos (con validación)

Módulo de Órdenes:

* Listado de órdenes
* Creación/edición de órdenes con múltiples productos
* Cálculo automático de subtotales y total
* Visualización de detalles

Reportes:

* Top 3 productos más vendidos

## Ejecución

Para iniciar la aplicación en modo desarrollo:

```bash
  ng serve
```
