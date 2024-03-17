import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { PermissionCode } from '../model/auth';
import { AuthorizationService } from '../services/authorization.service';

@Directive({
    selector: '[disableIfUnauthorized]'
})
export class DisableIfNotUnauthorizedDirective implements OnInit {
    @Input('disableIfUnauthorized') permission: PermissionCode; // Required permission passed in

    constructor(public el: ElementRef, public authorizationService: AuthorizationService) { }

    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
            this.el.nativeElement.disabled = true;
        }
    }
}