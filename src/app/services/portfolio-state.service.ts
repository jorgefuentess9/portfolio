import { Injectable, signal, computed } from '@angular/core';

export type Language = 'es' | 'en';
export type Theme = 'dark' | 'light';

export interface ProjectItem {
  id: string;
  kind: string;
  title: string;
  desc: string;
  tags: string[];
  link: string;
  inProgress?: boolean;
  notice?: string;
  noticeTitle?: string;
}

export interface SkillCategory {
  title: string;
  skills: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  period: string;
  details: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PortfolioStateService {
  // Estado de Tema
  currentTheme = signal<Theme>('dark');

  // Estado de Idioma
  currentLang = signal<Language>('es');

  // Diccionario de textos e i18n
  private translations: Record<Language, any> = {
    es: {
      nav: {
        projects: '~/proyectos',
        skills: '~/habilidades',
        education: '~/formación',
        contact: '~/contacto',
        themeToggle: 'Cambiar modo',
        langToggle: 'Idioma'
      },
      hero: {
        name: 'Jorge Fuentes Aguilar',
        badge: 'DAM Developer',
        subtitle: 'Estudiante de Desarrollo de Aplicaciones Multiplataforma - DAM',
        intro: 'Desarrollo aplicaciones de escritorio y web con foco en el código limpio, arquitecturas escalables y bases de datos bien estructuradas. Me gusta que las soluciones sean simples, legibles y fáciles de mantener.',
        githubBtn: 'GitHub',
        contactBtn: 'Contacto'
      },
      projects: {
        sectionTitle: '~/proyectos',
        sectionSubtitle: 'Proyectos destacados y desarrollos en curso',
        viewGithub: 'Ver en GitHub',
        viewProject: 'Ver proyecto',
        inProgressBadge: 'En desarrollo',
        items: [
          {
            id: 'milfshakes',
            kind: 'base de datos & devops',
            title: 'Milfshakes',
            desc: 'Modelo relacional avanzado diseñado sobre PostgreSQL, desplegado con entornos automatizados en contenedores Docker para garantizar reproducibilidad en cualquier entorno.',
            tags: ['PostgreSQL', 'Docker', 'SQL DDL/DML', 'Modelado Relacional'],
            link: 'https://github.com/jorgefuentess9/m-shakes'
          },
          {
            id: 'ecommerce-java',
            kind: 'escritorio & persistencia',
            title: 'E-Commerce & Control de Stock',
            desc: 'Aplicación de escritorio en Java para gestión de comercio minorista, control de inventario y facturación. Diseñada bajo patrón MVC con persistencia en MariaDB y MySQL mediante JDBC optimizado.',
            tags: ['Java', 'MariaDB', 'MySQL', 'JDBC', 'MVC', 'Swing'],
            link: 'https://github.com/jorgefuentess9/ecommerce-java-db'
          },
          {
            id: 'viduke-club',
            kind: 'desarrollo web',
            title: 'ViDuke Club',
            desc: 'Plataforma web de alquiler de videojuegos construida con HTML, CSS y JavaScript nativo, implementando una arquitectura de UI limpia y reactividad cliente.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Arquitectura Web'],
            link: 'https://github.com/jorgefuentess9/viduke-club'
          },
          {
            id: 'datagame',
            kind: 'proyecto personal',
            title: 'DataGame',
            desc: 'Plataforma web colaborativa para valoraciones y análisis de videojuegos. Enfocada en diseño arquitectónico modular y modelado relacional en PostgreSQL.',
            tags: ['PostgreSQL', 'Modelado Relacional', 'Web API', 'Frontend'],
            link: '#',
            inProgress: true,
            notice: '⚡ Proyecto en desarrollo: Actualmente diseñando la arquitectura de datos relacionales y API REST. ¡Pronto en GitHub!',
            noticeTitle: '~/datagame'
          }
        ]
      },
      skills: {
        sectionTitle: '~/habilidades',
        sectionSubtitle: 'Stack técnico, herramientas y habilidades personales',
        technicalTitle: 'Tecnologías & Bases de Datos',
        systemsTitle: 'Sistemas & Cloud',
        softTitle: 'Soft Skills',
        categories: [
          {
            title: 'Lenguajes & Backend',
            skills: ['Java (POO, MVC, JDBC)', 'Python (Scripting & Automatización)', 'TypeScript / JavaScript', 'HTML5 & CSS3 Moderno']
          },
          {
            title: 'Bases de Datos & Persistencia',
            skills: ['PostgreSQL', 'MariaDB / MySQL', 'SQLite (Bases embebidas)', 'Diseño Relacional & Normalización', 'Optimización de Consultas']
          },
          {
            title: 'Infraestructura, DevOps & Redes',
            skills: ['Docker (Contenedores & Volúmenes)', 'Linux / Ubuntu Server', 'Cisco Networking Academy', 'Git & GitHub']
          },
          {
            title: 'Competencias Profesionales',
            skills: ['Resolución metódica de problemas', 'Código limpio y mantenible', 'Trabajo en equipo y comunicación', 'Aprendizaje continuo y autonomía']
          }
        ]
      },
      education: {
        sectionTitle: '~/formación',
        sectionSubtitle: 'Itinerario académico y certificaciones técnicas',
        items: [
          {
            degree: 'Grado Superior en Desarrollo de Aplicaciones Multiplataforma (DAM)',
            institution: 'Formación Profesional Oficial',
            period: 'En curso',
            details: [
              'Especialización en desarrollo de software con Java, gestión de bases de datos relacionales (PostgreSQL, MariaDB, MySQL, SQLite).',
              'Sistemas, despliegues y fundamentos de redes e ingeniería de software.'
            ]
          },
          {
            degree: 'Cisco Networking Academy',
            institution: 'Cisco Networking Academy',
            period: 'Certificaciones & Cursos',
            details: [
              'Conocimientos sólidos en direccionamiento IP, switching, routing, protocolos de red y configuración de infraestructuras.',
              'Buenas prácticas en seguridad y conectividad de servidores Linux/Ubuntu.'
            ]
          },
          {
            degree: 'Especialización en Python, Linux & Contenedores',
            institution: 'Formación continua y proyectos prácticos',
            period: 'Desarrollo autónomo',
            details: [
              'Manejo de entornos Linux (Ubuntu Server) en terminal.',
              'Contenedores Docker para bases de datos reproducibles y desarrollo de scripts en Python.'
            ]
          }
        ]
      },
      contact: {
        sectionTitle: '~/contacto',
        sectionSubtitle: '¿Tienes una propuesta, una duda o quieres colaborar en un proyecto?',
        introText: 'Escríbeme a través del siguiente formulario y te responderé con la mayor brevedad. También puedes encontrarme en mis perfiles oficiales.',
        formName: 'Nombre completo',
        formNamePlaceholder: 'Ej. Alex García',
        formEmail: 'Correo electrónico',
        formEmailPlaceholder: 'tu@correo.com',
        formMessage: 'Mensaje',
        formMessagePlaceholder: 'Cuéntame sobre tu propuesta, proyecto o consulta...',
        submitBtn: 'Enviar mensaje',
        sendingBtn: 'Enviando mensaje...',
        successMsg: '✅ ¡Mensaje enviado con éxito! Te responderé lo antes posible.',
        errorMsg: '❌ Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.'
      },
      footer: {
        rights: 'Todos los derechos reservados.',
        designedWith: 'Construido con Angular 19+ · Clean Architecture & CSS Terminal'
      }
    },
    en: {
      nav: {
        projects: '~/projects',
        skills: '~/skills',
        education: '~/education',
        contact: '~/contact',
        themeToggle: 'Toggle theme',
        langToggle: 'Language'
      },
      hero: {
        name: 'Jorge Fuentes Aguilar',
        badge: 'Multiplatform Software Developer',
        subtitle: 'Higher Vocational Degree Student in Multiplatform Application Development (DAM)',
        intro: 'I develop desktop and web applications focusing on clean code, scalable architecture, and well-structured databases. I love solutions that are simple, readable, and maintainable.',
        githubBtn: 'GitHub',
        contactBtn: 'Contact Me'
      },
      projects: {
        sectionTitle: '~/projects',
        sectionSubtitle: 'Featured projects and works in progress',
        viewGithub: 'View on GitHub',
        viewProject: 'View project',
        inProgressBadge: 'In development',
        items: [
          {
            id: 'milfshakes',
            kind: 'database & devops',
            title: 'Milfshakes',
            desc: 'Advanced relational schema designed on PostgreSQL, automated with Docker containers for seamless reproducibility across environments.',
            tags: ['PostgreSQL', 'Docker', 'SQL DDL/DML', 'Relational Modeling'],
            link: 'https://github.com/jorgefuentess9/m-shakes'
          },
          {
            id: 'ecommerce-java',
            kind: 'desktop & persistence',
            title: 'E-Commerce & Stock Control',
            desc: 'Java desktop application for retail management, inventory tracking, and billing. Built with MVC architecture and persistence in MariaDB and MySQL via JDBC.',
            tags: ['Java', 'MariaDB', 'MySQL', 'JDBC', 'MVC', 'Swing'],
            link: 'https://github.com/jorgefuentess9/ecommerce-java-db'
          },
          {
            id: 'viduke-club',
            kind: 'web development',
            title: 'ViDuke Club',
            desc: 'Video game rental web platform built using native HTML, CSS, and vanilla JavaScript, showcasing clean UI structure and client-side reactivity.',
            tags: ['JavaScript', 'HTML5', 'CSS3', 'Web Architecture'],
            link: 'https://github.com/jorgefuentess9/viduke-club'
          },
          {
            id: 'datagame',
            kind: 'personal project',
            title: 'DataGame',
            desc: 'Community platform for video game reviews and analytics. Emphasizing modular architecture and relational modeling in PostgreSQL.',
            tags: ['PostgreSQL', 'Relational Design', 'Web API', 'Frontend'],
            link: '#',
            inProgress: true,
            notice: '⚡ Project under development: Currently designing the relational schema and REST APIs. Coming soon on GitHub!',
            noticeTitle: '~/datagame'
          }
        ]
      },
      skills: {
        sectionTitle: '~/skills',
        sectionSubtitle: 'Technical stack, systems and professional capabilities',
        technicalTitle: 'Technologies & Databases',
        systemsTitle: 'Systems & Cloud',
        softTitle: 'Soft Skills',
        categories: [
          {
            title: 'Languages & Backend',
            skills: ['Java (OOP, MVC, JDBC)', 'Python (Scripting & Automation)', 'TypeScript / JavaScript', 'Modern HTML5 & CSS3']
          },
          {
            title: 'Databases & Persistence',
            skills: ['PostgreSQL', 'MariaDB / MySQL', 'SQLite (Embedded DBs)', 'Relational Modeling & Normalization', 'Query Optimization']
          },
          {
            title: 'Infrastructure, DevOps & Networks',
            skills: ['Docker (Containers & Volumes)', 'Linux / Ubuntu Server', 'Cisco Networking Academy', 'Git & GitHub']
          },
          {
            title: 'Professional Competencies',
            skills: ['Systematic problem solving', 'Clean & maintainable code', 'Teamwork and clear communication', 'Self-directed continuous learning']
          }
        ]
      },
      education: {
        sectionTitle: '~/education',
        sectionSubtitle: 'Academic journey and technical certifications',
        items: [
          {
            degree: 'Higher Degree in Multiplatform Application Development (DAM)',
            institution: 'Official Vocational Education',
            period: 'In progress',
            details: [
              'Specializing in software engineering with Java, relational database design (PostgreSQL, MariaDB, MySQL, SQLite).',
              'Operating systems, server deployments, networking fundamentals, and multiplatform software.'
            ]
          },
          {
            degree: 'Cisco Networking Academy',
            institution: 'Cisco Networking Academy',
            period: 'Courses & Certifications',
            details: [
              'Strong foundation in IP addressing, switching, routing, network protocols, and infrastructure topology.',
              'Best practices in networking and secure configuration for Linux/Ubuntu server environments.'
            ]
          },
          {
            degree: 'Python, Linux & Containers Specialization',
            institution: 'Hands-on practical development',
            period: 'Self-driven projects',
            details: [
              'Command-line proficiency in Ubuntu Server / Linux environments.',
              'Dockerized setups for isolated relational databases and automated Python utilities.'
            ]
          }
        ]
      },
      contact: {
        sectionTitle: '~/contact',
        sectionSubtitle: 'Have an inquiry, project proposal, or want to collaborate?',
        introText: 'Reach out using the form below and I will respond as soon as possible. You can also connect via GitHub.',
        formName: 'Full Name',
        formNamePlaceholder: 'e.g. Alex Garcia',
        formEmail: 'Email Address',
        formEmailPlaceholder: 'your@email.com',
        formMessage: 'Message',
        formMessagePlaceholder: 'Tell me about your proposal or project inquiry...',
        submitBtn: 'Send Message',
        sendingBtn: 'Sending message...',
        successMsg: '✅ Message sent successfully! I will get back to you shortly.',
        errorMsg: '❌ An error occurred while sending the message. Please try again.'
      },
      footer: {
        rights: 'All rights reserved.',
        designedWith: 'Built with Angular 19+ · Clean Architecture & Terminal CSS'
      }
    }
  };

  // Selector computado para el diccionario actual
  t = computed(() => this.translations[this.currentLang()]);

  toggleTheme(): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    if (typeof document !== 'undefined') {
      if (theme === 'light') {
        document.body.classList.add('light-mode');
      } else {
        document.body.classList.remove('light-mode');
      }
    }
  }

  toggleLanguage(): void {
    const next = this.currentLang() === 'es' ? 'en' : 'es';
    this.currentLang.set(next);
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
  }
}

