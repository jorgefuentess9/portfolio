import { Component, OnDestroy, signal } from '@angular/core';
import { TranslatePipe } from '@ngx-translate/core';

export type ContactSubmitStatus = 'idle' | 'sending' | 'success' | 'error';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [TranslatePipe],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnDestroy {
  readonly formActionUrl = 'https://formspree.io/f/xrpekqzq';
  readonly submitStatus = signal<ContactSubmitStatus>('idle');

  private hideTimer: ReturnType<typeof setTimeout> | null = null;

  onFormInput(): void {
    const current = this.submitStatus();
    if (current === 'success' || current === 'error') {
      this.clearHideTimer();
      this.submitStatus.set('idle');
    }
  }

  async onSubmit(event: Event): Promise<void> {
    event.preventDefault();

    if (this.submitStatus() === 'sending') {
      return;
    }

    const form = event.target as HTMLFormElement;
    this.clearHideTimer();
    this.submitStatus.set('sending');

    try {
      const response = await fetch(this.formActionUrl, {
        method: 'POST',
        body: new FormData(form),
        headers: {
          Accept: 'application/json'
        }
      });

      if (response.ok) {
        this.submitStatus.set('success');
        form.reset();
        this.hideTimer = setTimeout(() => {
          if (this.submitStatus() === 'success') {
            this.submitStatus.set('idle');
          }
        }, 5000);
      } else {
        this.submitStatus.set('error');
      }
    } catch {
      this.submitStatus.set('error');
    }
  }

  ngOnDestroy(): void {
    this.clearHideTimer();
  }

  private clearHideTimer(): void {
    if (this.hideTimer !== null) {
      clearTimeout(this.hideTimer);
      this.hideTimer = null;
    }
  }
}

