import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-customer-result-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './customer-result-card.component.html',
  styleUrl: './customer-result-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerResultCardComponent {
  readonly customerName = input.required<string>();
}
