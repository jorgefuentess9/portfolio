# Despliegue en Vercel & Cloudflare · jorgefuentes.dev

Este proyecto está preparado para sustituir tu portfolio anterior en **Vercel** manteniendo tu dominio personalizado `jorgefuentes.dev` configurado con Cloudflare.

---

## 1. Configuración del Proyecto en Vercel

Cuando conectes este repositorio en el panel de Vercel (o si actualizas el repositorio que ya tenías vinculado):

- **Framework Preset:** `Angular`
- **Root Directory:** `./`
- **Build Command:** `npm run build`
- **Output Directory:** `dist/portfolio-angular/browser`
- **Install Command:** `npm install`

> **Nota:** El archivo `vercel.json` incluye la regla de reescritura de URLs SPA para evitar errores 404 al navegar o recargar.

---

## 2. Dominio y Cloudflare (`jorgefuentes.dev`)

Como ya tenías `jorgefuentes.dev` enlazado:
1. En **Vercel**: en *Project Settings* > *Domains*, asegúrate de que esté añadido `jorgefuentes.dev`.
2. En **Cloudflare**: no necesitas tocar tus registros DNS (CNAME apuntando a `cname.vercel-dns.com` o el registro A indicado por Vercel), ya que siguen apuntando al mismo proyecto.

---

## 3. Modificaciones antes del despliegue

Puedes retocar los textos, proyectos o añadir secciones antes de desplegar:
- **Traducciones y Datos (proyectos, habilidades, formación):** `public/i18n/es.json` y `public/i18n/en.json`
- **Estado (tema e idioma activo):** `src/app/services/portfolio-state.service.ts`
- **Modelos e interfaces:** `src/app/models/`
- **Estilos globales y paleta:** `src/styles.css`
- **Componentes:** `src/app/components/layout/` y `src/app/components/sections/`
