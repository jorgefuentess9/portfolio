import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { HeaderComponent } from './header.component';
import { PortfolioStateService } from '../../services/portfolio-state.service';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
  let component: HeaderComponent;
  let state: PortfolioStateService;

  beforeEach(async () => {
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

    expect(themeBtn.textContent?.trim()).toBe('🌙');
    expect(document.body.classList.contains('light-mode')).toBe(false);

    themeBtn.click();
    fixture.detectChanges();

    expect(state.currentTheme()).toBe('light');
    expect(themeBtn.textContent?.trim()).toBe('☀️');
    expect(document.body.classList.contains('light-mode')).toBe(true);
  });
});

