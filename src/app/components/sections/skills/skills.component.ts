import { Component, computed, inject } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkillCategory, SkillIconKey } from '../../../models/skill.model';

export type { SkillIconKey };

const FULL_WIDTH_ICONS = new Set<SkillIconKey>([
  'schema',
  'bolt',
  'docker',
  'cisco',
  'terminal',
  'code',
  'users',
  'layers',
  'compass'
]);

const SVG_ASSET_ICONS = new Set<SkillIconKey>([
  'java',
  'python',
  'odoo',
  'angular',
  'typescript',
  'javascript',
  'html5',
  'css3',
  'postgresql',
  'mariadb',
  'mysql',
  'sqlite',
  'docker',
  'linux',
  'ubuntu',
  'git',
  'cisco'
]);

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

  isFullWidth(icon: SkillIconKey): boolean {
    return FULL_WIDTH_ICONS.has(icon);
  }

  isSvgAsset(icon: SkillIconKey): boolean {
    return SVG_ASSET_ICONS.has(icon);
  }
}
