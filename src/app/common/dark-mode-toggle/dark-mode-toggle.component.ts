import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { DarkModeService } from 'angular-dark-mode';

@Component({
  selector: 'app-dark-mode-toggle',
  templateUrl: './dark-mode-toggle.component.html',
  styleUrls: ['./dark-mode-toggle.component.scss']
})
export class DarkModeToggleComponent {

  darkMode$: Observable<boolean> = this.darkModeService.darkMode$;

  constructor(
    private darkModeService: DarkModeService
  ) {}

  onToggle(): void {
    this.darkModeService.toggle();
  }
}
