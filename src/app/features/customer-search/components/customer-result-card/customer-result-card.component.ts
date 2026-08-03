import { ChangeDetectionStrategy, Component, input } from '@angular/core';

@Component({
  selector: 'app-customer-result-card',
  standalone: true,
  templateUrl: './customer-result-card.component.html',
  styleUrl: './customer-result-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerResultCardComponent {
  readonly customerName = input.required<string>();
}
