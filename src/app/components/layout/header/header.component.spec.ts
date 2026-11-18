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
        themeToggle: 'Cambiar modo',
        langToggle: 'Idioma'
      }
    });
    translate.setTranslation('en', {
      nav: {
        projects: '~/projects',
        skills: '~/skills',
        education: '~/education',
        contact: '~/contact',
        themeToggle: 'Toggle theme',
        langToggle: 'Language'
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

  it('should toggle theme between dark and light mode', () => {
    const el = fixture.nativeElement as HTMLElement;
    const themeBtn = el.querySelector('.theme-btn') as HTMLButtonElement;

    expect(themeBtn.querySelector('.theme-icon--moon')).toBeTruthy();
    expect(document.body.classList.contains('light-mode')).toBe(false);

    themeBtn.click();
    fixture.detectChanges();

    expect(state.currentTheme()).toBe('light');
    expect(themeBtn.querySelector('.theme-icon--sun')).toBeTruthy();
    expect(document.body.classList.contains('light-mode')).toBe(true);
  });

  it('should toggle mobile menu and close it when clicking a navigation link', () => {
    const el = fixture.nativeElement as HTMLElement;
    const menuBtn = el.querySelector('.mobile-menu-btn') as HTMLButtonElement;
    const nav = el.querySelector('.nav-links') as HTMLElement;
    const firstLink = el.querySelector('.nav-link') as HTMLAnchorElement;

    expect(component.mobileMenuOpen()).toBe(false);
    expect(nav.classList.contains('nav-links--open')).toBe(false);

    menuBtn.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(true);
    expect(nav.classList.contains('nav-links--open')).toBe(true);

    firstLink.click();
    fixture.detectChanges();

    expect(component.mobileMenuOpen()).toBe(false);
    expect(nav.classList.contains('nav-links--open')).toBe(false);
  });
});

