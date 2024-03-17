import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccMonthManageComponent } from '../../forms/accounting/acc-month.manage';
import { AccountManage } from '../../forms/administrations/account/account.manage';
import { AdmCenterManageComponent } from '../../forms/administrations/adm-centers/adm-center.manage';
import { AdministrationManageComponent } from '../../forms/administrations/administrations/administration.manage';
import { ArticleManage } from '../../forms/administrations/article/article.manage';
import { BudgetManagerManage } from '../../forms/administrations/budget-manager/budget-manager.manage';
import { CityManageComponent } from '../../forms/administrations/cities/city.manage';
import { CostCenterManageComponent } from '../../forms/administrations/cost-centers/cost-center.manage';
import { CountyManageComponent } from '../../forms/administrations/counties/county.manage';
import { CountryManageComponent } from '../../forms/administrations/countries/country.manage';
import { DepartmentManageComponent } from '../../forms/administrations/departments/department.manage';
import { DictionaryItemManageComponent } from '../../forms/administrations/dictionary-item/dictionary-item.manage';
import { DictionaryTypeManageComponent } from '../../forms/administrations/dictionary-type/dictionary-type.manage';
import { DivisionManageComponent } from '../../forms/administrations/divisions/division.manage';
import { EmployeeCostCenterManage } from '../../forms/administrations/employee-cost-centers/employee-cost-center.manage';
import { EmployeeDetailUIComponent } from '../../forms/administrations/employees/employee.detail.ui';
import { EmployeeManageComponent } from '../../forms/administrations/employees/employee.manage';
import { ExpAccountManage } from '../../forms/administrations/exp-account/exp-account.manage';
import { LocationManageComponent } from '../../forms/administrations/locations/location.manage';
import { MaterialManage } from '../../forms/administrations/materials/material.manage';
import { RegionManageComponent } from '../../forms/administrations/regions/region.manage';
import { RoomManageComponent } from '../../forms/administrations/rooms/room.manage';
import { SubTypeManage } from '../../forms/administrations/sub-types/sub-type.manage';
import { TypeManage } from '../../forms/administrations/types/type.manage';
import { AssetCategoryManageComponent } from '../../forms/assets/asset-categories/asset-category.manage';
import { AssetClassManageComponent } from '../../forms/assets/asset-classes/asset-class.manage';
import { AssetNatureManageComponent } from '../../forms/assets/asset-natures/asset-nature.manage';
import { AssetStateManageComponent } from '../../forms/assets/asset-states/asset-state.manage';
import { AssetTypeManageComponent } from '../../forms/assets/asset-types/asset-type.manage';
import { BrandManage } from '../../forms/assets/brands/brand.manage';
import { CompanyManageComponent } from '../../forms/assets/companies/company.manage';
import { DimensionManageComponent } from '../../forms/assets/dimensions/dimension.manage';
import { InsuranceCategoryManage } from '../../forms/assets/insurance-categories/insurance-category.manage';
import { InterCompanyManage } from '../../forms/assets/inter-companies/inter-company.manage';
import { MasterTypeManageComponent } from '../../forms/assets/master-types/master-type.manage';
import { ProjectManage } from '../../forms/assets/projects/project.manage';
import { UomManageComponent } from '../../forms/assets/uoms/uom.manage';
import { PartnerManageComponent } from '../../forms/documents/partners/partner.manage';
import { InvStateManage } from '../../forms/inventory/inv-state/inv-state.manage';
import { InventoryManage } from '../../forms/inventory/inventory.manage';
import { AuthGuard } from '../../services/auth.guard';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Nomenclatoare'
    },
    children: [
      {
        path: '',
        redirectTo: 'nomenclatures'
      },
      {
        path: 'accmonths',
        canActivate: [AuthGuard],
        component: AccMonthManageComponent,
        data: {
          title: 'Inventare',
          auth: "VIEW|ACCMONTHS", shouldDetach: true
        }
      },
      {
        path: 'inventories',
        canActivate: [AuthGuard],
        component: InventoryManage,
        data: {
          title: 'Inventare',
          auth: "VIEW|INVENTORIES", shouldDetach: true
        }
      },
      {
        path: 'companies',
        canActivate: [AuthGuard],
        component: CompanyManageComponent,
        data: {
          title: 'Categorii',
          auth: "VIEW|COMPANIES", shouldDetach: true
        }
      },
      {
        path: 'assetnatures',
        canActivate: [AuthGuard],
        component: AssetNatureManageComponent,
        data: {
          title: 'Culori',
          auth: "VIEW|ASSETNATURES", shouldDetach: true
        }
      },
      {
        path: 'invstates',
        canActivate: [AuthGuard],
        component: InvStateManage,
        data: {
          title: 'Stari',
          auth: "VIEW|INVSTATES", shouldDetach: true
        }
      },
      {
        path: 'assetstates',
        canActivate: [AuthGuard],
        component: AssetStateManageComponent,
        data: {
          title: 'Tipuri operatii',
          auth: "VIEW|ASSETSTATES", shouldDetach: true
        }
      },
      {
        path: 'counties',
        canActivate: [AuthGuard],
        component: CountyManageComponent,
        data: {
          title: 'Judete',
          auth: "VIEW|COUNTIES", shouldDetach: true
        }
      },
      {
        path: 'cities',
        canActivate: [AuthGuard],
        component: CityManageComponent,
        data: {
          title: 'Orase',
          auth: "VIEW|CITIES", shouldDetach: true
        }
      },
      {
        path: 'cities',
        canActivate: [AuthGuard],
        component: CityManageComponent,
        data: {
          title: 'Orase',
          auth: "VIEW|CITIES", shouldDetach: true
        }
      },
      {
        path: 'locations',
        canActivate: [AuthGuard],
        component: LocationManageComponent,
        data: {
          title: 'Adrese',
          auth: "VIEW|LOCATIONS", shouldDetach: true
        }
      },
      {
        path: 'rooms',
        canActivate: [AuthGuard],
        component: RoomManageComponent,
        data: {
          title: 'Adrese 2',
          auth: "VIEW|ROOMS", shouldDetach: true
        }
      },
      {
        path: 'accounts',
        canActivate: [AuthGuard],
        component: AccountManage,
        data: {
          title: 'Bal.sh.acct APC',
          auth: "VIEW|ACCOUNTS", shouldDetach: true
        }
      },
      {
        path: 'expaccounts',
        canActivate: [AuthGuard],
        component: ExpAccountManage,
        data: {
          title: 'Asset class',
          auth: "VIEW|EXPACCOUNTS", shouldDetach: true
        }
      },  
      {
        path: 'assetcategories',
        canActivate: [AuthGuard],
        component: AssetCategoryManageComponent,
        data: {
          title: 'Asset classification',
          auth: "VIEW|ASSETCATEGORIES", shouldDetach: true
        }
      },
      {
        path: 'partners',
        canActivate: [AuthGuard],
        component: PartnerManageComponent,
        data: {
          title: 'Suppliers',
          auth: "VIEW|PARTNERS", shouldDetach: true
        }
      },
      {
        path: 'articles',
        canActivate: [AuthGuard],
        component: ArticleManage,
        data: {
          title: 'Zone',
          auth: "VIEW|ARTICLES", shouldDetach: true
        }
      },
      {
        path: 'costcenters',
        canActivate: [AuthGuard],
        component: CostCenterManageComponent,
        data: {
          title: 'Centre de cost',
          auth: "VIEW|COSTCENTERS", shouldDetach: true
        }
      },
      {
        path: 'admcenters',
        canActivate: [AuthGuard],
        component: AdmCenterManageComponent,
        data: {
          title: 'Profit centers',
          auth: "VIEW|ADMCENTERS", shouldDetach: true
        }
      },
      {
        path: 'regions',
        canActivate: [AuthGuard],
        component: RegionManageComponent,
        data: {
          title: 'PC detaliu',
          auth: "VIEW|REGIONS", shouldDetach: true
        }
      },
      {
        path: 'departments',
        canActivate: [AuthGuard],
        component: DepartmentManageComponent,
        data: {
          title: 'Departamente',
          auth: "VIEW|DEPARTMENTS", shouldDetach: true
        }
      },
      {
        path: 'divisions',
        canActivate: [AuthGuard],
        component: DivisionManageComponent,
        data: {
          title: 'Divizii',
          auth: "VIEW|DIVISIONS", shouldDetach: true
        }
      },
      {
        path: 'administrations',
        canActivate: [AuthGuard],
        component: AdministrationManageComponent,
        data: {
          title: 'Locatii',
          auth: "VIEW|ADMINISTRATIONS", shouldDetach: true
        }
      },
      {
        path: 'countries',
        canActivate: [AuthGuard],
        component: CountryManageComponent,
        data: {
          title: 'Tari',
          auth: "VIEW|COUNTRIES", shouldDetach: true
        }
      },
      {
        path: 'budgetmanagers',
        canActivate: [AuthGuard],
        component: BudgetManagerManage,
        data: {
          title: 'FY Start',
          auth: "VIEW|BUDGETMANAGERS", shouldDetach: true
        }
      },
      {
        path: 'assetnatures',
        canActivate: [AuthGuard],
        component: AssetNatureManageComponent,
        data: {
          title: 'Cont CM',
          auth: "VIEW|ASSETNATURES", shouldDetach: true
        }
      },
      // {
      //   path: 'mastertypes',
      //   canActivate: [AuthGuard],
      //   component: MasterTypeManageComponent,
      //   data: {
      //     title: 'PC',
      //     auth: "VIEW|MASTERTYPES", shouldDetach: true
      //   }
      // },
      {
        path: 'types',
        canActivate: [AuthGuard],
        component: TypeManage,
        data: {
          title: 'Supracategorii',
          auth: "VIEW|TYPES", shouldDetach: true
        }
      },
      {
        path: 'employees',
        canActivate: [AuthGuard],
        component: EmployeeManageComponent,
        data: {
          title: 'Angajati',
          auth: "VIEW|EMPLOYEES", shouldDetach: true
        }
      },
      {
        path: 'employeecostcenters',
        canActivate: [AuthGuard],
        component: EmployeeCostCenterManage,
        data: {
          title: 'Angajati/ CC',
          auth: "VIEW|EMPLOYEECOSTCENTERS", shouldDetach: true
        }
      },
      {
        path: 'employee/:id',
        component: EmployeeDetailUIComponent,
        canActivate: [AuthGuard],
        data: { 
          title: '',
          auth: "VIEW|EMPLOYEES", shouldDetach: true 
        },
      },
      {
        path: 'materials',
        canActivate: [AuthGuard],
        component: MaterialManage,
        data: {
          title: 'Materiale',
          auth: "VIEW|MATERIALS", shouldDetach: true
        }
      },
      {
        path: 'subtypes',
        canActivate: [AuthGuard],
        component: SubTypeManage,
        data: {
          title: 'Tipuri active',
          auth: "VIEW|SUBTYPES", shouldDetach: true
        }
      },
      {
        path: 'assetclasses',
        canActivate: [AuthGuard],
        component: AssetClassManageComponent,
        data: {
          title: 'Clasificari',
          auth: "VIEW|ASSETCLASSES", shouldDetach: true
        }
      },
      {
        path: 'dictionarytypes',
        canActivate: [AuthGuard],
        component: DictionaryTypeManageComponent,
        data: {
          title: 'Tip dictionar',
          auth: "VIEW|DICTIONARYTYPES", shouldDetach: true
        }
      },
      {
        path: 'dictionaryitems',
        canActivate: [AuthGuard],
        component: DictionaryItemManageComponent,
        data: {
          title: 'Dictionar',
          auth: "VIEW|DICTIONARYITEMS", shouldDetach: true
        }
      },
      {
        path: 'intercompanies',
        canActivate: [AuthGuard],
        component: InterCompanyManage,
        data: {
          title: 'Supracategorii TRN',
          auth: "VIEW|INTERCOMPANIES", shouldDetach: true
        }
      },
      {
        path: 'uoms',
        canActivate: [AuthGuard],
        component: UomManageComponent,
        data: {
          title: 'Simboluri',
          auth: "VIEW|UOMS", shouldDetach: true
        }
      },
      {
        path: 'dimensions',
        canActivate: [AuthGuard],
        component: DimensionManageComponent,
        data: {
          title: 'Dimensiuni',
          auth: "VIEW|DIMENSIONS", shouldDetach: true
        }
      },
      {
        path: 'insurancecategories',
        canActivate: [AuthGuard],
        component: InsuranceCategoryManage,
        data: {
          title: 'BS',
          auth: "VIEW|INSURANCECATEGORIES", shouldDetach: true
        }
      },
      {
        path: 'assettypes',
        canActivate: [AuthGuard],
        component: AssetTypeManageComponent,
        data: {
          title: 'Tipuri',
          auth: "VIEW|ASSETTYPES", shouldDetach: true
        }
      },
      {
        path: 'projects',
        canActivate: [AuthGuard],
        component: ProjectManage,
        data: {
          title: 'WBS',
          auth: "VIEW|PROJECTS", shouldDetach: true
        }
      },
      {
        path: 'brands',
        canActivate: [AuthGuard],
        component: BrandManage,
        data: {
          title: 'OS',
          auth: "VIEW|BRANDS", shouldDetach: true
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NomenclaturesRoutingModule {}

