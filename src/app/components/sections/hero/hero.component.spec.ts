import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { HeroComponent } from './hero.component';

describe('HeroComponent', () => {
  let fixture: ComponentFixture<HeroComponent>;
  let component: HeroComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      hero: {
        name: 'Jorge Fuentes Aguilar',
        badge: 'DAM Developer',
        subtitle: 'Estudiante de Desarrollo de Aplicaciones Multiplataforma - DAM',
        intro: 'Desarrollo aplicaciones de escritorio y web.',
        githubBtn: 'GitHub',
        contactBtn: 'Contacto'
      }
    });

    fixture = TestBed.createComponent(HeroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the hero component', () => {
    expect(component).toBeTruthy();
  });

  it('should render translated name, badge, subtitle and intro', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('.badge')?.textContent).toContain('DAM Developer');
    expect(el.querySelector('.hero__name')?.textContent?.trim()).toBe('Jorge Fuentes Aguilar');
    expect(el.querySelector('.hero__subtitle')?.textContent?.trim()).toBe(
      'Estudiante de Desarrollo de Aplicaciones Multiplataforma - DAM'
    );
    expect(el.querySelector('.hero__intro')?.textContent?.trim()).toBe(
      'Desarrollo aplicaciones de escritorio y web.'
    );
  });

  it('should render GitHub, LinkedIn and Contact links', () => {
    const el = fixture.nativeElement as HTMLElement;
    const anchors = Array.from(el.querySelectorAll('.hero__links a')) as HTMLAnchorElement[];
    const hrefs = anchors.map(a => a.getAttribute('href'));

    expect(hrefs).toContain('https://github.com/jorgefuentess9');
    expect(hrefs).toContain('https://www.linkedin.com/in/jorge-fuentes-aguilar-700838443/');
    expect(hrefs).toContain('#contacto');
  });
});

