import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { PortfolioStateService } from '../../../services/portfolio-state.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let state: PortfolioStateService;

  beforeEach(async () => {
    localStorage.clear();
    document.body.classList.remove('light-mode');

    await TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      nav: {
        projects: '~/proyectos',
        skills: '~/habilidades',
        education: '~/formación',
        contact: '~/contacto',
        ariaMain: 'Navegación principal',
        themeToggle: 'Cambiar modo',
        themeToLight: 'Cambiar a modo claro',
        themeToDark: 'Cambiar a modo oscuro',
        langToggle: 'Idioma',
        langTitle: 'Cambiar idioma',
        menuOpen: 'Abrir menú',
        menuClose: 'Cerrar menú'
      }
    });
    translate.setTranslation('en', {
      nav: {
        projects: '~/projects',
        skills: '~/skills',
        education: '~/education',
        contact: '~/contact',
        ariaMain: 'Main navigation',
        themeToggle: 'Toggle theme',
        themeToLight: 'Switch to light mode',
        themeToDark: 'Switch to dark mode',
        langToggle: 'Language',
        langTitle: 'Switch language',
        menuOpen: 'Open menu',
        menuClose: 'Close menu'
      }
    });

    state = TestBed.inject(PortfolioStateService);
    fixture = TestBed.createComponent(HeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the header component', () => {
    expect(component).toBeTruthy();
  });

  it('should render navigation links with Spanish translations by default', () => {
    const el = fixture.nativeElement as HTMLElement;
    const links = Array.from(el.querySelectorAll('.nav-link')).map(a => a.textContent?.trim());
    expect(links).toEqual(['~/proyectos', '~/habilidades', '~/formación', '~/contacto']);
  });

  it('should toggle language between ES and EN when clicking language button', () => {
    const el = fixture.nativeElement as HTMLElement;
    const langBtn = el.querySelector('.lang-btn') as HTMLButtonElement;

    langBtn.click();
    fixture.detectChanges();

    expect(state.currentLang()).toBe('en');
    const links = Array.from(el.querySelectorAll('.nav-link')).map(a => a.textContent?.trim());
    expect(links).toEqual(['~/projects', '~/skills', '~/education', '~/contact']);

    langBtn.click();
    fixture.detectChanges();
    expect(state.currentLang()).toBe('es');
  });

  it('should toggle theme between dark and light mode and update action labels', () => {
    const el = fixture.nativeElement as HTMLElement;
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;

    expect(themeBtn.querySelector('.theme-icon--moon')).toBeTruthy();
    expect(document.body.classList.contains('light-mode')).toBe(false);
    expect(themeBtn.getAttribute('aria-label')).toBe('Cambiar a modo claro');
    expect(themeBtn.getAttribute('title')).toBe('Cambiar a modo claro');

    themeBtn.click();
    fixture.detectChanges();

    expect(state.currentTheme()).toBe('light');
    expect(themeBtn.querySelector('.theme-icon--sun')).toBeTruthy();
    expect(document.body.classList.contains('light-mode')).toBe(true);
    expect(themeBtn.getAttribute('aria-label')).toBe('Cambiar a modo oscuro');
    expect(themeBtn.getAttribute('title')).toBe('Cambiar a modo oscuro');
  });

  it('should translate navigation, language, theme and mobile menu accessibility attributes', () => {
    const el = fixture.nativeElement as HTMLElement;
    const nav = el.querySelector('nav') as HTMLElement;
    const langBtn = el.querySelector('.lang-btn') as HTMLButtonElement;
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;
    const menuBtn = el.querySelector('.mobile-menu-btn') as HTMLButtonElement;

    expect(nav.getAttribute('aria-label')).toBe('Navegación principal');
    expect(langBtn.getAttribute('title')).toBe('Cambiar idioma');
    expect(themeBtn.getAttribute('aria-label')).toBe('Cambiar a modo claro');
    expect(menuBtn.getAttribute('aria-label')).toBe('Abrir menú');

    langBtn.click();
    fixture.detectChanges();

    expect(nav.getAttribute('aria-label')).toBe('Main navigation');
    expect(langBtn.getAttribute('title')).toBe('Switch language');
    expect(themeBtn.getAttribute('aria-label')).toBe('Switch to light mode');
    expect(themeBtn.getAttribute('title')).toBe('Switch to light mode');
    expect(menuBtn.getAttribute('aria-label')).toBe('Open menu');

    themeBtn.click();
    menuBtn.click();
    fixture.detectChanges();

    expect(themeBtn.getAttribute('aria-label')).toBe('Switch to dark mode');
    expect(themeBtn.getAttribute('title')).toBe('Switch to dark mode');
    expect(menuBtn.getAttribute('aria-label')).toBe('Close menu');
  });

  it('should toggle mobile menu and close it when clicking a navigation link', () => {
    const el = fixture.nativeElement as HTMLElement;
    const menuBtn = el.querySelector('.mobile-menu-btn') as HTMLButtonElement;
    const nav = el.querySelector('.nav-links') as HTMLElement;
    const firstLink = el.querySelector('.nav-link') as HTMLAnchorElement;

    expect(component.mobileMenuOpen()).toBe(false);
    expect(nav.classList.contains('nav-links--open')).toBe(false);
    expect(menuBtn.getAttribute('aria-label')).toBe('Abrir menú');

    menuBtn.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(true);
    expect(nav.classList.contains('nav-links--open')).toBe(true);
    expect(menuBtn.getAttribute('aria-label')).toBe('Cerrar menú');

    firstLink.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(false);
    expect(nav.classList.contains('nav-links--open')).toBe(false);
    expect(menuBtn.getAttribute('aria-label')).toBe('Abrir menú');
  });
});

