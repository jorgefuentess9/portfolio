import { Component, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { PortfolioStateService, SkillCategory } from '../../services/portfolio-state.service';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  state = inject(PortfolioStateService);
  private translate = inject(TranslateService);

  private rawCategories = this.translate.translate('skills.categories');
  skillCategories = computed<SkillCategory[]>(() => {
    const val = this.rawCategories();
    return Array.isArray(val) ? (val as unknown as SkillCategory[]) : [];
  });
}
