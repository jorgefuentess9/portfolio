/* ==========================================================================
   Portfolio · Jorge Fuentes Aguilar
   Aviso flotante estilo terminal para los proyectos aún en desarrollo.

   Uso: cualquier enlace con el atributo data-notice muestra ese texto en un
   aviso flotante en lugar de navegar. Opcionalmente, data-notice-title cambia
   el título de la barra (por defecto "~/aviso").
   ========================================================================== */

(() => {
  'use strict';

  const DEFAULT_TITLE = '~/aviso';

  let notice;       // contenedor del aviso (se crea la primera vez que se usa)
  let titleEl;
  let textEl;
  let lastTrigger;  // enlace que abrió el aviso, para devolverle el foco al cerrar

  function createNotice() {
    notice = document.createElement('aside');
    notice.className = 'notice';
    notice.tabIndex = -1;
    notice.hidden = true;
    notice.setAttribute('role', 'dialog');
    notice.setAttribute('aria-modal', 'false');
    notice.setAttribute('aria-labelledby', 'notice-title');
    notice.setAttribute('aria-describedby', 'notice-text');

    // Estructura fija: el contenido variable se inserta después con textContent
    notice.innerHTML = `
      <div class="notice__bar">
        <span class="notice__title" id="notice-title"></span>
        <button class="notice__close" type="button" aria-label="Cerrar aviso">&times;</button>
      </div>
      <p class="notice__text" id="notice-text"></p>
    `;

    titleEl = notice.querySelector('.notice__title');
    textEl = notice.querySelector('.notice__text');
    notice.querySelector('.notice__close').addEventListener('click', closeNotice);

    document.body.append(notice);
  }

  function openNotice(trigger) {
    if (!notice) createNotice();

    lastTrigger = trigger;
    titleEl.textContent = trigger.dataset.noticeTitle || DEFAULT_TITLE;
    textEl.textContent = trigger.dataset.notice;

    notice.hidden = false;
    notice.focus({ preventScroll: true });
  }

  function closeNotice() {
    if (!notice || notice.hidden) return;

    const hadFocus = notice.contains(document.activeElement);
    notice.hidden = true;

    // Solo devolvemos el foco si el usuario seguía dentro del aviso
    if (hadFocus && lastTrigger) lastTrigger.focus();
  }

  // Delegación de eventos: también funciona con tarjetas que se añadan más adelante
  document.addEventListener('click', (event) => {
    const trigger = event.target.closest('[data-notice]');
    if (!trigger) return;

    event.preventDefault();
    openNotice(trigger);
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeNotice();
  });
})();