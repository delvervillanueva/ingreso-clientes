import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import {
  CustomerSearchPayload,
  CustomerSearchResult,
} from '../interfaces/customer-search.interface';

@Injectable({ providedIn: 'root' })
export class CustomerApiService {
  searchCustomer(payload: CustomerSearchPayload): Observable<CustomerSearchResult> {
    const found = payload.dni.length === 8;

    return of({
      found,
      customerName: found ? 'Carlos G.' : undefined,
      creditApproved: found,
    }).pipe(delay(400));
  }
}
