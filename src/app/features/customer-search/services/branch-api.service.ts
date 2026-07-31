import { Injectable } from '@angular/core';
import { Observable, of, delay } from 'rxjs';
import { Branch } from '../models/branch.model';

@Injectable({ providedIn: 'root' })
export class BranchApiService {
  getBranches(): Observable<Branch[]> {
    return of([
      { id: 'santiago-centro', name: 'Santiago Centro' },
      { id: 'providencia', name: 'Providencia' },
      { id: 'las-condes', name: 'Las Condes' },
      { id: 'vina-del-mar', name: 'Viña del Mar' },
      { id: 'concepcion', name: 'Concepción' },
    ]).pipe(delay(150));
  }
}
