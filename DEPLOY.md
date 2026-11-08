# Despliegue en Vercel & Cloudflare · jorgefuentess.dev

Este proyecto está preparado para sustituir tu portfolio anterior en **Vercel** manteniendo tu dominio personalizado `jorgefuentess.dev` configurado con Cloudflare.

---

## 1. Configuración del Proyecto en Vercel

Cuando conectes este repositorio en el panel de Vercel (o si actualizas el repositorio que ya tenías vinculado):

- **Framework Preset:** `Angular`
- **Root Directory:** `./` (o `portfolio-angular` si mantienes esa subcarpeta en el repo)
- **Build Command:** `npm run build`
- **Output Directory:** `dist/portfolio-angular/browser` *(importante: Angular 17+ genera los estáticos dentro de `browser`)*
- **Install Command:** `npm install`

> **Nota:** Ya hemos añadido el archivo [`vercel.json`](file:///c:/Users/jorge/Downloads/portfolioPrueba/portfolio-angular/vercel.json) con la regla de reescritura de URLs SPA para evitar errores 404 al navegar o recargar.

---

## 2. Dominio y Cloudflare (`jorgefuentess.dev`)

Como ya tenías `jorgefuentess.dev` enlazado:
1. En **Vercel**: en *Project Settings* > *Domains*, asegúrate de que esté añadido `jorgefuentess.dev`.
2. En **Cloudflare**: no necesitas tocar tus registros DNS (CNAME apuntando a `cname.vercel-dns.com` o el registro A indicado por Vercel), ya que siguen apuntando al mismo proyecto.

---

## 3. Modificaciones antes del despliegue

Puedes retocar los textos, proyectos o añadir secciones antes de desplegar:
- **Traducciones y Datos:** [`src/app/services/portfolio-state.service.ts`](file:///c:/Users/jorge/Downloads/portfolioPrueba/portfolio-angular/src/app/services/portfolio-state.service.ts)
- **Estilos globales y paleta:** [`src/styles.css`](file:///c:/Users/jorge/Downloads/portfolioPrueba/portfolio-angular/src/styles.css)
- **Componentes:** dentro de `src/app/components/`

