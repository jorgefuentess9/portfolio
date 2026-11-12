import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { SkillsComponent } from './skills.component';

describe('SkillsComponent', () => {
  let fixture: ComponentFixture<SkillsComponent>;
  let component: SkillsComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkillsComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      skills: {
        sectionPrefix: '~/',
        sectionTitle: 'habilidades',
        sectionSubtitle: 'Stack técnico y competencias',
        categories: [
          {
            title: 'Lenguajes & Backend',
            skills: ['Java', 'Python', 'TypeScript']
          },
          {
            title: 'Bases de Datos & Persistencia',
            skills: ['PostgreSQL', 'MariaDB / MySQL']
          }
        ]
      }
    });

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the skills component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section header and skill category cards', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#habilidades-titulo')?.textContent?.trim()).toBe('~/habilidades');

    const cards = el.querySelectorAll('.skill-category-card');
    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('.category-title')?.textContent).toContain('Lenguajes & Backend');
    expect(cards[0].querySelectorAll('.skill-item').length).toBe(3);
  });
});

