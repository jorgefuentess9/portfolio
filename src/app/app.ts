import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/layout/header/header.component';
import { HeroComponent } from './components/sections/hero/hero.component';
import { ProjectsComponent } from './components/sections/projects/projects.component';
import { SkillsComponent } from './components/sections/skills/skills.component';
import { EducationComponent } from './components/sections/education/education.component';
import { ContactComponent } from './components/sections/contact/contact.component';
import { FooterComponent } from './components/layout/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    HeaderComponent,
    HeroComponent,
    ProjectsComponent,
    SkillsComponent,
    EducationComponent,
    ContactComponent,
    FooterComponent
  ],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
  title = 'portfolio-angular';
}
