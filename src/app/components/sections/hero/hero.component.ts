import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'app-hero',
  standalone: true,
  imports: [CommonModule, TranslatePipe],
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})
export class HeroComponent {}
