import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-transaction-request-page',
  standalone: true,
  imports: [PageHeaderComponent, ReactiveFormsModule],
  templateUrl: './transaction-request-page.component.html',
  styleUrl: './transaction-request-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionRequestPageComponent {
  private readonly router = inject(Router);

  readonly customerName = signal('Carlos G.');
  readonly amount = new FormControl('', {
    nonNullable: true,
    validators: [Validators.required, Validators.pattern(/^\d+(?:[.,]\d{1,2})?$/)],
  });
  readonly submitted = signal(false);

  onSubmit(): void {
    this.submitted.set(true);
    this.amount.markAsTouched();

    if (this.amount.invalid) {
      return;
    }

    void this.router.navigate(['/transaction-sent'], {
      queryParams: { amount: this.amount.value },
    });
  }
}
