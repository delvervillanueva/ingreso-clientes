import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';
import { CustomerSearchCardComponent } from '../../components/customer-search-card/customer-search-card.component';
import { CustomerResultCardComponent } from '../../components/customer-result-card/customer-result-card.component';
import { CustomerSearchPayload, CustomerSearchResult } from '../../interfaces/customer-search.interface';
import { CustomerApiService } from '../../services/customer-api.service';

@Component({
  selector: 'app-customer-search-page',
  standalone: true,
  imports: [PageHeaderComponent, CustomerSearchCardComponent, CustomerResultCardComponent],
  templateUrl: './customer-search-page.component.html',
  styleUrl: './customer-search-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerSearchPageComponent {
  private readonly customerApi = inject(CustomerApiService);

  readonly loading = signal(false);
  readonly searchResult = signal<CustomerSearchResult | null>(null);

  onSearch(payload: CustomerSearchPayload): void {
    this.loading.set(true);
    this.searchResult.set(null);
    this.customerApi.searchCustomer(payload).subscribe({
      next: (result) => {
        this.searchResult.set(result);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  onResetSearch(): void {
    this.loading.set(false);
    this.searchResult.set(null);
  }
}
