import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

import { IconSetService } from '@coreui/icons-angular';
import { freeSet } from '@coreui/icons';

import { AppData } from './app-data';
import { ColumnDefinitionHttpService } from './services/http/common/column-definition.http.service';
import { ConfigValuesHttpService } from './services/http/common/config-values.service';
import { TableDefinitionHttpService } from './services/http/common/table-definition.http.service';
import { AuthenticationService } from './services/authentication.service';
import { map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouteHttpService } from './services/http/common/route.http.service';
import { CustomINavData } from './model/common/custom-nav';
import { RateHttpService } from './services/http/administration/rate.http.service';
import { Rate } from './model/api/administration/rate';
import { SignalRService } from './services/signalR.service';
import { RouteRoleHttpService } from './services/http/common/route-role.http.service';
import { AppConfig } from './config';
import { Location } from '@angular/common';
import { RouteStateService } from './services/http/common/route-state.service';

@Component({
  // tslint:disable-next-line
  selector: 'app-root',
  templateUrl: './app.component.html',
  // template: '<router-outlet></router-outlet>',
  providers: [IconSetService],
})
export class AppComponent implements OnInit {

  public sidebarMinimized = false;
  // public navItems = navItems;
  public customNavItems = null;
  public tokenExpired = '';
  public token = '';
  decodedToken: any;
  public roleName = '';
  userName = '';
  currencyBNR: Rate = null;


  constructor(
   public router: Router,
    public iconSet: IconSetService,
    public tableDefinitionHttpService: TableDefinitionHttpService,
    public columnDefinitionHttpService: ColumnDefinitionHttpService,
    public configValuesHttpService: ConfigValuesHttpService,
    public authenticationService: AuthenticationService,
    private jwtService: JwtHelperService,
    private routeService: RouteHttpService,
    private routeRoleService: RouteRoleHttpService,
    private rateHttpService: RateHttpService,
    public signalRService: SignalRService,
    private route: ActivatedRoute,
    private readonly location: Location,
    private routeStateService: RouteStateService,
  ) {
    // iconSet singleton
    iconSet.icons = { ...freeSet };

    let path = this.location.path();
    // console.log(path);
    if(path.startsWith('/ordervalidate')) {
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

      // this.name = this.authenticationService.getUser()
      //     .map((user: any) => (typeof user.given_name !== 'undefined') ? user.given_name : null);
      this.authenticationService.getUser().pipe(
          map((user: any) => {
            // console.log(JSON.stringify(user));
            return user;
          }))
          .subscribe((data: any) => {
            AppData.UserId = data.sub;
            // AppData.UserId = '08f60c01-a0d6-409b-8ad5-e306c7159115';
          });

      // this.isAdmin = this.authenticationService.getRoles()
      //     .map((roles: string[]) => roles.indexOf('administrator') != -1);
      this.authenticationService.getRoles().pipe(
          map((roles: string) => {
            return roles;
          }))
          .subscribe((data: string) => {
            AppData.UserIsAdmin = data.indexOf('administrator') !== -1;
            AppData.UserRoles = data;
          });
    }
  }

  ngOnInit() {

    this.signalRService.startConnection();
    this.signalRService.newAssetCreateListener();
    this.signalRService.newAssetRetireListener();
    this.signalRService.newAssetStornoListener();
    this.signalRService.newAssetAcquisitionStornoListener();
    this.signalRService.newAssetTransferListener();
    this.signalRService.newAssetInvMinusListener();
    this.signalRService.newAssetInvPlusListener();
    this.signalRService.orderItemDeleteListener();
    this.signalRService.editAssetListener();
    this.signalRService.createAssetSAPListener();
    this.signalRService.changeAssetSAPListener();
    this.signalRService.acquisitionAssetSAPListener();
    this.signalRService.wfhValidateListener();

    let path = this.location.path();
    // console.log(path);
    localStorage.setItem("urlFromEmail", path);

    if(path.startsWith('/ordervalidate')) {
      this.router.navigate([path]);
    }else {
          // this.getCurrency('EUR');
    // this.getAllCurrency();
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', {skipLocationChange: true})
    .then(() => this.router.navigate([currentUrl]));
    // this.loadTableConfigurationData();
    // this.router.events.subscribe((evt) => {
    //   if (!(evt instanceof NavigationEnd)) {
    //     // console.log(evt);
    //     return;
    //   }
    //   window.scrollTo(0, 0);
    // });

    this.timeout();
    }
  }

//   reloadCurrentRoute() {
//     let currentUrl = this.router.url;
//     this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
//         this.router.navigate([currentUrl]);
//     });
// }

private loadTableConfigurationData() {
  this.authenticationService.userInfo();

  this.decodedToken = this.jwtService.decodeToken(this.token);

  //console.log(this.decodedToken);

  const index = this.decodedToken.role[1];

  if (index.length > 1) {
    this.decodedToken.role = this.decodedToken.role.slice(0 , -1);
  }

    //this.routeRoleService.getData(this.decodedToken.email).subscribe((routes: CustomINavData[]) => {
    this.routeService.getData(this.decodedToken.role).subscribe((routes: CustomINavData[]) => {
      // this.getAllCurrency();
      // this.getCurrency('EUR');

      this.customNavItems = [];
      routes.forEach(u => u.children.length === 0 ? delete u.children : u);
      this.customNavItems = routes;

      //   this.tableDefinitionHttpService.get(1, 1000000, 'id', 'asc', null)
      // .subscribe((tableDefinitions: PagedResult<TableDefinition>) => {

      //   let params: Array<Param> = new Array<Param>();
      //   params.push(new Param('roleName', decodedToken.role));
      //   this.columnDefinitionHttpService.get(1, 1000000, 'tableDefinitionId', 'asc', params)
      //     .subscribe((columnDefinitions: PagedResult<ColumnDefinition>) => {
      //       AppData.UpdateColumnDefinitions(tableDefinitions.items, columnDefinitions.items);

      //       this.configValuesHttpService.get(1, 1000000, 'id', 'asc', params)
      //         .subscribe((configValues: PagedResult<ConfigValue>) => {
      //           AppData.UpdateConfigValues(configValues.items);

      //         });
      //     });
      // });
    });
}

toggleMinimize(e) {
  this.sidebarMinimized = e;
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

refresh(): void {
  this.loadTableConfigurationData();
}

private loadData() {
  this.decodedToken = this.jwtService.decodeToken(this.token);
  this.userName = this.decodedToken.name;
  // this.userName = 'ionescu.claudiu';
  this.getTokenExpirationDate();
  // alert(this.userName);
  const index = this.decodedToken.role[1];

  if (index.length > 1) {
    this.decodedToken.role = this.decodedToken.role.slice(0 , -1);
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
// console.log(diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins + 'minutes');
// this.tokenExpired = diffDays + ' days, ' + diffHrs + ' hours, ' + diffMins + 'minutes';
this.tokenExpired = diffHrs + ' hours, ' + diffMins + ' minutes';

if (diffDays === 0 && diffHrs === 0 && diffMins === 0) {
  // console.log('A expirat sesiunea!');
  this.signout();
}
}

timeout() {
// alert(AppData.UserIsSignedIn);
if (AppData.UserIsSignedIn) {
  setTimeout(() => {
     this.getTokenExpirationDate();
     this.timeout();
}, 6000 * 5);
}
}

// getCurrency(currency: string) {
//   this.rateHttpService.getCurrency(currency).subscribe( (res: Rate) => {
//     this.currencyBNR = res;
//   });
// }


// getAllCurrency() {
//   this.contractHttpService.getAllCurrency().subscribe( (res) => {
//     this.currencyBNR = res;
//   });
// }

public getBook(): void {
  const url = `${AppConfig.urlPrefix}documents/manual/book`;
      window.open(url);
      }

      onMenuClick(event: any) {
        //console.log(event.target.value);
        // if child are available then open child

        // if (menu.RouterLink == undefined || menu.RouterLink == null || menu.RouterLink == "") {
        //     this.routeStateService.add("Error 404", "/error", null, false);
        //     return;
        // }
        // this.selectedItem = menu.Label;
        // this.sessionService.setItem("active-menu", menu.Label);
        //this.routeStateService.add(menu.Label, menu.RouterLink, null, true);
        // hide menu bar after menu click for mobile layout
        // setTimeout(() => {
        //     if (this.applicationStateService.getIsMobileResolution()) {
        //         this.visible = false;
        //     }
        // }, 100);
    }

    public getWFHBook(): void {
      const url = `${AppConfig.urlPrefix}documents/manual/wfhbook`;
          window.open(url);
          }
}
