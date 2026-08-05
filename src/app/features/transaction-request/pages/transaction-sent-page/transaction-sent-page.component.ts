import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-transaction-sent-page',
  standalone: true,
  templateUrl: './transaction-sent-page.component.html',
  styleUrl: './transaction-sent-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TransactionSentPageComponent {
  private readonly route = inject(ActivatedRoute);

  readonly customerName = 'Carlos G.';
  readonly branchName = 'Cassinelli Surco';
  readonly requestDate = '23 may 2026 - 07:09 pm';
  readonly formattedAmount = computed(() => {
    const rawAmount = this.route.snapshot.queryParamMap.get('amount') ?? '5000';
    const amount = Number(rawAmount.replace(',', '.'));

    return Number.isFinite(amount)
      ? amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })
      : '5,000.00';
  });
  readonly amountParts = computed(() => {
    const [whole, decimals = '00'] = this.formattedAmount().split('.');
    return { whole, decimals };
  });
}
