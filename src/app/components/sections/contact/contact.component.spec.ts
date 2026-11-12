import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { ContactComponent } from './contact.component';

describe('ContactComponent', () => {
  let fixture: ComponentFixture<ContactComponent>;
  let component: ContactComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContactComponent],
      providers: [provideTranslateService({ lang: 'es', fallbackLang: 'es' })]
    }).compileComponents();

    const translate = TestBed.inject(TranslateService);
    translate.setTranslation('es', {
      contact: {
        sectionPrefix: '~/',
        sectionTitle: 'contacto',
        sectionSubtitle: '¿Tienes una propuesta?',
        introText: 'Escríbeme mediante el formulario.',
        formName: 'Nombre completo',
        formNamePlaceholder: 'Ej. Alex García',
        formEmail: 'Correo electrónico',
        formEmailPlaceholder: 'tu@correo.com',
        formMessage: 'Mensaje',
        formMessagePlaceholder: 'Tu mensaje...',
        submitBtn: 'Enviar mensaje'
      }
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the contact component', () => {
    expect(component).toBeTruthy();
  });

  it('should configure the Formspree form with required inputs', () => {
    const el = fixture.nativeElement as HTMLElement;
    const form = el.querySelector('form.contact-form') as HTMLFormElement;

    expect(form).toBeTruthy();
    expect(form.getAttribute('action')).toBe('https://formspree.io/f/xrpekqzq');
    expect(form.getAttribute('method')).toBe('POST');

    const nameInput = el.querySelector('#name') as HTMLInputElement;
    const emailInput = el.querySelector('#email') as HTMLInputElement;
    const messageInput = el.querySelector('#message') as HTMLTextAreaElement;

    expect(nameInput.required).toBe(true);
    expect(emailInput.required).toBe(true);
    expect(messageInput.required).toBe(true);
    expect(el.querySelector('.submit-btn')?.textContent).toContain('Enviar mensaje');
  });
});

