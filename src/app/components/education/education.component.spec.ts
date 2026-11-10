import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { EducationComponent } from './education.component';

describe('EducationComponent', () => {
  let fixture: ComponentFixture<EducationComponent>;
  let component: EducationComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EducationComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      education: {
        sectionPrefix: '~/',
        sectionTitle: 'formación',
        sectionSubtitle: 'Itinerario académico y certificaciones técnicas',
        items: [
          {
            degree: 'Grado Superior en DAM',
            institution: 'Formación Profesional Oficial',
            period: 'En curso',
            details: ['Desarrollo multiplataforma', 'Bases de datos relacionales']
          },
          {
            degree: 'Introducción a la Ciberseguridad',
            institution: 'Cisco Networking Academy',
            period: 'Completado',
            details: ['Seguridad en redes']
          }
        ]
      }
    });

    fixture = TestBed.createComponent(EducationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the education component', () => {
    expect(component).toBeTruthy();
  });

  it('should render timeline items with degree, period, institution and details', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#formacion-titulo')?.textContent?.trim()).toBe('~/formación');

    const items = el.querySelectorAll('.timeline-item');
    expect(items.length).toBe(2);
    expect(items[0].querySelector('.timeline-degree')?.textContent?.trim()).toBe('Grado Superior en DAM');
    expect(items[0].querySelector('.timeline-period')?.textContent?.trim()).toBe('En curso');
    expect(items[1].querySelector('.timeline-institution')?.textContent?.trim()).toBe('Cisco Networking Academy');
    expect(items[0].querySelectorAll('.timeline-details li').length).toBe(2);
  });
});

