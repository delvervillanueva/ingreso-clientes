import { Routes } from '@angular/router';
import { PartnerLayoutComponent } from './layout/partner-layout/partner-layout.component';

export const routes: Routes = [
  {
    path: '',
    component: PartnerLayoutComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'customer-search',
      },
      {
        path: 'customer-search',
        loadComponent: () =>
          import('./features/customer-search/pages/customer-search-page/customer-search-page.component').then(
            (m) => m.CustomerSearchPageComponent,
          ),
      },
      {
        path: 'requests',
        loadComponent: () =>
          import('./features/requests/pages/requests-page/requests-page.component').then(
            (m) => m.RequestsPageComponent,
          ),
      },
      {
        path: 'transaction-request',
        loadComponent: () =>
          import('./features/transaction-request/pages/transaction-request-page/transaction-request-page.component').then(
            (m) => m.TransactionRequestPageComponent,
          ),
      },
      {
        path: 'transaction-sent',
        loadComponent: () =>
          import('./features/transaction-request/pages/transaction-sent-page/transaction-sent-page.component').then(
            (m) => m.TransactionSentPageComponent,
          ),
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'customer-search',
  },
];
