import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent implements OnInit {
  // public sidebarMinimized = false;
  // public navItems = navItems;
  // public customNavItems = customItems;
  // public tokenExpired = '';
  // public token = '';
  // public roleName = '';
  // userName = '';

  // public imageCount: number = 0;
  // public imageIndex: number = 0;
  // public imageLoading: boolean = false;
  // public assetImages: Array<AssetImage> = new Array<AssetImage>();
  // public assetFiles: Array<EntityFile> = new Array<EntityFile>();
  // public existingAssetImages: Array<AssetImage> = new Array<AssetImage>();

  constructor(
    // public authenticationService: AuthenticationService,
    // private tableDefinitionHttpService: TableDefinitionHttpService,
    // private columnDefinitionHttpService: ColumnDefinitionHttpService,
    // private configValuesHttpService: ConfigValuesHttpService,
    // // private sidebarService: AppSidebarService,
    // private authorizationService: AuthorizationService,
    // private routeService: RouteHttpService,
    // private jwtService: JwtHelperService,
    // public router: Router
    ) {
      // this.token = localStorage.getItem('id_token');
      // const decodedToken = this.jwtService.decodeToken(this.token);

      // if(decodedToken.role !== 'aaa') {
      //   this.routeService.getData(decodedToken.role).subscribe((routes: CustomINavData[]) => {
           
      //     this.customNavItems = [];
      //     routes.forEach(u => u.children.length === 0 ? delete u.children : u);
      //     this.customNavItems = routes;
      //   });        

      // // this.customNavItems = this.getSubArray(this.customNavItems, 'administrator');
      // // sidebarService.updateMenuByRoutes(AppRoutes);
      // }
     

      
  }
  ngOnInit(): void {
      // this.token = localStorage.getItem('id_token');
      // this.getTokenExpirationDate(this.token);
      // this.timeout();
      // this.loadData();
  }


//   timeout() {
//     setTimeout(() => {
//          this.getTokenExpirationDate(this.token);
//          this.timeout();
//     }, 6000 * 10);
// }

  


//   private getSubArray(toDivied: CustomINavData[], propertyValue: string){
//     let list: CustomINavData[] = toDivied.filter((row:CustomINavData) => 
//       row.role === propertyValue
//     );
//     return list;
//   }

//   toggleMinimize(e) {
//     this.sidebarMinimized = e;
//   }

//   signout(): void {
//     this.authenticationService.signout();
//     this.router.navigate(['']);
//   }

//   refresh(): void{
//     this.loadTableConfigurationData();
//   }

//   private loadTableConfigurationData() {
//     const decodedToken = this.jwtService.decodeToken(this.token);
//     this.authenticationService.userInfo();

//     let index = decodedToken.role[1];

//     if (index.length > 1) {
//       decodedToken.role = decodedToken.role.slice(0 , -1);
//     }

//       this.routeService.getData(decodedToken.role).subscribe((routes: CustomINavData[]) => {
           
//         this.customNavItems = [];
//         routes.forEach(u => u.children.length === 0 ? delete u.children : u);
//         this.customNavItems = routes;
  
//         //   this.tableDefinitionHttpService.get(1, 1000000, 'id', 'asc', null)
//         // .subscribe((tableDefinitions: PagedResult<TableDefinition>) => {
  
//         //   let params: Array<Param> = new Array<Param>();
//         //   params.push(new Param('roleName', decodedToken.role));
//         //   this.columnDefinitionHttpService.get(1, 1000000, 'tableDefinitionId', 'asc', params)
//         //     .subscribe((columnDefinitions: PagedResult<ColumnDefinition>) => {
//         //       AppData.UpdateColumnDefinitions(tableDefinitions.items, columnDefinitions.items);
  
//         //       this.configValuesHttpService.get(1, 1000000, 'id', 'asc', params)
//         //         .subscribe((configValues: PagedResult<ConfigValue>) => {
//         //           AppData.UpdateConfigValues(configValues.items);
  
//         //         });
//         //     });        
//         // });
//       });  
//   }

//   private loadData() {
//     const decodedToken = this.jwtService.decodeToken(this.token);

//     let index = decodedToken.role[1];

//     if (index.length > 1) {
//       decodedToken.role = decodedToken.role.slice(0 , -1);
//     }

//       this.routeService.getData(decodedToken.role).subscribe((routes: CustomINavData[]) => {
           
//         this.customNavItems = [];
//         routes.forEach(u => u.children.length === 0 ? delete u.children : u);
//         this.customNavItems = routes;
//       });  
//   }


//   public getTokenExpirationDate(token: string): Date {
//     const decodedToken = this.jwtService.decodeToken(token);
//     if (decodedToken.exp === undefined) { return null; }
//     this.userName = decodedToken.name;
//     const date = new Date(0);
//     date.setUTCSeconds(decodedToken.exp);
//     this.calculateRemainingTime(new Date(), date);
//     // return date;
//   }


// public calculateRemainingTime(startDate, endDat) {

//   let diffMs = (endDat - startDate); // milliseconds
//   let diffDays = Math.floor(diffMs / 86400000); // days
//   let diffHrs = Math.floor((diffMs % 86400000) / 3600000); // hours
//   let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
//   // console.log(diffDays + " days, " + diffHrs + " hours, " + diffMins + "minutes");
//   // this.tokenExpired = diffDays + " days, " + diffHrs + " hours, " + diffMins + "minutes";
//   this.tokenExpired = diffHrs + " hours, " + diffMins + " minutes";
  
//   if (diffDays == 0 && diffHrs === 0 && diffMins === 0) {
//     console.log('A expirat sesiunea!');
//     this.signout();
//   }
// }


}
