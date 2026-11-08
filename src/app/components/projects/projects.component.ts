import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PortfolioStateService, ProjectItem } from '../../services/portfolio-state.service';

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent {
  state = inject(PortfolioStateService);
  activeNotice: string | null = null;

  showNotice(project: ProjectItem, event: MouseEvent): void {
    if (project.inProgress && project.notice) {
      event.preventDefault();
      this.activeNotice = project.notice;
    }
  }

  closeNotice(): void {
    this.activeNotice = null;
  }
}

