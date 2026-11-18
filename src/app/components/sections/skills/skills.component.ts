import { Component, inject, computed } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { SkillCategory } from '../../../models/skill.model';

export type SkillIconKey =
  | 'java'
  | 'python'
  | 'odoo'
  | 'angular'
  | 'typescript'
  | 'javascript'
  | 'html5'
  | 'css3'
  | 'postgresql'
  | 'mariadb'
  | 'mysql'
  | 'sqlite'
  | 'schema'
  | 'bolt'
  | 'docker'
  | 'linux'
  | 'ubuntu'
  | 'git'
  | 'github'
  | 'cisco'
  | 'terminal'
  | 'code'
  | 'users'
  | 'layers'
  | 'compass';

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

  getSkillIcon(item: string): SkillIconKey {
    const lower = item.toLowerCase();
    if (lower.startsWith('java (')) return 'java';
    if (lower === 'java') return 'java';
    if (lower.includes('python')) return 'python';
    if (lower.includes('odoo')) return 'odoo';
    if (lower.includes('angular')) return 'angular';
    if (lower.includes('typescript')) return 'typescript';
    if (lower.includes('javascript')) return 'javascript';
    if (lower.includes('html')) return 'html5';
    if (lower.includes('css')) return 'css3';
    if (lower.includes('postgresql')) return 'postgresql';
    if (lower.includes('mariadb')) return 'mariadb';
    if (lower.includes('mysql')) return 'mysql';
    if (lower.includes('sqlite')) return 'sqlite';
    if (lower.includes('relacional') || lower.includes('relational')) return 'schema';
    if (lower.includes('optimización') || lower.includes('optimization')) return 'bolt';
    if (lower.includes('docker')) return 'docker';
    if (lower === 'linux') return 'linux';
    if (lower.includes('ubuntu')) return 'ubuntu';
    if (lower === 'git') return 'git';
    if (lower.includes('github')) return 'github';
    if (lower.includes('cisco')) return 'cisco';
    if (lower.includes('resolución') || lower.includes('problem')) return 'terminal';
    if (lower.includes('código') || lower.includes('clean')) return 'code';
    if (lower.includes('equipo') || lower.includes('teamwork')) return 'users';
    if (lower.includes('adaptabilidad') || lower.includes('adaptability')) return 'layers';
    return 'compass';
  }

  isFullWidth(item: string): boolean {
    const icon = this.getSkillIcon(item);
    return (
      icon === 'schema' ||
      icon === 'bolt' ||
      icon === 'docker' ||
      icon === 'cisco' ||
      icon === 'terminal' ||
      icon === 'code' ||
      icon === 'users' ||
      icon === 'layers' ||
      icon === 'compass'
    );
  }

  isSvgAsset(icon: SkillIconKey): boolean {
    return (
      icon === 'java' ||
      icon === 'python' ||
      icon === 'odoo' ||
      icon === 'angular' ||
      icon === 'typescript' ||
      icon === 'javascript' ||
      icon === 'html5' ||
      icon === 'css3' ||
      icon === 'postgresql' ||
      icon === 'mariadb' ||
      icon === 'mysql' ||
      icon === 'sqlite' ||
      icon === 'docker' ||
      icon === 'linux' ||
      icon === 'ubuntu' ||
      icon === 'git' ||
      icon === 'cisco'
    );
  }
}
