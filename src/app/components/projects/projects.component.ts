import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PortfolioStateService, ProjectItem } from '../../services/portfolio-state.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  state = inject(PortfolioStateService);
  private translate = inject(TranslateService);

  private rawProjects = this.translate.translate('projects.items');
  projectsList = computed<ProjectItem[]>(() => {
    const val = this.rawProjects();
    return Array.isArray(val) ? (val as unknown as ProjectItem[]) : [];
  });

  activeNotice: string | null = null;

  showNotice(project: ProjectItem, event: MouseEvent): void {
    if ((project.inProgress || project.notice) && project.notice) {
      event.preventDefault();
      this.activeNotice = project.notice;
    }
  }

  closeNotice(): void {
    this.activeNotice = null;
  }
}
