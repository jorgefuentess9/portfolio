import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideTranslateService, TranslateService } from '@ngx-translate/core';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
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
        submitBtn: 'Enviar mensaje',
        sendingBtn: 'Enviando mensaje...',
        successMsg: '✅ ¡Mensaje enviado con éxito! Te responderé lo antes posible.',
        errorMsg: '❌ Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.'
      }
    });

    fixture = TestBed.createComponent(ContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    vi.restoreAllMocks();
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
    const subjectInput = el.querySelector('input[name="_subject"]') as HTMLInputElement;
    const gotchaInput = el.querySelector('input[name="_gotcha"]') as HTMLInputElement;

    expect(nameInput.required).toBe(true);
    expect(emailInput.required).toBe(true);
    expect(emailInput.getAttribute('name')).toBe('email');
    expect(messageInput.required).toBe(true);
    expect(subjectInput?.value).toBe('Nuevo mensaje desde el portfolio');
    expect(gotchaInput?.getAttribute('aria-hidden')).toBe('true');
    expect(gotchaInput?.getAttribute('tabindex')).toBe('-1');
    expect(gotchaInput?.getAttribute('autocomplete')).toBe('off');
    expect(el.querySelector('.submit-btn')?.textContent).toContain('Enviar mensaje');
  });

  it('should disable button during sending, show success message and reset form on ok response', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const form = el.querySelector('form.contact-form') as HTMLFormElement;
    const nameInput = el.querySelector('#name') as HTMLInputElement;
    const emailInput = el.querySelector('#email') as HTMLInputElement;
    const messageInput = el.querySelector('#message') as HTMLTextAreaElement;
    const submitBtn = el.querySelector('.submit-btn') as HTMLButtonElement;

    nameInput.value = 'Jorge Fuentes';
    emailInput.value = 'jorge@example.com';
    messageInput.value = 'Hola, este es un mensaje de prueba.';

    let resolveFetch!: (value: Response) => void;
    const fetchPromise = new Promise<Response>(resolve => {
      resolveFetch = resolve;
    });
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockReturnValue(fetchPromise);

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    fixture.detectChanges();

    expect(component.submitStatus()).toBe('sending');
    expect(submitBtn.disabled).toBe(true);
    expect(submitBtn.textContent).toContain('Enviando mensaje...');

    resolveFetch({ ok: true } as Response);
    await fetchPromise;
    await Promise.resolve();
    fixture.detectChanges();

    expect(fetchSpy).toHaveBeenCalledWith(
      'https://formspree.io/f/xrpekqzq',
      expect.objectContaining({
        method: 'POST',
        headers: { Accept: 'application/json' }
      })
    );
    expect(component.submitStatus()).toBe('success');
    expect(submitBtn.disabled).toBe(false);
    expect(submitBtn.textContent).toContain('Enviar mensaje');

    const successAlert = el.querySelector('.alert--success[role="status"]');
    expect(successAlert).toBeTruthy();
    expect(successAlert?.textContent?.trim()).toBe(
      '✅ ¡Mensaje enviado con éxito! Te responderé lo antes posible.'
    );

    expect(nameInput.value).toBe('');
    expect(emailInput.value).toBe('');
    expect(messageInput.value).toBe('');
  });

  it('should show error message and keep form values when fetch fails or returns non-ok', async () => {
    const el = fixture.nativeElement as HTMLElement;
    const form = el.querySelector('form.contact-form') as HTMLFormElement;
    const nameInput = el.querySelector('#name') as HTMLInputElement;
    const emailInput = el.querySelector('#email') as HTMLInputElement;
    const messageInput = el.querySelector('#message') as HTMLTextAreaElement;

    nameInput.value = 'Jorge Fuentes';
    emailInput.value = 'jorge@example.com';
    messageInput.value = 'No quiero perder este texto si falla la red.';

    vi.spyOn(globalThis, 'fetch').mockRejectedValue(new Error('Network failure'));

    form.dispatchEvent(new Event('submit', { cancelable: true }));
    await Promise.resolve();
    await Promise.resolve();
    fixture.detectChanges();

    expect(component.submitStatus()).toBe('error');

    const errorAlert = el.querySelector('.alert--error[role="status"]');
    expect(errorAlert).toBeTruthy();
    expect(errorAlert?.textContent?.trim()).toBe(
      '❌ Ocurrió un error al enviar el mensaje. Por favor intenta de nuevo.'
    );

    expect(nameInput.value).toBe('Jorge Fuentes');
    expect(emailInput.value).toBe('jorge@example.com');
    expect(messageInput.value).toBe('No quiero perder este texto si falla la red.');
  });
});


