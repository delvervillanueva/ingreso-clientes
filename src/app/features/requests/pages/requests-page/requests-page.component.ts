import { ChangeDetectionStrategy, Component } from '@angular/core';
import { PageHeaderComponent } from '../../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-requests-page',
  standalone: true,
  imports: [PageHeaderComponent],
  templateUrl: './requests-page.component.html',
  styleUrl: './requests-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RequestsPageComponent {}
