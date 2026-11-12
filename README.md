# Portfolio Web Personal · Jorge Fuentes Aguilar

> **Dominio oficial:** [jorgefuentes.dev](https://jorgefuentes.dev)  
> **Perfil:** Estudiante de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).

Portfolio web personal rediseñado y migrado a **Angular 21+**, conservando una estética minimalista estilo terminal/dev y ampliando su arquitectura a una estructura moderna, modular y con microinteracciones reactivas.

---

## 🚀 Nuevas Funcionalidades y Mejoras

- **Arquitectura Modular por Componentes:** Organizado en `layout/` (`Header`, `Footer`) y `sections/` (`Hero`, `Projects`, `Skills`, `Education`, `Contact`).
- **Dark / Light Mode Dinámico:** Selector en cabecera (🌙 / ☀️) con conmutación dinámica de variables CSS globales (`:root` y `body.light-mode`).
- **Internacionalización con `@ngx-translate` (i18n):** Selector de idioma (ES / EN) en el header utilizando `@ngx-translate/core` y `@ngx-translate/http-loader`, cargando dinámicamente los archivos JSON desde `public/i18n/es.json` y `public/i18n/en.json`.
- **Microinteracciones y Efecto Hover Vivo:**
  - Animación suave de elevación (*hover lift*) con sombra difuminada en Proyectos, Habilidades y Formación.
  - Indicador lateral verde terminal activo al interactuar con las tarjetas.
  - Marcadores de línea de tiempo reactivos en la sección de formación.
- **Formulario de Contacto AJAX:** Envío asíncrono (`fetch`) a Formspree sin salir de la web, con estados de envío/éxito/error, mensajes traducidos (ES / EN) y campo *honeypot* anti-spam.
- **Favicon Vectorial SVG Personalizado:** Icono temático de terminal (`>_`) adaptado a la identidad de la web.
- **Tests Unitarios por Componente:** Cobertura con tests unitarios con **Vitest** y **jsdom** para `App` y todos los componentes.

---

## 🛠️ Stack Tecnológico

- **Framework:** Angular 21+ (Standalone Components, Signals & TypeScript).
- **Internacionalización (i18n):** `@ngx-translate/core` & `@ngx-translate/http-loader`.
- **Testing:** Vitest & jsdom (`@angular/build:unit-test`).
- **Estilos:** CSS3 Moderno con Custom Properties (Variables CSS) y soporte Dark/Light Mode.
- **Control de Versiones:** Git & GitHub.
- **Hosting & Despliegue:** Vercel (con redirección SPA vía `vercel.json`).
- **Gestión de Dominio y DNS:** Cloudflare.
- **Formularios:** Formspree.

---

## 📂 Estructura del Proyecto

```text
portfolio/
├── public/
│   ├── i18n/
│   │   ├── es.json                          # Textos y datos (proyectos, skills, formación) en Español
│   │   └── en.json                          # Textos y datos (proyectos, skills, formación) en Inglés
│   └── favicon.svg                          # Favicon vectorial temático (>_)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   │   ├── header/                  # Cabecera, navegación, toggles (ES/EN y 🌙/☀️)
│   │   │   │   └── footer/                  # Pie de página y copyright dinámico
│   │   │   └── sections/
│   │   │       ├── hero/                    # Presentación DAM, status badge y enlaces
│   │   │       ├── projects/                # Grid 2x2 de proyectos con elevación y modal
│   │   │       ├── skills/                  # Grid 2x2 de habilidades con carpetas y listas
│   │   │       ├── education/               # Timeline de formación DAM y cursos Cisco
│   │   │       └── contact/                 # Formulario de contacto AJAX con Formspree y honeypot
│   │   ├── models/
│   │   │   ├── project.model.ts             # Interfaz ProjectItem
│   │   │   ├── skill.model.ts               # Interfaz SkillCategory
│   │   │   ├── education.model.ts           # Interfaz EducationItem
│   │   │   └── portfolio-state.model.ts     # Tipos Language y Theme
│   │   ├── services/
│   │   │   └── portfolio-state.service.ts   # Gestión del tema y exposición del idioma activo derivado de ngx-translate
│   │   ├── app.ts / app.html / app.css      # Componente raíz orquestador
│   │   ├── app.spec.ts                      # Tests unitarios del componente raíz
│   │   └── app.config.ts                    # Proveedores HTTP y configuración de ngx-translate
│   ├── styles.css                           # Variables de color globales y base terminal
│   └── index.html                           # Entrada HTML principal
├── vercel.json                              # Configuración de rewrites para Vercel SPA
├── DEPLOY.md                                # Guía de despliegue en Vercel y Cloudflare
└── README.md                                # Documentación del proyecto
```

---

## 💻 Desarrollo Local

Para clonar y ejecutar este proyecto en tu entorno local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jorgefuentess9/portfolio.git
   cd portfolio
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
   *(Ejecuta `ng serve --port 4300` y abre la aplicación en `http://localhost:4300/`)*

4. Ejecutar los tests unitarios:
   ```bash
   npm test
   ```
   *(Ejecuta los tests unitarios con Vitest)*

5. Compilar para producción:
   ```bash
   npm run build
   ```
   *(Los archivos optimizados se generan en `dist/portfolio-angular/browser`)*

---

## 📬 Contacto & Redes

- **Web:** [jorgefuentes.dev](https://jorgefuentes.dev)
- **GitHub:** [@jorgefuentess9](https://github.com/jorgefuentess9)
