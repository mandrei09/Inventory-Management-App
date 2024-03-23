import { EmployeeListComponent } from '../administrations/employees/employee.list';
import { EmployeeHttpService } from '../../services/http/administration/employee.http.service';
import { AdmCenterListComponent } from '../administrations/adm-centers/adm-center.list';
import { Component, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DivisionListComponent } from '../administrations/divisions/division.list';
import { RoomListComponent} from '../administrations/rooms/room.list';
import { RoomHttpService } from '../../services/http/administration/room.http.service';
import { DivisionHttpService } from '../../services/http/administration/division.http.service';
import { AdmCenterHttpService } from '../../services/http/administration/adm-center.http.service';
import { UserListComponent } from './user.list';
import { AssetEntityListComponent } from '../assets/assets/asset-entity.list';
import { IdentityService } from '../../services/http/identity/identity.service';
import { AssetHttpService } from '../../services/http/assets/asset.http.service';
import { Param } from '../../model/common/param';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { NotificationService } from '../../services/notification.service';
import { RoleView } from '../../model/api/identity/role-view';
import { RoleService } from '../../services/http/identity/role.service';
import { RoleSave } from '../../model/api/identity/role-save';
import { RoleResult } from '../../model/api/result/role-result';
import { saveAs as fileSaveAs } from 'file-saver-es';
import { AssetFilter } from '../../model/api/assets/asset.filter';
import { MatDialog } from '@angular/material/dialog';
import {AssetEntitySelectionDialog} from '../assets/asset-entity/selection/asset-entity.selection.dialog';
import {EmployeesSelectionDialog} from '../administrations/employees/selection/employees.selection.dialog';
import {MapSubstituteEmployeeSelectionDialog} from '../administrations/employees/map-substitute-employee/map-substitute-employee.selection.dialog';
import {ChangePasswordDialogComponent} from './change-password-dialog/change-password-dialog.component';
import {RoleSelectorModalComponent} from './role-selector-modal/role-selector-modal.component';
import {DialogService} from '../../services/dialog.service';
import {IdentityAddEditComponent} from './identity-add-edit/identity-add-edit.component';
import {User} from '../../model/api/identity/user';
import { UserMobilePhoneResult } from '../../model/api/result/user-mobile-phone-result';
import { MobilePhoneSave } from '../../model/api/identity/mobile-phone-save';

@Component({
    selector: 'identity-manage',
    templateUrl: 'identity.manage.html',
    styleUrls: ['identity.manage.scss'],
    providers: [ AdmCenterHttpService, EmployeeHttpService, DivisionHttpService, RoomHttpService ]
})
export class IdentityManage {

    @ViewChild('registerModal') registerModal: ModalDirective;
    @ViewChild('userList') userList: UserListComponent;


    public role: string = 'all';
    public filter: string = '';
    public model: any = {};
    public errorMessages: string[] = [];
    public errorMessage: string = '';

    public allTemps: string = 'false';
    public fromDate: Date = new Date();
    public toDate: Date = new Date();

    availableRoles: RoleView[] = null;
    selectedRoles: RoleView[] = [];
    selectedRoleIds: Array<number> = new Array<number>();
    public aspNetRole: RoleView = null;

    public item: RoleSave = new RoleSave();
    public isSaved: boolean = true;
    showExportBtn = true;
    pageSize = 10;
    pageSizeTemp = 10;

    @ViewChild('admCenterList') public admCenterList: AdmCenterListComponent;
    @ViewChild('admCenterListModal') public admCenterListModal: ModalDirective;
    @ViewChild('assetTempList') public assetTempList: AssetEntityListComponent;
    @ViewChild('assetTempListModal') public assetTempListModal: ModalDirective;
    @ViewChild('employeeList') public employeeList: EmployeeListComponent;
    @ViewChild('employeeListModal') public employeeListModal: ModalDirective;
    @ViewChild('substituteList') public substituteList: EmployeeListComponent;
    @ViewChild('substituteListModal') public substituteListModal: ModalDirective;
    @ViewChild('roomList') public roomList: RoomListComponent;
    @ViewChild('roomListModal') public roomListModal: ModalDirective;
    @ViewChild('divisionList') public divisionList: DivisionListComponent;
    @ViewChild('divisionListModal') public divisionListModal: ModalDirective;

    constructor(public router: Router,
                public dialog: MatDialog,
                private dialogService: DialogService,
                public identityHttpService: IdentityService,
                public identityService: IdentityService,
                public notificationService: NotificationService,
                public assetHttpService: AssetHttpService,
                public admCenterHttpService: AdmCenterHttpService,
                public divisionHttpService: DivisionHttpService,
                public roomHttpService: RoomHttpService,
                
                public roleHttpService: RoleService,
                public employeeHttpService: EmployeeHttpService) {

    }

    ngAfterViewInit() {
        this.refreshUsers();
    }

    public onTemporaryAdd() {
      let dialogRef = this.dialog.open(AssetEntitySelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

      dialogRef.afterClosed().subscribe((items: any) => {
        this.setSelectedAssetTemp(items);
      });
    }

    public onEmployeeMap() {
      let dialogRef = this.dialog.open(EmployeesSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

      dialogRef.afterClosed().subscribe((items: any) => {
        // console.log(items);
        this.setSelectedEmployee(items);
      });
    }

    public onSubstituteMap() {
      let dialogRef = this.dialog.open(MapSubstituteEmployeeSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

      dialogRef.afterClosed().subscribe((res: any) => {
        console.log(res.startDate);
        console.log(res.endDate);
      });
    }

    // public onDeviceMap() {
    //   let dialogRef = this.dialog.open(DevicesSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

    //   dialogRef.afterClosed().subscribe((res: any) => {
    //     this.setSelectedDevice(res);
    //   });
    // }

    // public onMobilePhoneMap() {
    //   let dialogRef = this.dialog.open(MobilePhoneSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

    //   dialogRef.afterClosed().subscribe((res: any) => {
    //     this.setSelectedMobilePhone(res);
    //   });
    // }

    public onPasswordChange(item: any | null = this.userList.selectedItems[0]) {
      let dialogRef = this.dialog.open(ChangePasswordDialogComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: item }
      });

      dialogRef.afterClosed().subscribe((item: any) => {
        if (item !== null) this.refreshUsers();
      });
    }

    onRoleChange() {
      let dialogRef = this.dialog.open(RoleSelectorModalComponent, {
        panelClass: 'center-middle-modal', disableClose: true, width: '600px', maxHeight: '90%', height: 'auto', position: { top: '10rem' },
      });

      dialogRef.afterClosed().subscribe((claimsValue: string) => {
        if (claimsValue) {
          this.changeRole(claimsValue);
        }
      });
    }

    public onUserSelectionChanged(roles: Array<any>) {

      const params = new Array<Param>();
      this.roleHttpService.get(1, 500, 'id', 'asc', params, null, '').subscribe( (res: any) => {
        this.availableRoles = [];
        this.selectedRoles = [];
        // console.log(JSON.stringify(roles));
        res.items.forEach(element => {
            element.isLeftSide = true;
            this.availableRoles.push(element);
        });

        roles.forEach(element => {
          element.isLeftSide = false;
          // let el = new RoleView();
          // el.name = element.role;
          // this.removeRole(el.name);
      });
    });
  }

  public moveToTarget(event: any) {
    // this.notificationService.showInfo('', 'Move');
    // console.log(JSON.stringify(event));
    // this.showTemplate(1);
    this.selectedRoles.forEach(element => {
            // element.isLeftSide = false;
    });
  }

  removeRole(name: string): void {
    this.availableRoles = this.availableRoles.filter(item => item.name != name);
  }

    public changeRole(claimsValue: string) {
      if (this.userList.selectedItems[0] != null) {
        this.dialogService
          .confirmDialog({
            title: 'Confirm Action',
            message: 'Modificati utilizatorul selectat?',
            confirmCaption: 'Confirm',
            cancelCaption: 'Cancel',
          })
          .subscribe((confirmed: any) => {
            if (confirmed) {
              this.identityService.updateUser(this.userList.selectedItems[0].userName, claimsValue)
                .subscribe(() => {
                  this.refreshUsers();
                  this.notificationService.showSuccess('Actualizarea rolului s a finalizat cu success!', 'Modificare rol user', 0, false, 0);
                });
            } else {
              this.notificationService.showSuccess('Eroare actualizare date!', 'Modificare rol user', 0, false, 0);
            }
          });
      }
    }

    public saveUpdateRoles() {

      this.isSaved = false;
      this.item.userId = this.userList != null && this.userList.selectItem != null ? this.userList.selectedItems[0].id : null;

      this.item.roleIds = new Array<string>();
          this.selectedRoles.forEach(item => {
              this.item.roleIds.push(item.id);
          });
      this.identityService.updateUserRoles(this.item)
      .subscribe((result: RoleResult) => {
          if (result.success) {
            this.notificationService.showSuccess(result.message, 'Update Roluri', 0, false, 0);
            this.refreshUsers();
          } else if (!result.success) {
              this.notificationService.showError('Motiv: ' + result.message + '!', 'Eroare salvare date', 0, false, 0);
              this.isSaved = true;
          }
      });
  }

    public refreshUsers() {
        let params: Array<Param> = new Array<Param>();
        params.push(new Param('filter', this.filter));
        params.push(new Param('role', this.role));

        this.userList.refresh(params);
    }

    public register() {
        // this.registerModal.show();
        this.router.navigate(['/register']);
    }

    public onAddNew() {
      this.onAddEditItem();
    }

    public onAddEditItem(item: any | null = null) {
      let dialogRef = this.dialog.open(IdentityAddEditComponent, {
        panelClass: 'large-modal', disableClose: true, width: '100%', maxWidth: '100vw', maxHeight: '100vh', height: 'calc(100vh - 55px)', position: { bottom: '0' },
        data: { item: null }
      });

      dialogRef.afterClosed().subscribe((item: any) => {
        if (item !== null) this.refreshUsers();
      });
    }

    public setSelectedRole(role: string) {
        this.role = role;
        this.refreshUsers();
    }
    public  changePassword(user: string) {
        this.router.navigate(['/passwordreset', user]);
    }
    public deleteUser(user: any) {
      console.log(user);
      this.dialogService
        .confirmDialog({
          title: 'Confirm Action',
          message: 'Stergeti utilizatorul selectat?',
          confirmCaption: 'Confirm',
          cancelCaption: 'Cancel',
        })
        .subscribe((confirmed: any) => {
          if (confirmed) {
            this.identityService.Delete(user.userName)
              .subscribe(() => {
                this.refreshUsers();
                alert('Utilizatorul a fost sters.');
              });
          }
        });

        // if (confirm('Stergeti utilizatorul selectat?')) {
        //     this.identityService.Delete(user)
        //         .subscribe(() => {
        //            this.refreshUsers();
        //             alert('Utilizatorul a fost sters.');
        //         });
        // }
    }

    public selectAdmCenter() {
        this.admCenterListModal.show();
        this.admCenterList.refresh(null);
    }

    public setSelectedAdmCenter() {

        this.model.userId = this.userList.selectedItems[0].id;
        // this.model.admCenterId = this.admCenterList.selectedItem.id;

        if (this.admCenterList.selectedItems != null) {
            this.model.admCenterIds = new Array<number>();
            this.admCenterList.selectedItems.forEach((selectedItem) => {
                this.model.admCenterIds.push(selectedItem.id);
            });
        }



        this.identityService.UpdateUserAdmCenter(this.model)
            .subscribe(
            (res: any) => {
                // // IdentityResult.
                // if (res.succeeded) {
                //     // Signs in the user.
                //     this.router.navigate(['/identity']);
                // } else {
                //     this.errorMessages = res.errors;
                // }

                this.refreshUsers();

            },
            (error: any) => {

                // Error on post request.
                let errMsg = (error.message) ? error.message :
                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                this.errorMessage = "Server error. Try later.";

            });

        this.admCenterListModal.hide();
    }

    public selectEmployee() {
        this.employeeListModal.show();
        this.employeeList.refresh(null);
    }

    public setSelectedEmployee(selectedEmployeeItems: any) {
                this.model.userId = this.userList.selectedItems[0].id;
                // this.model.employeeId = this.employeeList.selectedItem.id;
                this.model.employeeId = null;
                if(selectedEmployeeItems.length > 0){
                  this.model.employeeId = selectedEmployeeItems[0].id;
                }


                this.identityService.UpdateUserEmployee(this.model)
                    .subscribe(
                    (res: any) => {
                        this.refreshUsers();
                    },
                    (error: any) => {
                        // Error on post request.
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                        this.errorMessage = "Server error. Try later.";
                    });

                // this.employeeListModal.hide();
            }

            public selectSubstitute() {
                this.substituteListModal.show();
                this.substituteList.refresh(null);
            }

            public setSelectedSubstitute() {
                        this.model.userId = this.userList.selectedItems[0].id;
                        this.model.employeeId = this.substituteList.selectedItem.id;
                        this.model.fromDate = this.fromDate;
                        this.model.toDate = this.toDate;


                        this.identityService.UpdateUserSubstitute(this.model)
                            .subscribe(
                            (res: any) => {
                                this.refreshUsers();
                            },
                            (error: any) => {
                                // Error on post request.
                                let errMsg = (error.message) ? error.message :
                                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                                this.errorMessage = "Server error. Try later.";
                            });
                        this.substituteListModal.hide();
                    }

            public selectRoom() {
                this.roomListModal.show();
                this.roomList.refresh(null);
            }
            public setSelectedRoom() {
                        this.model.userId = this.userList.selectedItems[0].id;
                        this.model.roomId = this.roomList.selectedItem.id;
                        this.identityService.UpdateUserRoom(this.model)
                            .subscribe(
                            (res: any) => {
                                this.refreshUsers();
                            },
                            (error: any) => {
                                // Error on post request.
                                let errMsg = (error.message) ? error.message :
                                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                                this.errorMessage = "Server error. Try later.";
                            });

                        this.roomListModal.hide();
                    }

            public selectDivision() {
                this.divisionListModal.show();
                this.divisionList.refresh(null);
            }

            public setSelectedDivision() {
                        this.model.userId = this.userList.selectedItems[0].id;
                        this.model.divisionId = this.divisionList.selectedItem.id;

                        this.identityService.UpdateUserDivision(this.model)
                            .subscribe(
                            (res: any) => {
                                this.refreshUsers();
                            },
                            (error: any) => {
                                // Error on post request.
                                let errMsg = (error.message) ? error.message :
                                    error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                                this.errorMessage = "Server error. Try later.";
                            });

                        this.divisionListModal.hide();
                    }



            public selectAssetTemp() {

              let params = new Array<Param>();
              const assetFilter: AssetFilter = new AssetFilter();
              assetFilter.showAsignedTemp = true;

              params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));


                let selectedAssets = new Array<AssetEntityListComponent>();
                this.assetTempList.selectedItems = selectedAssets;

                this.assetTempListModal.show();
                this.assetTempList.refresh(params);
            }

            public setSelectedAssetTemp(selectedAssetTemp: any) {

                this.model.userId = this.userList.selectedItems[0].id;

                if (selectedAssetTemp != null) {
                    this.model.assetTempIds = new Array<number>();
                  selectedAssetTemp.forEach((selectedItem) => {
                        this.model.assetTempIds.push(selectedItem.id);
                    });
                }



                this.assetHttpService.mapAssetTemp(this.model)
                    .subscribe(
                    (res: any) => {
                        this.refreshUsers();
                    },
                    (error: any) => {

                        // Error on post request.
                        let errMsg = (error.message) ? error.message :
                            error.status ? `${error.status} - ${error.statusText}` : 'Server error';

                        this.errorMessage = "Server error. Try later.";

                    });

                // this.assetTempListModal.hide();
            }

            public showAllTemps(type: boolean){
                let params = new Array<Param>();
                const assetFilter: AssetFilter = new AssetFilter();

                assetFilter.showAsignedTemp = type;
                params.push(new Param('jsonFilter', JSON.stringify(assetFilter)));

                // if (type === false){
                //     this.allTemps = 'true';
                // }else {
                //     this.allTemps = 'false';
                // }


                //params.push(new Param('showAsignedTemp', this.allTemps.toString()));
                params.push(new Param('companyCode', ''));
                this.assetTempList.refresh(params);
            }

            public showAllByCompanyTemps(code: string){

                let params = new Array<Param>();

                params.push(new Param('companyCode', code));
                this.assetTempList.refresh(params);
            }


            // public selectDevice() {
            //     this.deviceListModal.show();
            //     this.deviceList.refresh(null);
            // }

            public updateDevice(){
              this.dialogService
                .confirmDialog({
                  title: 'Confirm Action',
                  message: 'Esti sigur ca vrei sa anulezi dispozitivul?',
                  confirmCaption: 'Confirm',
                  cancelCaption: 'Cancel',
                })
                .subscribe((confirmed: any) => {
                  if (confirmed) {
                    this.identityService.updateDevice(this.userList.selectedItems[0].id).subscribe((res) => {});
                  }
                });

              this.refreshUsers();
          }

          public removeMobilePhone(){
            this.dialogService
              .confirmDialog({
                title: 'Confirm Action',
                message: 'Esti sigur ca vrei sa anulezi numarul de telefon?',
                confirmCaption: 'Confirm',
                cancelCaption: 'Cancel',
              })
              .subscribe((confirmed: any) => {
                if (confirmed) {
                  this.identityService.removeMobilePhone(this.userList.selectedItems[0].id).subscribe((res) => {
                    this.refreshUsers();
                  });
                }
              });

            this.refreshUsers();
        }


          public setSelectedDevice(value) {

            this.model.userId = this.userList.selectedItems[0].id;
            this.model.deviceId = value[0].id;

            this.identityService.UpdateUserDevice(this.model)
                .subscribe(
                (res: any) => {
                    // // IdentityResult.
                    // if (res.succeeded) {
                    //     // Signs in the user.
                    //     this.router.navigate(['/identity']);
                    // } else {
                    //     this.errorMessages = res.errors;
                    // }
                    this.refreshUsers();
                },
                (error: any) => {
                    // Error on post request.
                    let errMsg = (error.message) ? error.message :
                        error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                    this.errorMessage = 'Server error. Try later.';
                });
            // this.deviceListModal.hide();
        }


        public setSelectedMobilePhone(value) {

          let data = new MobilePhoneSave();
          data.mobilePhoneId = value[0].id;
          data.email = this.userList.selectedItems[0].email;

          // this.model.userId = this.userList.selectedItems[0].email;
          // this.model.mobilePhoneId = value[0].id;

          this.identityService.UpdateMobilePhone(data)
              .subscribe(
              (res: UserMobilePhoneResult) => {
                  // // IdentityResult.
                  // if (res.succeeded) {
                  //     // Signs in the user.
                  //     this.router.navigate(['/identity']);
                  // } else {
                  //     this.errorMessages = res.errors;
                  // }
                  if(res.success){
                    this.notificationService.showInfo(res.message, 'Mapare numar telefon', 2000, false, 0);
                    this.refreshUsers();
                  }else {
                    this.notificationService.showError(res.message, 'Mapare numar telefon', 2000, false, 2000);
                  }

              },
              (error: any) => {
                  // Error on post request.
                  let errMsg = (error.message) ? error.message :
                      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
                  this.errorMessage = 'Server error. Try later.';
              });
          // this.deviceListModal.hide();
      }



    public changeSubstituteFromDate(event) {
        this.fromDate = event.target.value;
        }

    public changeSubstituteToDate(event) {
        this.toDate = event.target.value;
        }

    public parseDate(dateString: any): Date {
        if (dateString) {
            return new Date(dateString.value);
        } else {
            return null;
        }
    }

    public export() {
      this.showExportBtn = false;
      let params: Array<Param> = new Array<Param>();
      params.push(new Param('filter', this.filter));
      params.push(new Param('role', this.role));
      this.identityHttpService
          .export(params)
          .subscribe((blob) => {
      fileSaveAs(blob.body, 'Export.xlsx');
      this.showExportBtn = true;
    });
  }

collapsed(event: any): void {
    // console.log(event);
  }

  expanded(event: any): void {
    // console.log(event);
  }

  public onPageUpdate(number: number) {
    this.pageSize = number;
    this.refreshUsers();
}


public onPageTempUpdate(number: number) {
    this.pageSizeTemp = number;
    let params: Array<Param> = new Array<Param>();
    params.push(new Param('pageSize', this.pageSizeTemp.toString()));
    this.assetTempList.refresh(params);
}

  onFilterChanged($event: string) {
    this.filter = $event;
    this.refreshUsers();
  }
}
