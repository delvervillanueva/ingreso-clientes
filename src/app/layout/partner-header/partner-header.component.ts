import { ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, input, output } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-partner-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './partner-header.component.html',
  styleUrl: './partner-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PartnerHeaderComponent {
  readonly userName = input('Laura Alexandra...');
  readonly userInitials = input('LD');
  readonly requestsCount = input(0);

  readonly logout = output<void>();

  onLogout(): void {
    this.logout.emit();
  }
}
