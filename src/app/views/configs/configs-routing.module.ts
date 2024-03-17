import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ColumnDefinitionManageComponent } from '../../forms/common/column-definition/column-definition.manage';
import { ConfigValuesManage } from '../../forms/common/config-values.manage';
import { PermissionRoleManage } from '../../forms/common/permission-role/permission-role.manage';
import { PermissionTypeManage } from '../../forms/common/permission-type/permission-type.manage';
import { PermissionManage } from '../../forms/common/permission/permission.manage';
import { TableDefinitionManageComponent } from '../../forms/common/table-definition/table-definition.manage';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Notifications'
    },
    children: [
      {
        path: '',
        redirectTo: 'configs'
      },
      {
        path: 'global',
        component: ConfigValuesManage,
        data: {
          title: 'Global'
        }
      },
      {
        path: 'table',
        component: TableDefinitionManageComponent,
        data: {
          title: 'Table'
        }
      },
      {
        path: 'column',
        component: ColumnDefinitionManageComponent,
        data: {
          title: 'Coloane'
        }
      },
      {
        path: 'permissiontype',
        component: PermissionTypeManage,
        data: {
          title: 'Ecran'
        }
      },
      {
        path: 'permission',
        component: PermissionManage,
        data: {
          title: 'Permisiuni'
        }
      },
      {
        path: 'permissionrole',
        component: PermissionRoleManage,
        data: {
          title: 'Permisiuni/Roluri'
        }
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigsRoutingModule {}
