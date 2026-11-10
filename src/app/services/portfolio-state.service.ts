import { Injectable, signal, inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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
  private translate = inject(TranslateService);

  // Estado de Tema (Dark / Light)
  currentTheme = signal<Theme>('dark');

  // Estado de Idioma actual sincronizado con ngx-translate
  currentLang = signal<Language>('es');

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setFallbackLang('es');
    this.translate.use('es');
  }

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
    const next: Language = this.currentLang() === 'es' ? 'en' : 'es';
    this.setLanguage(next);
  }

  setLanguage(lang: Language): void {
    this.currentLang.set(lang);
    this.translate.use(lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }
}
