import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService } from '@ngx-translate/core';
import { App } from './app';

describe('App', () => {
  let fixture: ComponentFixture<App>;
  let component: App;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    fixture = TestBed.createComponent(App);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it("should have the 'portfolio-angular' title", () => {
    expect(component.title).toBe('portfolio-angular');
  });

  it('should render all layout sections', () => {
    const el = fixture.nativeElement as HTMLElement;
    expect(el.querySelector('app-header')).toBeTruthy();
    expect(el.querySelector('app-hero')).toBeTruthy();
    expect(el.querySelector('app-projects')).toBeTruthy();
    expect(el.querySelector('app-skills')).toBeTruthy();
    expect(el.querySelector('app-education')).toBeTruthy();
    expect(el.querySelector('app-contact')).toBeTruthy();
    expect(el.querySelector('app-footer')).toBeTruthy();
  });
});

