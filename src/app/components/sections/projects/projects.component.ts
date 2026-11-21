import { Component, DOCUMENT, ElementRef, OnDestroy, computed, effect, inject, signal, viewChild } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { ProjectItem } from '../../../models/project.model';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnDestroy {
  private translate = inject(TranslateService);
  private document = inject(DOCUMENT);

  private rawProjects = this.translate.translate('projects.items');
  projectsList = computed<ProjectItem[]>(() => {
    const val = this.rawProjects();
    return Array.isArray(val) ? (val as unknown as ProjectItem[]) : [];
  });

  activeNotice = signal<string | null>(null);

  private readonly closeBtn = viewChild<ElementRef<HTMLButtonElement>>('noticeCloseBtn');
  private triggerElement: HTMLElement | null = null;
  private keydownListening = false;

  private readonly handleKeydown = (event: KeyboardEvent): void => {
    if (event.key === 'Escape') {
      event.preventDefault();
      this.closeNotice();
      return;
    }

    if (event.key === 'Tab') {
      event.preventDefault();
      this.closeBtn()?.nativeElement.focus();
    }
  };

  constructor() {
    effect(() => {
      const btn = this.closeBtn();
      if (btn) {
        btn.nativeElement.focus();
      }
    });
  }

  showNotice(project: ProjectItem, event: MouseEvent): void {
    if ((project.inProgress || project.notice) && project.notice) {
      event.preventDefault();
      const target = event.currentTarget ?? event.target;
      this.triggerElement = target instanceof HTMLElement
        ? (target.closest('button') ?? target)
        : (this.document.activeElement instanceof HTMLElement ? this.document.activeElement : null);
      this.activeNotice.set(project.notice);
      this.addKeydownListener();
    }
  }

  closeNotice(): void {
    if (!this.activeNotice()) {
      return;
    }
    this.removeKeydownListener();
    this.activeNotice.set(null);
    const trigger = this.triggerElement;
    this.triggerElement = null;
    trigger?.focus();
  }

  ngOnDestroy(): void {
    this.removeKeydownListener();
  }

  private addKeydownListener(): void {
    if (!this.keydownListening) {
      this.document.addEventListener('keydown', this.handleKeydown);
      this.keydownListening = true;
    }
  }

  private removeKeydownListener(): void {
    if (this.keydownListening) {
      this.document.removeEventListener('keydown', this.handleKeydown);
      this.keydownListening = false;
    }
  }
}
