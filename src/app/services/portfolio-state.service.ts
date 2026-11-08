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
            id: 'viduke-club',
            kind: 'web',
            title: 'ViDuke Club',
            desc: 'Web de alquiler de videojuegos construida con HTML, CSS y JavaScript, con una interfaz clara y la lógica en el lado cliente.',
            tags: ['HTML', 'CSS', 'JS'],
            link: 'https://github.com/jorgefuentess9/viduke-club'
          },
          {
            id: 'ecommerce-java',
            kind: 'escritorio',
            title: 'E-Commerce & Control de Stock',
            desc: 'Aplicación de escritorio en Java Swing para gestionar un comercio y su inventario. Arquitectura MVC y persistencia en MariaDB mediante JDBC.',
            tags: ['Java Swing', 'MVC', 'MariaDB', 'JDBC'],
            link: 'https://github.com/jorgefuentess9/ecommerce-java-db'
          },
          {
            id: 'milfshakes',
            kind: 'base de datos',
            title: 'M***shakes',
            desc: 'Modelo relacional diseñado sobre PostgreSQL, con el entorno de base de datos en contenedores Docker para poder reproducirlo en cualquier máquina.',
            tags: ['PostgreSQL', 'Docker'],
            link: 'https://github.com/jorgefuentess9/m-shakes'
          },
          {
            id: 'datagame',
            kind: 'proyecto personal',
            title: 'DataGame',
            desc: 'Plataforma web de valoraciones y reseñas de videojuegos. Diseño de arquitectura de software y modelo relacional en PostgreSQL.',
            tags: ['PostgreSQL', 'Base de Datos', 'Web'],
            link: '#',
            inProgress: true,
            notice: '⚡ Proyecto en desarrollo: Actualmente estoy diseñando la arquitectura de datos y la interfaz de DataGame. ¡Estará disponible pronto!',
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
            skills: ['Java (POO, MVC, JDBC)', 'Python (Scripting & Automatización)', 'TypeScript / JavaScript', 'HTML & CSS']
          },
          {
            title: 'Bases de Datos & Persistencia',
            skills: ['PostgreSQL', 'MariaDB / MySQL', 'Diseño Relacional & Normalización', 'Optimización de Consultas']
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
              'Desarrollo de software multiplataforma, bases de datos relacionales (PostgreSQL, MariaDB, MySQL, SQLite) y sistemas.',
              'Aplicaciones de escritorio y web orientadas a buenas prácticas y código limpio.'
            ]
          },
          {
            degree: 'Introducción a la Ciberseguridad',
            institution: 'Cisco Networking Academy',
            period: 'Completado',
            details: [
              'Conceptos fundamentales de seguridad en redes, defensa digital, detección de amenazas y protección de la privacidad.',
              'Principios de seguridad aplicados a sistemas y comunicaciones.'
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
        designedWith: 'Construido con Angular 19+'
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
            id: 'viduke-club',
            kind: 'web',
            title: 'ViDuke Club',
            desc: 'Video game rental web platform built using HTML, CSS, and vanilla JavaScript, with a clear interface and client-side logic.',
            tags: ['HTML', 'CSS', 'JS'],
            link: 'https://github.com/jorgefuentess9/viduke-club'
          },
          {
            id: 'ecommerce-java',
            kind: 'desktop',
            title: 'E-Commerce & Control de Stock',
            desc: 'Desktop application in Java Swing for store inventory and retail management. MVC architecture and MariaDB persistence via JDBC.',
            tags: ['Java Swing', 'MVC', 'MariaDB', 'JDBC'],
            link: 'https://github.com/jorgefuentess9/ecommerce-java-db'
          },
          {
            id: 'milfshakes',
            kind: 'database',
            title: 'M***shakes',
            desc: 'Relational database schema designed in PostgreSQL, automated with Docker containers for consistent execution anywhere.',
            tags: ['PostgreSQL', 'Docker'],
            link: 'https://github.com/jorgefuentess9/m-shakes'
          },
          {
            id: 'datagame',
            kind: 'personal project',
            title: 'DataGame',
            desc: 'Video game reviews and rating community platform. Software architecture design and relational modeling in PostgreSQL.',
            tags: ['PostgreSQL', 'Database', 'Web'],
            link: '#',
            inProgress: true,
            notice: '⚡ Project under development: Currently designing the data architecture and interface. Coming soon!',
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
            skills: ['Java (OOP, MVC, JDBC)', 'Python (Scripting & Automation)', 'TypeScript / JavaScript', 'HTML & CSS']
          },
          {
            title: 'Databases & Persistence',
            skills: ['PostgreSQL', 'MariaDB / MySQL', 'Relational Modeling & Normalization', 'Query Optimization']
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
              'Multiplatform software development, relational databases (PostgreSQL, MariaDB, MySQL, SQLite), and operating systems.',
              'Desktop and web applications focused on industry best practices and clean code.'
            ]
          },
          {
            degree: 'Introduction to Cybersecurity',
            institution: 'Cisco Networking Academy',
            period: 'Completed',
            details: [
              'Fundamental principles of network security, digital defense, threat detection, and privacy protection.',
              'Security concepts applied to operating systems and digital communications.'
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
        designedWith: 'Built with Angular 19+'
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

