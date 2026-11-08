import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PortfolioStateService } from '../../services/portfolio-state.service';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  state = inject(PortfolioStateService);

  formData = {
    name: '',
    _replyto: '',
    message: ''
  };

  isSubmitting = false;
  submitSuccess = false;
  submitError = false;

  async onSubmit(): Promise<void> {
    this.isSubmitting = true;
    this.submitSuccess = false;
    this.submitError = false;

    try {
      const response = await fetch('https://formspree.io/f/xrpekqzq', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.formData)
      });

      if (response.ok) {
        this.submitSuccess = true;
        this.formData = { name: '', _replyto: '', message: '' };
      } else {
        this.submitError = true;
      }
    } catch (err) {
      this.submitError = true;
    } finally {
      this.isSubmitting = false;
    }
  }
}

