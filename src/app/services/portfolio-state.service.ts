import { Injectable, signal, inject, Signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs';
import { Language, Theme } from '../models/portfolio-state.model';

export const THEME_STORAGE_KEY = 'portfolio_theme';
export const LANG_STORAGE_KEY = 'portfolio_lang';

@Injectable({
  providedIn: 'root'
})
export class PortfolioStateService {
  private translate = inject(TranslateService);

  // Estado de Tema (Dark / Light)
  currentTheme = signal<Theme>('dark');

  // Idioma activo derivado de TranslateService como única fuente de verdad
  readonly currentLang: Signal<Language> = toSignal(
    this.translate.onLangChange.pipe(map(e => e.lang as Language)),
    { initialValue: (this.translate.getCurrentLang() === 'en' ? 'en' : 'es') as Language }
  );

  constructor() {
    this.translate.addLangs(['es', 'en']);
    this.translate.setFallbackLang('es');

    const savedTheme = this.getStoredValue(THEME_STORAGE_KEY);
    const initialTheme: Theme = savedTheme === 'light' ? 'light' : 'dark';
    this.setTheme(initialTheme);

    const savedLang = this.getStoredValue(LANG_STORAGE_KEY);
    const initialLang: Language = savedLang === 'en' ? 'en' : 'es';
    this.setLanguage(initialLang);
  }

  toggleTheme(): void {
    const next = this.currentTheme() === 'dark' ? 'light' : 'dark';
    this.setTheme(next);
  }

  setTheme(theme: Theme): void {
    this.currentTheme.set(theme);
    this.setStoredValue(THEME_STORAGE_KEY, theme);
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
    this.translate.use(lang);
    this.setStoredValue(LANG_STORAGE_KEY, lang);
    if (typeof document !== 'undefined') {
      document.documentElement.lang = lang;
    }
  }

  private getStoredValue(key: string): string | null {
    try {
      return typeof localStorage !== 'undefined' ? localStorage.getItem(key) : null;
    } catch {
      return null;
    }
  }

  private setStoredValue(key: string, value: string): void {
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.setItem(key, value);
      }
    } catch {
      // Ignorar errores de almacenamiento (p. ej. modo privado restringido)
    }
  }
}

