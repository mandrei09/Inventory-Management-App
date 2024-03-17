import { AppConfig } from './../../config';
import { AdmCenterHttpService } from './../../services/http/administration/adm-center.http.service';
import { AdmCenter } from './../../model/api/administration/adm-center';
import { Component, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeHttpService } from '../../services/http/administration/employee.http.service';
import { HighlightPipe } from '../common/pipes/highlight-pipe ';
import { GenericTableList } from '../generic/generic.table.list';
import { AdmCenterListComponent } from '../administrations/adm-centers/adm-center.list';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { IdentityService } from '../../services/identity.service';
import { AppData } from '../../app-data';
import { Param } from '../../model/common/param';

@Component({
    selector: 'app-user-list',
    templateUrl: '../generic/generic.table.list.html',
    styleUrls: ['user.list.scss'],
    providers: [ AdmCenterHttpService, EmployeeHttpService, HighlightPipe, IdentityService ]
})
export class UserListComponent extends GenericTableList<any, string> {

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;


    public selectedModalData: any = {user: '', admCenter: ''};
    public selectedAdmCenters: Array<AdmCenter> = new Array<AdmCenter>();
    public model: any = {};
    public errorMessages: string[] = [];
    public errorMessage: string = '';
    public listName: string = 'USERLISTS';

    constructor(public router: Router,
        public admCenterHttpService: AdmCenterHttpService,
        public employeeHttpService: EmployeeHttpService,
        public highlightPipe: HighlightPipe,
        public identityService: IdentityService) {
        super('username', 'asc', 'users');
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
    }

    public refresh(filters: Array<Param>) {
        this.columns = AppData.ColumnDefinitions[this.listName];
        this.initializeTable();
        super.refresh(filters);
    }

    ngAfterViewInit() {
    }

    changePassword(user: string) {
        this.router.navigate(['/passwordreset', user]);
    }

    deleteUser(user: string) {
        if (confirm('Stergeti utilizatorul selectat?')) {
            this.identityService.Delete(user)
                .subscribe(() => {
                    this.refresh(null);
                    alert('Utilizatorul a fost sters.');
                });
        }
    }

    /* begin admCenter */
    // public selectAdmCenters(user, admCenter) {
    //     this.selectedModalData.user = user;
    //     this.selectedModalData.admCenter = admCenter;

    //     this.admCenterListModal.show();
    //     $('.modal-backdrop').remove();
    //     this.admCenterList.selectedItems = this.selectedAdmCenters;
    //     this.admCenterList.refresh(null);
    // }

    // public setSelectedAdmCenters() {
    //     this.selectedAdmCenters['user']=this.selectedModalData.user;
    //     this.selectedAdmCenters = this.admCenterList.selectedItems;
    //     this.model.id=this.selectedAdmCenters['user'];
    //     this.model.admCenterId=this.selectedAdmCenters[0].id;

    //     this.identityService.UpdateUserAdmCenter(this.model)
    //         .subscribe(
    //         (res: any) => {
    //             // IdentityResult.
    //             if (res.succeeded) {
    //                 // Signs in the user.
    //                 this.router.navigate(['/identity']);
    //             } else {
    //                 this.errorMessages = res.errors;
    //             }

    //         },
    //         (error: any) => {

    //             // Error on post request.
    //             let errMsg = (error.message) ? error.message :
    //                 error.status ? `${error.status} - ${error.statusText}` : 'Server error';

    //             this.errorMessage = "Server error. Try later.";

    //         });

    //     this.admCenterListModal.hide();
    // }

    /* end admCenter */

}
