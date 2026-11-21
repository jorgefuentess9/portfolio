export const SKILL_ICON_KEYS = [
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
  'schema',
  'bolt',
  'docker',
  'linux',
  'ubuntu',
  'git',
  'github',
  'cisco',
  'terminal',
  'code',
  'users',
  'layers',
  'compass'
] as const;

export type SkillIconKey = (typeof SKILL_ICON_KEYS)[number];

export interface SkillItem {
  name: string;
  icon: SkillIconKey;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

