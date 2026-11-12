import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { FooterComponent } from './footer.component';

describe('FooterComponent', () => {
  let fixture: ComponentFixture<FooterComponent>;
  let component: FooterComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      footer: {
        rights: 'Todos los derechos reservados.',
        designedWith: 'Construido con Angular'
      }
    });

    fixture = TestBed.createComponent(FooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the footer component', () => {
    expect(component).toBeTruthy();
  });

  it('should display the current year and translated footer text', () => {
    const el = fixture.nativeElement as HTMLElement;
    const expectedYear = new Date().getFullYear();

    expect(component.currentYear).toBe(expectedYear);
    expect(el.querySelector('.footer-copy')?.textContent).toContain(String(expectedYear));
    expect(el.querySelector('.footer-copy')?.textContent).toContain('Jorge Fuentes Aguilar');
    expect(el.querySelector('.footer-copy')?.textContent).toContain('Todos los derechos reservados.');
    expect(el.querySelector('.footer-tagline')?.textContent?.trim()).toBe('Construido con Angular');
  });
});

