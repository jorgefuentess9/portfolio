import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import esTranslations from '../../../../../public/i18n/es.json';
import enTranslations from '../../../../../public/i18n/en.json';
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
        sectionSubtitle: 'Itinerario académico, certificaciones y competiciones técnicas',
        items: [
          {
            degree: 'Grado Superior en DAM',
            institution: 'Formación Profesional Oficial',
            period: 'En curso',
            details: ['Desarrollo multiplataforma', 'Bases de datos relacionales']
          },
          {
            degree: 'ASTI Robotics Challenge',
            institution: 'Fundación ASTI',
            period: 'Participación',
            details: ['Competición de robótica', 'Programación y trabajo en equipo']
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
    expect(items.length).toBe(3);
    expect(items[0].querySelector('.timeline-degree')?.textContent?.trim()).toBe('Grado Superior en DAM');
    expect(items[0].querySelector('.timeline-period')?.textContent?.trim()).toBe('En curso');
    expect(items[1].querySelector('.timeline-degree')?.textContent?.trim()).toBe('ASTI Robotics Challenge');
    expect(items[1].querySelector('.timeline-institution')?.textContent?.trim()).toBe('Fundación ASTI');
    expect(items[2].querySelector('.timeline-institution')?.textContent?.trim()).toBe('Cisco Networking Academy');
    expect(items[0].querySelectorAll('.timeline-details li').length).toBe(2);
  });

  it('should keep education items synchronized and ordered across es.json and en.json', () => {
    const esItems = esTranslations.education.items;
    const enItems = enTranslations.education.items;

    expect(esItems.length).toBe(3);
    expect(enItems.length).toBe(3);
    expect(esItems[1].degree).toBe('ASTI Robotics Challenge');
    expect(enItems[1].degree).toBe('ASTI Robotics Challenge');
    expect(esItems[1].institution).toBe('Fundación ASTI');
    expect(enItems[1].institution).toBe('Fundación ASTI');
    expect(esItems[2].institution).toBe('Cisco Networking Academy');
    expect(enItems[2].institution).toBe('Cisco Networking Academy');
  });
});

