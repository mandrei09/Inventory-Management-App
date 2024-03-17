import { Component } from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
@Component({
  selector: 'app-role-selector-modal',
  templateUrl: './role-selector-modal.component.html',
  styleUrls: ['./role-selector-modal.component.scss']
})
export class RoleSelectorModalComponent {

  public _roles: string = '';
  public get roles(): string { return this._roles; }
  public set roles(value: string) {
    this._roles = value;
  }

  constructor(
    public dialogRef: MatDialogRef<RoleSelectorModalComponent>,
  ) {}

  ngOnInit(): void {
  }
}
