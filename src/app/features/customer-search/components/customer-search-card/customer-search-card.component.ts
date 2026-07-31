import {
  ChangeDetectionStrategy,
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  DestroyRef,
  inject,
  input,
  OnInit,
  output,
  signal,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { CardComponent } from '../../../../shared/components/card/card.component';
import { CustomerSearchPayload } from '../../interfaces/customer-search.interface';
import { Branch } from '../../models/branch.model';
import { BranchApiService } from '../../services/branch-api.service';

interface BranchListItem {
  label: string;
  value: string;
  active?: boolean;
}

@Component({
  selector: 'app-customer-search-card',
  standalone: true,
  imports: [ReactiveFormsModule, CardComponent],
  templateUrl: './customer-search-card.component.html',
  styleUrl: './customer-search-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class CustomerSearchCardComponent implements OnInit {
  private readonly formBuilder = inject(FormBuilder);
  private readonly branchApi = inject(BranchApiService);
  private readonly destroyRef = inject(DestroyRef);

  readonly loading = input(false);
  readonly search = output<CustomerSearchPayload>();
  readonly resetSearch = output<void>();

  readonly branches = signal<Branch[]>([]);
  readonly selectedBranchLabel = signal('');
  readonly submitted = signal(false);
  readonly dniError = signal<string | undefined>(undefined);
  readonly branchError = signal<string | undefined>(undefined);

  readonly form = this.formBuilder.nonNullable.group({
    dni: ['', [Validators.required, Validators.pattern(/^\d{7,8}$/)]],
    branchId: ['', [Validators.required]],
  });

  readonly branchListItems = signal<BranchListItem[]>([]);

  ngOnInit(): void {
    this.branchApi.getBranches().subscribe((branches: Branch[]) => {
      this.branches.set(branches);
      this.syncBranchListItems();
    });

    this.form.valueChanges.pipe(takeUntilDestroyed(this.destroyRef)).subscribe(() => {
      this.updateErrors();
      this.syncBranchListItems();
    });
  }

  onDniChange(event: Event): void {
    const value = String((event as CustomEvent).detail ?? '');
    this.form.controls.dni.setValue(value);
    this.form.controls.dni.markAsDirty();
  }

  onDniBlur(): void {
    this.form.controls.dni.markAsTouched();
  }

  onBranchItemClicked(
    event: Event,
    selectEl: HTMLElement & { handleSelection: (option: string) => Promise<void> },
  ): void {
    const item = (event as CustomEvent<BranchListItem>).detail;
    if (!item?.label) {
      return;
    }

    void selectEl.handleSelection(item.label);
  }

  onBranchSelectionChanged(event: Event): void {
    const label = String((event as CustomEvent<string>).detail ?? '');
    const branch = this.branches().find((item) => item.name === label);

    this.selectedBranchLabel.set(label);
    this.form.controls.branchId.setValue(branch?.id ?? '');
    this.form.controls.branchId.markAsDirty();
    this.form.controls.branchId.markAsTouched();
  }

  onSubmit(): void {
    this.submitted.set(true);
    this.updateErrors();

    if (this.form.invalid || this.loading()) {
      this.form.markAllAsTouched();
      return;
    }

    this.search.emit(this.form.getRawValue());
  }

  onReset(): void {
    this.submitted.set(false);
    this.selectedBranchLabel.set('');
    this.form.reset({
      dni: '',
      branchId: '',
    });
    this.dniError.set(undefined);
    this.branchError.set(undefined);
    this.syncBranchListItems();
    this.resetSearch.emit();
  }

  private syncBranchListItems(): void {
    const selectedId = this.form.controls.branchId.value;
    this.branchListItems.set(
      this.branches().map((branch) => ({
        label: branch.name,
        value: branch.id,
        active: branch.id === selectedId,
      })),
    );
  }

  private updateErrors(): void {
    if (!this.submitted()) {
      this.dniError.set(undefined);
      this.branchError.set(undefined);
      return;
    }

    const dniControl = this.form.controls.dni;
    if (dniControl.hasError('required')) {
      this.dniError.set('Ingresa el DNI del cliente');
    } else if (dniControl.hasError('pattern')) {
      this.dniError.set('El DNI debe tener 7 u 8 dígitos');
    } else {
      this.dniError.set(undefined);
    }

    this.branchError.set(
      this.form.controls.branchId.hasError('required')
        ? 'Selecciona una sucursal'
        : undefined,
    );
  }
}
