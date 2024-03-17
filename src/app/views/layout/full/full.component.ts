import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Data, NavigationEnd, Router} from '@angular/router';
import {Title} from '@angular/platform-browser';
// import {filter, map, mergeMap} from 'rxjs';
import { map, filter, mergeMap } from 'rxjs/operators';
// import {AuthService} from '../../../../authentication/services/auth.service';
import {RouteInfo} from '../sidebar.metadata';
import {CustomINavData} from '../../../model/common/custom-nav';
import {AuthenticationService} from '../../../services/authentication.service';
import {RouteHttpService} from '../../../services/http/common/route.http.service';
import {JwtHelperService} from '@auth0/angular-jwt';
import {AppData} from '../../../app-data';
import {Location} from '@angular/common';
import {TranslocoService} from '@ngneat/transloco';
import {AppConfig} from '../../../config';
// import {ROUTES} from "../menu-items";
// import {TranslocoService} from "@ngneat/transloco";
import { MobilePhone } from '../../../model/api/common/mobile-phone';
import { DialogService } from '../../../services/dialog.service';
import { IdentityService } from '../../../services/http/identity/identity.service';
import { NotificationService } from '../../../services/notification.service';
import { MobilePhoneSave } from '../../../model/api/identity/mobile-phone-save';
import { MatDialog } from '@angular/material/dialog';
import { MobilePhoneHttpService } from '../../../services/http/common/mobile-phone.http.service';
import { UserMobilePhoneResult } from '../../../model/api/result/user-mobile-phone-result';

@Component({
  selector: 'app-full',
  templateUrl: './full.component.html',
  styleUrls: ['./full.component.scss']
})
export class FullComponent implements OnInit {

  roleCheck = '';
  mobilePhone = null;

  isWfhClosed : boolean = true;

  // public _mobilePhones: MobilePhone[] = [];
  // public get mobilePhones(): MobilePhone[] { return this._mobilePhones; }
  // public set mobilePhones(value: MobilePhone[]) {
  //   this._mobilePhones = value;
  //   this.mobilePhone = value;
  //   this.changeMobilePhone();
  // }

  public _mobilePhones: MobilePhone = null;
  public get mobilePhones(): MobilePhone { return this._mobilePhones; }
  public set mobilePhones(value: MobilePhone) {
    this._mobilePhones = value;
    this.mobilePhone = value;
    this.changeMobilePhone();
  }


  constructor(
    public router: Router,
    public dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    public authenticationService: AuthenticationService,
    private routeService: RouteHttpService,
    private jwtService: JwtHelperService,
    private readonly location: Location,
    private dialogService: DialogService,
    public identityService: IdentityService,
    public notificationService: NotificationService,
    public mobilePhoneHttpService: MobilePhoneHttpService,
    // private authService: AuthService,
    private transloco: TranslocoService
  ) {
    // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);

    this.language = this.languages.find(lang => lang.value === this.transloco.getActiveLang());

    const path = this.location.path();
    // console.log(path);
    if (path.startsWith('/ordervalidate')) {
      // console.log('DA');
    } else {
      this.authenticationService.isSignedIn()
        .subscribe((data) => {
          // alert(data);
          AppData.UserIsSignedIn = data;
          if (AppData.UserIsSignedIn) {
            this.token = localStorage.getItem('id_token');
            // this.getTokenExpirationDate(this.token);
            // this.timeout();
            this.loadData();
          } else {
            // console.log(this.location.path());
            // alert('redirect');
            this.router.navigate(['/login']);
          }
        });
    }

    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .pipe(map(() => this.activatedRoute))
      .pipe(
        map(route => {
          while (route.firstChild) {
            route = route.firstChild;
          }
          return route;
        })
      )
      .pipe(filter(route => route.outlet === 'primary'))
      .pipe(mergeMap(route => route.data))
      .subscribe(event => {
        this.titleService.setTitle(event['title']);
        this.pageInfo = event;
      });

    // this.authService.profileUser().subscribe((data: any) => {
    //   this.userProfile = data;
    //   localStorage.setItem('authenticatedUser', JSON.stringify(data));
    // });
  }

  public pageInfo: Data = Object.create(null);
  public sidebarnavItems: RouteInfo[] = [];
  public userProfile?: any | undefined;
  public isCollapsed = false;

  decodedToken: any;
  public customNavItems = null;
  public token = '';
  userName = '';
  userEmail = '';
  tokenExpired = '';
  mobilePhoneId = null;
  public language: any;

  readonly languages = [
    { value: 'en', label: 'English', img: 'assets/flags/en.svg' },
    { value: 'ro', label: 'Romana', img: 'assets/flags/ro.svg'},
  ];

  public innerWidth = -1;
  public defaultSidebar = '';
  public isExpanded = true;

  options = {
    sidebartype: 'full'
  };

  selectLanguage(value: string) {
    const language = this.languages.find( lang => lang.value === value);
    this.language = language;
    this.transloco.setActiveLang(value);
    localStorage.setItem('locale', value);
  }

  ngOnInit() {
  }

  private async loadData(){
    this.roleCheck = '';
    this.decodedToken = this.jwtService.decodeToken(this.token);
    this.userName = this.decodedToken.name;
    this.userEmail = this.decodedToken.email;
    this.mobilePhoneId = this.decodedToken.mobilePhoneId;

    if(this.decodedToken.mobilePhoneId != null && this.decodedToken.mobilePhoneId != ''){
      this.mobilePhoneHttpService.getById(this.decodedToken.mobilePhoneId).subscribe(async (res: MobilePhone) => {
        // console.log(res);
        this._mobilePhones = res;
        // let data = new Array<MobilePhone>();
        // let item = new MobilePhone();
        // if(res != null){
        //   item.id = res.id;
        //   item.code = res.code;
        //   item.name = res.name;
        //   data.push(item)
        //   this.mobilePhones = data;

        //   console.log(this.mobilePhones);
        // }
      });
    }
    // this.userName = 'ionescu.claudiu';
    this.getTokenExpirationDate();
    // alert(this.userName);
    const index = this.decodedToken.role[1];

    if (index.length > 1) {
      this.decodedToken.role = this.decodedToken.role.slice(0 , -1);
      this.roleCheck = this.decodedToken.role;
    }

    this.routeService.getData(this.decodedToken.role).subscribe((routes: CustomINavData[]) => {
      this.customNavItems = [];

      routes.forEach(u => u.children.length === 0 ? delete u.children : u);
      this.customNavItems = routes;
    });
  }

  // @ts-ignore
  public getTokenExpirationDate(): Date {
    if (this.decodedToken != null) {
      if (this.decodedToken.exp === undefined) { return null; }
      this.userName = this.decodedToken.name;
      const date = new Date(0);
      date.setUTCSeconds(this.decodedToken.exp);
      this.calculateRemainingTime(new Date(), date);
      // return date;
    } else {
      this.signout();
    }
  }

  public calculateRemainingTime(startDate, endDat) {

    const diffMs = (endDat - startDate); // milliseconds
    const diffDays = Math.floor(diffMs / 86400000); // days
    const diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
    const diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
    // this.tokenExpired = diffHrs + ' hours, ' + diffMins + ' minutes';
    this.tokenExpired = diffHrs + ' hours : ' + diffMins + ' minutes';

    if (diffDays === 0 && diffHrs === 0 && diffMins === 0) {
      // console.log('A expirat sesiunea!');
      this.signout();
    }
  }

  signout(): void {
    this.routeService.getData('logout').subscribe((routes: CustomINavData[]) => {
      this.customNavItems = [];
      routes.forEach(u => u.children.length === 0 ? delete u.children : u);
      this.userName = '';
      this.decodedToken = null;
      this.customNavItems = routes;
      this.authenticationService.signout();
      this.router.navigate(['']);
    });
  }

  logout() {
    // this.authService.signOut();
  }

  public getWFHBook(): void {
    const url = `${AppConfig.urlPrefix}documents/manual/wfhbook`;
    window.open(url);
  }

  public getBook(): void {
    const url = `${AppConfig.urlPrefix}documents/manual/book`;
    window.open(url);
  }

  // @ts-ignore
  // loadLocale(lang: string): Promise<string> {
  //   if(lang === 'en') return Promise.resolve('en');
  // }

  // selectLanguage(value: string) {
  //   // @ts-ignore
  //   let language = this.languages.find( lang => lang.value === value);
  //   this.language = language;
  //   this.transloco.setActiveLang(value);
  //   localStorage.setItem('locale', value);
  // }

  public changeMobilePhone() {

      //console.log(this.mobilePhones[0].id);
      // console.log(this.mobilePhone.id);
      let data: MobilePhoneSave  = new MobilePhoneSave();
      data.email = this.userEmail;
      data.mobilePhoneId = this.mobilePhone != null ? this.mobilePhone.id : null;

      this.identityService.updateMobilePhone(data)
        .subscribe((result: UserMobilePhoneResult) => {
          if(result.success){
            this.notificationService.showInfo(result.message, 'Modificare numar telefon utilizator', 5000, false, 0);
            this.signout();
          }else {
            this.notificationService.showError(result.message, 'Modificare numar telefon utilizator', 0, false, 0);
          }
        });
    // this.dialogService
    //     .confirmDialog({
    //       title: 'Confirm Action',
    //       message: 'Modificati utilizatorul selectat?',
    //       confirmCaption: 'Confirm',
    //       cancelCaption: 'Cancel',
    //     })
    //     .subscribe((confirmed: any) => {
    //       if (confirmed) {
    //         //console.log(this.mobilePhones[0].id);
    //         // console.log(this.mobilePhone.id);
    //         let data: MobilePhoneSave  = new MobilePhoneSave();
    //         data.email = this.userEmail;
    //         data.mobilePhoneId = this.mobilePhone != null ? this.mobilePhone.id : null;

    //         this.identityService.updateMobilePhone(data)
    //           .subscribe(() => {
    //             this.notificationService.showInfo('Actualizarea numarului de telefon s a finalizat cu success!', 'Modificare telefon utilizator', 5000, false, 0);
    //           });
    //       } else {
    //         this.notificationService.showSuccess('Eroare actualizare date!', 'Modificare telefon utilizator', 0, false, 0);
    //       }
    //     });
  }

  // public onSelectPhoneNumber() {
  //   let dialogRef = this.dialog.open(MobilePhoneSelectionDialog, { panelClass: 'centered-middle-modal', width: '80%', maxWidth: '90%', maxHeight: '80%', height: 'auto', position: {top: '10em'}});

  //   dialogRef.afterClosed().subscribe((item: any) => {
  //     // console.log(item);
  //   });
  // }
}
