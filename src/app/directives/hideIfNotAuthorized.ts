import { Directive, ElementRef, OnInit , Input } from '@angular/core';
import { PermissionCode } from '../model/auth';
import { AuthorizationService } from '../services/authorization.service';

@Directive({
    selector: '[hideIfUnauthorized]'
})
export class HideIfNotUnauthorizedDirective implements OnInit {
    @Input('hideIfUnauthorized') permission: any; // Required permission passed in

    constructor(public el: ElementRef, public authorizationService: AuthorizationService) { }

    ngOnInit() {
        if (!this.authorizationService.hasPermission(this.permission)) {
            this.el.nativeElement.style.display = 'none';
        }
    }
}