# EduManage - Plataforma de Autogestión Educativa

EduManage es un sistema centralizado de autogestión educativa diseñado para directivos, docentes, preceptores y administradores. Permite gestionar alumnos, asistencias mediante códigos QR, e informes institucionales con una interfaz de usuario SaaS premium y moderna.

## Estructura de Carpetas

El proyecto está dividido en un monorepo funcional:

- `frontend/`: Aplicación React construida con Next.js (App Router), TailwindCSS v4, y Framer Motion.
- `backend/`: API RESTful construida con Node.js, Express, TypeScript, Prisma ORM y JWT.
- `docker-compose.yml`: Archivo para levantar la base de datos PostgreSQL localmente.

---

## 1. Instalación y Dependencias

Asegúrate de tener instalado **Node.js (v18 o superior)** y **npm** en tu sistema.

### Backend
1. Navega a la carpeta backend: `cd backend`
2. Instala las dependencias: `npm install`
3. Dependencias clave utilizadas: `express`, `prisma`, `jsonwebtoken`, `bcryptjs`, `googleapis`, `cors`.

### Frontend
1. Navega a la carpeta frontend: `cd frontend`
2. Instala las dependencias: `npm install`
3. Dependencias clave utilizadas: `next`, `react`, `tailwindcss`, `html5-qrcode`.

---

## 2. Configuración de Base de Datos (PostgreSQL)

Tienes dos opciones para la base de datos PostgreSQL:

### Opción A: Usar Docker (Recomendado)
Desde la raíz del proyecto (`institucion-web`), ejecuta:
```bash
docker-compose up -d
```
Esto levantará un contenedor PostgreSQL en el puerto `5432` con las credenciales por defecto.

### Opción B: PostgreSQL Local
Si ya tienes PostgreSQL instalado, crea una base de datos llamada `edumanage`.

### Aplicar el Esquema (Prisma)
1. Ve a `backend/.env` y asegúrate de que `DATABASE_URL` sea correcta.
2. Sincroniza el esquema ejecutando dentro de `backend/`:
```bash
npx prisma db push
```

---

## 3. Configuración de Google Sheets API

Para integrar la lectura y actualización de datos (como respaldos de asistencia o listas de alumnos):

1. Ve a [Google Cloud Console](https://console.cloud.google.com/).
2. Crea un nuevo proyecto y habilita la **Google Sheets API** y **Google Drive API**.
3. Crea credenciales de tipo **Service Account** (Cuenta de Servicio).
4. Descarga el archivo JSON de la clave y guárdalo en la carpeta `backend/` con el nombre `credentials.json`.
5. Comparte tu hoja de cálculo (Spreadsheet) con el email de la cuenta de servicio generada.
6. Copia el ID del Spreadsheet (se encuentra en la URL de tu hoja de cálculo de Google) y agrégalo al `.env` del backend:
   `GOOGLE_SPREADSHEET_ID="tu_id_aqui"`

---

## 4. Configuración del Lector QR

El frontend utiliza la librería `html5-qrcode` integrada en la vista `/dashboard/asistencia`.

**⚠️ Importante para Producción:**
El uso de la cámara a través de `getUserMedia` (necesario para el QR) **solo está permitido en contextos seguros**. Esto significa que:
- En desarrollo: Funciona perfectamente en `localhost`.
- En producción: El sitio web frontend DEBE estar alojado en un dominio con certificado SSL (`https://`).

---

## 5. Ejecución del Proyecto

### Levantar el Backend (API)
```bash
cd backend
npm run dev
```
El servidor escuchará en `http://localhost:5000`.

### Levantar el Frontend (UI)
```bash
cd frontend
npm run dev
```
La aplicación web estará disponible en `http://localhost:3000`.

---

## 6. Despliegue (Deploy)

Para desplegar esta aplicación en producción, se recomienda la siguiente arquitectura:

- **Frontend:** Desplegar en [Vercel](https://vercel.com). Vercel maneja Next.js nativamente y te proporcionará automáticamente un dominio HTTPS (necesario para el código QR).
- **Backend:** Desplegar en [Render](https://render.com) o [Railway](https://railway.app). Ambos ofrecen alojamiento Node.js sencillo y permiten adjuntar bases de datos PostgreSQL gestionadas en la misma plataforma.

Asegúrate de configurar las variables de entorno (`.env`) correspondientemente en los paneles de control de los servidores de producción.
