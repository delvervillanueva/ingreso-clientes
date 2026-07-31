import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PartnerHeaderComponent } from '../partner-header/partner-header.component';

@Component({
  selector: 'app-partner-layout',
  standalone: true,
  imports: [RouterOutlet, PartnerHeaderComponent],
  templateUrl: './partner-layout.component.html',
  styleUrl: './partner-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PartnerLayoutComponent {
  onLogout(): void {
    // Logout wiring belongs to auth integration; UI-only for now.
  }
}
