import { Component, inject, computed } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkillCategory } from '../../../models/skill.model';

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css']
})
export class SkillsComponent {
  private translate = inject(TranslateService);

  private rawCategories = this.translate.translate('skills.categories');
  skillCategories = computed<SkillCategory[]>(() => {
    const val = this.rawCategories();
    return Array.isArray(val) ? (val as unknown as SkillCategory[]) : [];
  });
}
