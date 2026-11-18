import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import {
  LANG_STORAGE_KEY,
  PortfolioStateService,
  THEME_STORAGE_KEY
} from './portfolio-state.service';

describe('PortfolioStateService', () => {
  let service: PortfolioStateService;
  let translate: TranslateService;

  beforeEach(() => {
    localStorage.clear();
    document.body.classList.remove('light-mode');
    document.documentElement.lang = 'es';

    TestBed.configureTestingModule({
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    });

    translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {});
    translate.setTranslation('en', {});

    service = TestBed.inject(PortfolioStateService);
  });

  it('should initialize with default dark theme and Spanish language derived from TranslateService', () => {
    expect(service.currentTheme()).toBe('dark');
    expect(service.currentLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('should call translate.use, update derived currentLang signal, persist to localStorage and set document.documentElement.lang', () => {
    const useSpy = vi.spyOn(translate, 'use');

    service.setLanguage('en');
    expect(useSpy).toHaveBeenCalledWith('en');
    expect(service.currentLang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('en');

    service.toggleLanguage();
    expect(useSpy).toHaveBeenCalledWith('es');
    expect(service.currentLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
    expect(localStorage.getItem(LANG_STORAGE_KEY)).toBe('es');
  });

  it('should toggle theme, persist to localStorage and update body.light-mode class', () => {
    expect(service.currentTheme()).toBe('dark');
    expect(document.body.classList.contains('light-mode')).toBe(false);

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(document.body.classList.contains('light-mode')).toBe(true);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('light');

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(document.body.classList.contains('light-mode')).toBe(false);
    expect(localStorage.getItem(THEME_STORAGE_KEY)).toBe('dark');
  });

  it('should restore saved theme and language from localStorage on initialization', () => {
    TestBed.resetTestingModule();
    localStorage.setItem(THEME_STORAGE_KEY, 'light');
    localStorage.setItem(LANG_STORAGE_KEY, 'en');

    TestBed.configureTestingModule({
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    });

    const newTranslate = TestBed.inject(TranslateService);
    newTranslate.setTranslation('es', {});
    newTranslate.setTranslation('en', {});

    const restoredService = TestBed.inject(PortfolioStateService);
    expect(restoredService.currentTheme()).toBe('light');
    expect(restoredService.currentLang()).toBe('en');
    expect(document.body.classList.contains('light-mode')).toBe(true);
    expect(document.documentElement.lang).toBe('en');
  });
});
