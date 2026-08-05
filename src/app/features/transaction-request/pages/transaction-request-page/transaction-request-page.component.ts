import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
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
  }
}
