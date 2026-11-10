# Portfolio Web Personal · Jorge Fuentes Aguilar

> **Dominio oficial:** [jorgefuentes.dev](https://jorgefuentes.dev)  
> **Perfil:** Estudiante de Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM).

Portfolio web personal rediseñado y migrado a **Angular 19+**, conservando una estética minimalista estilo terminal/dev y ampliando su arquitectura a una estructura moderna, modular y con microinteracciones reactivas.

---

## 🚀 Nuevas Funcionalidades y Mejoras

- **Arquitectura Modular por Componentes:** Dividido limpiamente en componentes independientes (`Header`, `Hero`, `Projects`, `Skills`, `Education`, `Contact`, `Footer`).
- **Dark / Light Mode Dinámico:** Selector en cabecera (🌙 / ☀️) con conmutación dinámica de variables CSS globales (`:root` y `body.light-mode`).
- **Internacionalización con `@ngx-translate` (i18n):** Selector de idioma (ES / EN) en el header utilizando `@ngx-translate/core` y `@ngx-translate/http-loader`, cargando dinámicamente los archivos JSON desde `public/i18n/es.json` y `public/i18n/en.json`.
- **Microinteracciones y Efecto Hover Vivo:**
  - Animación suave de elevación (*hover lift*) con sombra difuminada en Proyectos, Habilidades y Formación.
  - Indicador lateral verde terminal activo al interactuar con las tarjetas.
  - Marcadores de línea de tiempo reactivos en la sección de formación.
- **Formulario de Contacto:** Integrado con el servicio de Formspree sin recargas ni bloqueos de interfaz.
- **Favicon Vectorial SVG Personalizado:** Icono temático de terminal (`>_`) adaptado a la identidad de la web.
- **Tests Unitarios por Componente:** Cobertura con archivos `.spec.ts` independientes para `App` y todos los componentes usando **Vitest** y **jsdom**.

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
portfolio-angular/
├── public/
│   ├── i18n/
│   │   ├── es.json                          # Diccionario de traducción en Español
│   │   └── en.json                          # Diccionario de traducción en Inglés
│   └── favicon.svg                          # Favicon vectorial temático (>_)
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   ├── header/                      # Cabecera, navegación, toggles (ES/EN y 🌙/☀️)
│   │   │   ├── hero/                        # Presentación DAM, status badge y enlaces
│   │   │   ├── projects/                    # Grid 2x2 de proyectos con elevación y modal
│   │   │   ├── skills/                      # Grid 2x2 de habilidades con carpetas y listas
│   │   │   ├── education/                   # Timeline de formación DAM y cursos Cisco
│   │   │   ├── contact/                     # Formulario de contacto conectado a Formspree
│   │   │   └── footer/                      # Pie de página y copyright dinámico
│   │   ├── services/
│   │   │   └── portfolio-state.service.ts   # Gestión de estado (temas e idioma activo)
│   │   ├── app.ts / app.html / app.css      # Componente raíz orquestador
│   │   ├── app.spec.ts                      # Tests unitarios del componente raíz
│   │   └── app.config.ts                    # Proveedores HTTP y configuración de ngx-translate
│   ├── styles.css                           # Variables de color globales y base terminal
│   └── index.html                           # Entrada HTML principal
├── vercel.json                              # Configuración de rewrites para Vercel SPA
└── README.md                                # Documentación del proyecto
```

---

## 💻 Desarrollo Local

Para clonar y ejecutar este proyecto en tu entorno local:

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/jorgefuentess9/portfolio.git
   cd portfolio-angular
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm start
   ```
   *(La aplicación se abrirá por defecto en `http://localhost:4300/`)*

4. Ejecutar los tests unitarios:
   ```bash
   npm test
   ```
   *(Ejecuta los 8 archivos `.spec.ts` de los componentes con Vitest)*

5. Compilar para producción:
   ```bash
   npm run build
   ```
   *(Los archivos optimizados se generan en `dist/portfolio-angular/browser`)*

---

## 📬 Contacto & Redes

- **Web:** [jorgefuentes.dev](https://jorgefuentes.dev)
- **GitHub:** [@jorgefuentess9](https://github.com/jorgefuentess9)
