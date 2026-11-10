import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService, TranslationObject } from '@ngx-translate/core';
import { ProjectsComponent } from './projects.component';

describe('ProjectsComponent', () => {
  let fixture: ComponentFixture<ProjectsComponent>;
  let component: ProjectsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProjectsComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      projects: {
        sectionPrefix: '~/',
        sectionTitle: 'proyectos',
        sectionSubtitle: 'Proyectos destacados',
        viewGithub: 'Ver en GitHub',
        viewProject: 'Ver proyecto',
        inProgressBadge: 'En desarrollo',
        gotItBtn: 'Entendido',
        items: [
          {
            id: 'milfshakes',
            kind: 'base de datos',
            title: 'M***shakes',
            desc: 'Modelo relacional en PostgreSQL y Docker.',
            tags: ['PostgreSQL', 'Docker'],
            link: 'https://github.com/jorgefuentess9/m-shakes'
          },
          {
            id: 'datagame',
            kind: 'proyecto personal',
            title: 'DataGame',
            desc: 'Plataforma web de reseñas.',
            tags: ['PostgreSQL', 'Web'],
            link: '#',
            inProgress: true,
            notice: 'Proyecto en desarrollo'
          }
        ]
      }
    } as unknown as TranslationObject);

    fixture = TestBed.createComponent(ProjectsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the projects component', () => {
    expect(component).toBeTruthy();
  });

  it('should render project cards and GitHub link for completed projects', () => {
    const el = fixture.nativeElement as HTMLElement;
    const cards = el.querySelectorAll('.project-card');
    expect(cards.length).toBe(2);

    const firstLink = cards[0].querySelector('a.project-link') as HTMLAnchorElement;
    expect(firstLink).toBeTruthy();
    expect(firstLink.getAttribute('href')).toBe('https://github.com/jorgefuentess9/m-shakes');
  });

  it('should open and close notice modal for in-progress project', () => {
    const el = fixture.nativeElement as HTMLElement;
    const triggerBtn = el.querySelector('.notice-trigger') as HTMLButtonElement;

    expect(el.querySelector('.notice-dialog')).toBeNull();

    triggerBtn.click();
    fixture.detectChanges();

    const dialog = el.querySelector('.notice-dialog');
    expect(dialog).toBeTruthy();
    expect(dialog?.querySelector('.notice-msg')?.textContent?.trim()).toBe('Proyecto en desarrollo');

    const closeBtn = dialog?.querySelector('button') as HTMLButtonElement;
    closeBtn.click();
    fixture.detectChanges();

    expect(el.querySelector('.notice-dialog')).toBeNull();
  });
});
