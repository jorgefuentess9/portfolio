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
        techLabel: 'Tecnologías',
        noticeLabel: 'Aviso de proyecto en desarrollo',
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

  it('should render translated aria-label on technology tag lists', () => {
    const el = fixture.nativeElement as HTMLElement;
    const tagLists = Array.from(el.querySelectorAll('ul.tags'));
    expect(tagLists.length).toBe(2);
    for (const list of tagLists) {
      expect(list.getAttribute('aria-label')).toBe('Tecnologías');
    }
  });

  it('should open an accessible notice dialog, trap focus, and restore focus on close button click', () => {
    const el = fixture.nativeElement as HTMLElement;
    const triggerBtn = el.querySelector('.notice-trigger') as HTMLButtonElement;

    expect(el.querySelector('.notice-dialog')).toBeNull();
    expect(component.activeNotice()).toBeNull();

    triggerBtn.click();
    fixture.detectChanges();

    const dialog = el.querySelector('.notice-dialog') as HTMLElement;
    expect(dialog).toBeTruthy();
    expect(dialog.getAttribute('role')).toBe('dialog');
    expect(dialog.getAttribute('aria-modal')).toBe('true');
    expect(dialog.getAttribute('aria-label')).toBe('Aviso de proyecto en desarrollo');
    expect(dialog.getAttribute('aria-describedby')).toBe('project-notice-msg');
    expect(dialog.querySelector('.notice-msg')?.textContent?.trim()).toBe('Proyecto en desarrollo');

    const closeBtn = dialog.querySelector('button') as HTMLButtonElement;
    expect(document.activeElement).toBe(closeBtn);

    const tabEvent = new KeyboardEvent('keydown', { key: 'Tab', cancelable: true });
    document.dispatchEvent(tabEvent);
    expect(tabEvent.defaultPrevented).toBe(true);
    expect(document.activeElement).toBe(closeBtn);

    closeBtn.click();
    fixture.detectChanges();

    expect(el.querySelector('.notice-dialog')).toBeNull();
    expect(component.activeNotice()).toBeNull();
    expect(document.activeElement).toBe(triggerBtn);
  });

  it('should close notice dialog with Escape key and return focus to trigger button', () => {
    const el = fixture.nativeElement as HTMLElement;
    const triggerBtn = el.querySelector('.notice-trigger') as HTMLButtonElement;

    triggerBtn.click();
    fixture.detectChanges();
    expect(el.querySelector('.notice-dialog')).toBeTruthy();

    const escEvent = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    document.dispatchEvent(escEvent);
    fixture.detectChanges();

    expect(escEvent.defaultPrevented).toBe(true);
    expect(el.querySelector('.notice-dialog')).toBeNull();
    expect(component.activeNotice()).toBeNull();
    expect(document.activeElement).toBe(triggerBtn);
  });

  it('should close notice dialog on backdrop click and clean up keydown listener on destroy', () => {
    const el = fixture.nativeElement as HTMLElement;
    const triggerBtn = el.querySelector('.notice-trigger') as HTMLButtonElement;

    triggerBtn.click();
    fixture.detectChanges();

    const backdrop = el.querySelector('.notice-dialog-backdrop') as HTMLElement;
    backdrop.click();
    fixture.detectChanges();

    expect(el.querySelector('.notice-dialog')).toBeNull();
    expect(document.activeElement).toBe(triggerBtn);

    triggerBtn.click();
    fixture.detectChanges();
    expect(component.activeNotice()).toBe('Proyecto en desarrollo');

    fixture.destroy();
    const escEvent = new KeyboardEvent('keydown', { key: 'Escape', cancelable: true });
    document.dispatchEvent(escEvent);
    expect(escEvent.defaultPrevented).toBe(false);
  });
});
