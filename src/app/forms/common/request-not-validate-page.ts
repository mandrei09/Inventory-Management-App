import { Component } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { RequestReason } from '../../model/api/common/request-reason';
import { RequestHttpService } from '../../services/http/administration/request.http.service';

@Component({
    selector: 'app-request-not-validate-page',
    templateUrl: 'request-not-validate-page.html'
})
export class RequestNotValidatePageComponent {
    reason: string = '';
    guid: string = '';
    constructor(private requestHttpService: RequestHttpService, private route: ActivatedRoute, private router: Router) {
        alert('1');
        this.route.params.subscribe((params: Params) => {
            if (params['id']) {
                this.guid = params['id'];
            }
        });
    }

    save () {
        const reasonEmail = new RequestReason();
        reasonEmail.reason = this.reason;
        reasonEmail.guid = this.guid;
        this.requestHttpService.rejectBudget(reasonEmail).subscribe( (res) => {
            if (res.success) {
                this.router.navigate(['/success']);
            }
        });
    }
}
