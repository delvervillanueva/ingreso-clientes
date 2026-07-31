import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CustomerSearchCardComponent } from '../../components/customer-search-card/customer-search-card.component';
import { CustomerSearchPayload } from '../../interfaces/customer-search.interface';
import { CustomerApiService } from '../../services/customer-api.service';

@Component({
  selector: 'app-customer-search-page',
  standalone: true,
  imports: [PageHeaderComponent, CustomerSearchCardComponent],
  templateUrl: './customer-search-page.component.html',
  styleUrl: './customer-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSearchPageComponent {
  private readonly customerApi = inject(CustomerApiService);

  readonly loading = signal(false);

  onSearch(payload: CustomerSearchPayload): void {
    this.loading.set(true);
    this.customerApi.searchCustomer(payload).subscribe({
      next: () => this.loading.set(false),
      error: () => this.loading.set(false),
    });
  }

  onResetSearch(): void {
    this.loading.set(false);
  }
}
