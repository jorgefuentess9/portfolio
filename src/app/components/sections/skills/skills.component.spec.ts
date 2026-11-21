import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService, TranslationObject } from '@ngx-translate/core';
import esTranslations from '../../../../../public/i18n/es.json';
import enTranslations from '../../../../../public/i18n/en.json';
import { SKILL_ICON_KEYS } from '../../../models/skill.model';
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
            skills: [
              { name: 'Java (POO, MVC)', icon: 'java' },
              { name: 'Python & venv', icon: 'python' },
              { name: 'TypeScript', icon: 'typescript' }
            ]
          },
          {
            title: 'Bases de Datos & Persistencia',
            skills: [
              { name: 'PostgreSQL', icon: 'postgresql' },
              { name: 'Diseño Relacional & Normalización', icon: 'schema' }
            ]
          }
        ]
      }
    } as unknown as TranslationObject);

    fixture = TestBed.createComponent(SkillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the skills component', () => {
    expect(component).toBeTruthy();
  });

  it('should render section header and skill category cards with names and icons', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('#habilidades-titulo')?.textContent?.trim()).toBe('~/habilidades');

    const cards = el.querySelectorAll('.skill-category-card');
    expect(cards.length).toBe(2);
    expect(cards[0].querySelector('.category-title')?.textContent).toContain('Lenguajes & Backend');

    const firstItems = cards[0].querySelectorAll('.skill-item');
    expect(firstItems.length).toBe(3);
    expect(firstItems[0].getAttribute('data-skill')).toBe('java');
    expect(firstItems[0].querySelector('.skill-text')?.textContent?.trim()).toBe('Java (POO, MVC)');
    expect(firstItems[0].querySelector('img.tech-svg')?.getAttribute('src')).toBe('icons/java.svg');

    const secondItems = cards[1].querySelectorAll('.skill-item');
    expect(secondItems[1].classList.contains('skill-item--full')).toBe(true);
    expect(secondItems[1].querySelector('svg.concept-svg')).toBeTruthy();
  });

  it('should classify SVG assets and full-width icons using icon keys', () => {
    expect(component.isSvgAsset('odoo')).toBe(true);
    expect(component.isSvgAsset('python')).toBe(true);
    expect(component.isSvgAsset('github')).toBe(false);
    expect(component.isSvgAsset('schema')).toBe(false);

    expect(component.isFullWidth('java')).toBe(false);
    expect(component.isFullWidth('docker')).toBe(true);
    expect(component.isFullWidth('schema')).toBe(true);
    expect(component.isFullWidth('layers')).toBe(true);
  });

  it('should have valid and matching skill icons and counts across es.json and en.json', () => {
    const validIcons = new Set<string>(SKILL_ICON_KEYS);
    const esCategories = esTranslations.skills.categories;
    const enCategories = enTranslations.skills.categories;

    expect(esCategories.length).toBeGreaterThan(0);
    expect(esCategories.length).toBe(enCategories.length);

    esCategories.forEach((esCategory, catIdx) => {
      const enCategory = enCategories[catIdx];
      expect(esCategory.skills.length).toBeGreaterThan(0);
      expect(esCategory.skills.length).toBe(enCategory.skills.length);

      esCategory.skills.forEach((esSkill, skillIdx) => {
        const enSkill = enCategory.skills[skillIdx];
        expect(esSkill.name.trim().length).toBeGreaterThan(0);
        expect(enSkill.name.trim().length).toBeGreaterThan(0);
        expect(validIcons.has(esSkill.icon)).toBe(true);
        expect(validIcons.has(enSkill.icon)).toBe(true);
        expect(esSkill.icon).toBe(enSkill.icon);
      });
    });
  });
});

