import { Component, inject, computed } from '@angular/core';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { EducationItem } from '../../../models/education.model';

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css']
})
export class EducationComponent {
  private translate = inject(TranslateService);

  private rawEducation = this.translate.translate('education.items');
  educationItems = computed<EducationItem[]>(() => {
    const val = this.rawEducation();
    return Array.isArray(val) ? (val as unknown as EducationItem[]) : [];
  });
}
