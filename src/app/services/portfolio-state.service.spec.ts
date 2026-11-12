import { TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { PortfolioStateService } from './portfolio-state.service';

describe('PortfolioStateService', () => {
  let service: PortfolioStateService;
  let translate: TranslateService;

  beforeEach(() => {
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

  it('should call translate.use, update derived currentLang signal, and set document.documentElement.lang on setLanguage and toggleLanguage', () => {
    const useSpy = vi.spyOn(translate, 'use');

    service.setLanguage('en');
    expect(useSpy).toHaveBeenCalledWith('en');
    expect(service.currentLang()).toBe('en');
    expect(document.documentElement.lang).toBe('en');

    service.toggleLanguage();
    expect(useSpy).toHaveBeenCalledWith('es');
    expect(service.currentLang()).toBe('es');
    expect(document.documentElement.lang).toBe('es');
  });

  it('should toggle theme and update body.light-mode class', () => {
    expect(service.currentTheme()).toBe('dark');
    expect(document.body.classList.contains('light-mode')).toBe(false);

    service.toggleTheme();
    expect(service.currentTheme()).toBe('light');
    expect(document.body.classList.contains('light-mode')).toBe(true);

    service.toggleTheme();
    expect(service.currentTheme()).toBe('dark');
    expect(document.body.classList.contains('light-mode')).toBe(false);
  });
});
