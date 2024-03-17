import { INavData } from '@coreui/angular';
import { CustomINavData } from './model/common/custom-nav';

export const navItems: INavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   },
  //   children: [
  //     // {
  //     //   name: 'Bugete',
  //     //   url: '/dashboard/budget',
  //     //   icon: 'fa fa-stack-overflow',
  //     //   badge: {
  //     //     variant: 'info',
  //     //     text: 'NEW'
  //     //   },
  //     // },
  //     // {
  //     //   name: 'Oferte',
  //     //   url: '/dashboard/offer',
  //     //   icon: 'fa fa-stack-overflow',
  //     //   badge: {
  //     //     variant: 'info',
  //     //     text: 'NEW'
  //     //   },
  //     // },
  //     // {
  //     //   name: 'Comenzi',
  //     //   url: '/dashboard/order',
  //     //   icon: 'fa fa-stack-overflow',
  //     //   badge: {
  //     //     variant: 'info',
  //     //     text: 'NEW'
  //     //   },
  //     // },
  //     {
  //       name: 'Inventar',
  //       url: '/dashboard/inventory',
  //       icon: 'fa fa-stack-overflow',
  //       badge: {
  //         variant: 'info',
  //         text: 'NEW'
  //       },
  //     },
  //   ]
  // },

  // {
  //   name: 'Harti',
  //   url: '/map',
  //   icon: 'icon-map',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   variant: 'administrator'
  // },
  // {
  //   name: 'Bugete',
  //   url: '/budget',
  //   icon: 'cil-money',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  // {
  //   name: 'Oferte',
  //   url: '/offer',
  //   icon: 'fa fa-briefcase',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   class: 'danger',
  //   children: [
  //     {
  //       name: 'Status',
  //       url: '/offer/status',
  //       icon: 'fa fa-stack-overflow'
  //     },
  //     {
  //       name: 'Email',
  //       url: '/offer/email',
  //       icon: 'cil-envelope-closed'
  //     },
  //   ]
  // },
  // {
  //   name: 'Comenzi',
  //   url: '/order',
  //   icon: 'fa fa-first-order',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  {
    name: 'Fixed Assets',
    url: '/asset',
    icon: 'fa fa-cubes',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   name: 'Accesorii',
  //   url: '/assetcomponent',
  //   icon: 'fa fa-codiepie',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  {
    name: 'Employee',
    url: '/employee',
    icon: 'fa fa-users',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   name: 'WFH',
  //   url: '/wfh',
  //   icon: 'fa fa-universal-access',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   class: 'danger',
  //   children: [
  //     {
  //       name: 'Validate',
  //       url: '/wfh/validate',
  //       icon: 'fa fa-stack-overflow'
  //     },
  //     {
  //       name: 'Status',
  //       url: '/wfh/email',
  //       icon: 'cil-envelope-closed'
  //     },
  //   ]
  // },
  {
    name: 'Inventariere',
    url: '/inventories',
    icon: 'fa fa-barcode',
    badge: {
      variant: 'info',
      text: ''
    },
    class: 'danger',
    children: [
      {
        name: 'Situatii',
        url: '/inventory/status',
        icon: 'fa fa-stack-overflow'
      },
      {
        name: 'Rapoarte',
        url: '/inventory/report',
        icon: 'fa fa-bar-chart'
      },
      {
        name: 'Planificare Inventar',
        url: '/inventory/inventory-plans',
        icon: 'fa fa-bar-chart'
      },
    ]
  },
  {
    title: true,
    name: 'Theme'
  },
  {
    name: 'Colors',
    url: '/theme/colors',
    icon: 'icon-drop'
  },
  {
    name: 'Typography',
    url: '/theme/typography',
    icon: 'icon-pencil'
  },
  {
    title: true,
    name: 'Components'
  },
  {
    name: 'Base',
    url: '/base',
    icon: 'icon-puzzle',
    children: [
      {
        name: 'Cards',
        url: '/base/cards',
        icon: 'icon-puzzle'
      },
      {
        name: 'Carousels',
        url: '/base/carousels',
        icon: 'icon-puzzle'
      },
      {
        name: 'Collapses',
        url: '/base/collapses',
        icon: 'icon-puzzle'
      },
      {
        name: 'Forms',
        url: '/base/forms',
        icon: 'icon-puzzle'
      },
      {
        name: 'Navbars',
        url: '/base/navbars',
        icon: 'icon-puzzle'

      },
      {
        name: 'Pagination',
        url: '/base/paginations',
        icon: 'icon-puzzle'
      },
      {
        name: 'Popovers',
        url: '/base/popovers',
        icon: 'icon-puzzle'
      },
      {
        name: 'Progress',
        url: '/base/progress',
        icon: 'icon-puzzle'
      },
      {
        name: 'Switches',
        url: '/base/switches',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tables',
        url: '/base/tables',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tabs',
        url: '/base/tabs',
        icon: 'icon-puzzle'
      },
      {
        name: 'Tooltips',
        url: '/base/tooltips',
        icon: 'icon-puzzle'
      }
    ]
  },




  {
    name: 'Buttons',
    url: '/buttons',
    icon: 'icon-cursor',
    children: [
      {
        name: 'Buttons',
        url: '/buttons/buttons',
        icon: 'icon-cursor'
      },
      {
        name: 'Dropdowns',
        url: '/buttons/dropdowns',
        icon: 'icon-cursor'
      },
      {
        name: 'Brand Buttons',
        url: '/buttons/brand-buttons',
        icon: 'icon-cursor'
      }
    ]
  },
  {
    name: 'Charts',
    url: '/charts',
    icon: 'icon-pie-chart'
  },
  {
    name: 'Icons',
    url: '/icons',
    icon: 'icon-star',
    children: [
      {
        name: 'CoreUI Icons',
        url: '/icons/coreui-icons',
        icon: 'icon-star',
        badge: {
          variant: 'success',
          text: 'NEW'
        }
      },
      {
        name: 'Flags',
        url: '/icons/flags',
        icon: 'icon-star'
      },
      {
        name: 'Font Awesome',
        url: '/icons/font-awesome',
        icon: 'icon-star',
        badge: {
          variant: 'secondary',
          text: '4.7'
        }
      },
      {
        name: 'Simple Line Icons',
        url: '/icons/simple-line-icons',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Notifications',
    url: '/notifications',
    icon: 'icon-bell',
    children: [
      {
        name: 'Alerts',
        url: '/notifications/alerts',
        icon: 'icon-bell'
      },
      {
        name: 'Badges',
        url: '/notifications/badges',
        icon: 'icon-bell'
      },
      {
        name: 'Modals',
        url: '/notifications/modals',
        icon: 'icon-bell'
      }
    ]
  },
  {
    name: 'Nomenclatoare',
    url: '/nomenclatures',
    icon: 'icon-bell',
    children: [
      {
        name: 'Luna contabila',
        url: '/nomenclatures/accmonths',
        icon: 'icon-bell'
      },
      {
        name: 'Inventare',
        url: '/nomenclatures/inventories',
        icon: 'icon-bell'
      },
      {
        name: 'Stari',
        url: '/nomenclatures/invstates',
        icon: 'icon-bell',
      },
      {
        name: 'Operatii',
        url: '/nomenclatures/assetstates',
        icon: 'icon-bell',
      },
      {
        name: 'Companii',
        url: '/nomenclatures/companies',
        icon: 'icon-bell'
      },
      {
        name: 'Judete',
        url: '/nomenclatures/counties',
        icon: 'icon-bell'
      },
      {
        name: 'Orase',
        url: '/nomenclatures/cities',
        icon: 'icon-bell'
      },
      {
        name: 'PC',
        url: '/nomenclatures/mastertypes',
        icon: 'fa fa-globe',
      },
    ]
  },
  {
    name: 'Setari email',
    url: '/email',
    icon: 'cil-money',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Transferuri',
    url: '/operation',
    icon: 'cil-money',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  
  {
    name: 'Setari',
    url: '/configs',
    icon: 'icon-bell',
    children: [
      {
        name: 'Configurari',
        url: '/configs/global',
        icon: 'icon-bell'
      },
      {
        name: 'Tabele',
        url: '/configs/table',
        icon: 'icon-bell'
      },
    ]
  },
  {
    name: 'Widgets',
    url: '/widgets',
    icon: 'icon-calculator',
    badge: {
      variant: 'info',
      text: 'NEW'
    }
  },
  {
    divider: true
  },
  {
    title: true,
    name: 'Extras',
  },
  {
    name: 'Pages',
    url: '/pages',
    icon: 'icon-star',
    children: [
      {
        name: 'Login',
        url: '/login',
        icon: 'icon-star'
      },
      {
        name: 'Register',
        url: '/register',
        icon: 'icon-star'
      },
      {
        name: 'Error 404',
        url: '/404',
        icon: 'icon-star'
      },
      {
        name: 'Error 500',
        url: '/500',
        icon: 'icon-star'
      }
    ]
  },
  {
    name: 'Disabled',
    url: '/dashboard',
    icon: 'icon-ban',
    badge: {
      variant: 'secondary',
      text: 'NEW'
    },
    attributes: { disabled: true },
  },
  {
    name: 'Download CoreUI',
    url: 'http://coreui.io/angular/',
    icon: 'icon-cloud-download',
    class: 'mt-auto',
    variant: 'success',
    attributes: { target: '_blank', rel: 'noopener' }
  },
  {
    name: 'Try CoreUI PRO',
    url: 'http://coreui.io/pro/angular/',
    icon: 'icon-layers',
    variant: 'danger',
    attributes: { target: '_blank', rel: 'noopener' }
  }
];

export const customItems: CustomINavData[] = [
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'icon-speedometer',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   },
  //   role : 'administrator',
  //   permissions: ['DASHBOARD_MENU'],
  //   children: [
  //     {
  //       name: 'Bugete',
  //       url: '/dashboard/budget',
  //       icon: 'fa fa-stack-overflow',
  //       badge: {
  //         variant: 'info',
  //         text: 'NEW'
  //       },
  //     },
  //     {
  //       name: 'Oferte',
  //       url: '/dashboard/offer',
  //       icon: 'fa fa-stack-overflow',
  //       badge: {
  //         variant: 'info',
  //         text: 'NEW'
  //       },
  //     },
  //     {
  //       name: 'Comenzi',
  //       url: '/dashboard/order',
  //       icon: 'fa fa-stack-overflow',
  //       badge: {
  //         variant: 'info',
  //         text: 'NEW'
  //       },
  //     },
  //     {
  //       name: 'Inventar',
  //       url: '/dashboard/inventory',
  //       icon: 'fa fa-stack-overflow',
  //       badge: {
  //         variant: 'info',
  //         text: 'NEW'
  //       },
  //     },
  //   ]
  // },
  // {
  //   name: 'Dashboard',
  //   url: '/dashboard',
  //   icon: 'fa fa-tachometer',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   class: 'danger',
  //   children: [
  //     // {
  //     //   name: 'Buget',
  //     //   url: '/dashboard/budget',
  //     //   icon: 'fa fa-money',
  //     //   class: 'danger'
  //     // },
  //     // {
  //     //   name: 'Oferte',
  //     //   url: '/dashboard/offer',
  //     //   icon: 'fa fa-briefcase'
  //     // },
  //     // {
  //     //   name: 'Comenzi',
  //     //   url: '/dashboard/order',
  //     //   icon: 'fa fa-first-order'
  //     // },
  //     {
  //       name: 'Inventar',
  //       url: '/dashboard/inventory',
  //       icon: 'fa fa-barcode'
  //     },
  //   ]
  // },
  // {
  //   name: 'Harti',
  //   url: '/map',
  //   icon: 'icon-map',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   role : 'administrator',
  // },
  // {
  //   name: 'Floor',
  //   url: '/floor',
  //   icon: 'icon-map',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   role : 'administrator',
  // },
  // {
  //   name: 'Bugete',
  //   url: '/budget',
  //   icon: 'cil-money',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  // {
  //   name: 'Oferte',
  //   url: '/offer',
  //   icon: 'fa fa-briefcase',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   class: 'danger',
  //   children: [
  //     {
  //       name: 'Status',
  //       url: '/offer/status',
  //       icon: 'fa fa-stack-overflow'
  //     },
  //     {
  //       name: 'Email',
  //       url: '/offer/email',
  //       icon: 'cil-envelope-closed'
  //     },
  //   ]
  // },
  // {
  //   name: 'Comenzi',
  //   url: '/order',
  //   icon: 'fa fa-first-order',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  {
    name: 'Active',
    url: '/asset',
    icon: 'fa fa-cubes',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   name: 'Accesorii',
  //   url: '/assetcomponent',
  //   icon: 'fa fa-codiepie',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   }
  // },
  {
    name: 'Angajati',
    url: '/employee',
    icon: 'fa fa-users',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  // {
  //   name: 'WFH',
  //   url: '/wfh',
  //   icon: 'fa fa-universal-access',
  //   badge: {
  //     variant: 'info',
  //     text: ''
  //   },
  //   class: 'danger',
  //   children: [
  //     {
  //       name: 'Validate',
  //       url: '/wfh/validate',
  //       icon: 'fa fa-stack-overflow'
  //     },
  //     {
  //       name: 'Status',
  //       url: '/wfh/email',
  //       icon: 'cil-envelope-closed'
  //     },
  //   ]
  // },
  {
    name: 'Inventariere',
    url: '/inventories',
    icon: 'fa fa-barcode',
    badge: {
      variant: 'info',
      text: ''
    },
    class: 'danger',
    children: [
      {
        name: 'Situatii',
        url: '/inventory/status',
        icon: 'fa fa-stack-overflow'
      },
      {
        name: 'Rapoarte',
        url: '/inventory/report',
        icon: 'fa fa-bar-chart'
      },
      {
        name: 'Planificare Inventar',
        url: '/inventory/inventory-plans',
        icon: 'fa fa-bar-chart'
      },
    ]
  },
  
  {
    name: 'Nomenclatoare',
    url: '/nomenclatures',
    icon: 'icon-bell',
    children: [
      {
        name: 'Luna contabila',
        url: '/nomenclatures/accmonths',
        icon: 'icon-bell'
      },
      {
        name: 'Inventare',
        url: '/nomenclatures/inventories',
        icon: 'icon-bell'
      },
      {
        name: 'Stari',
        url: '/nomenclatures/invstates',
        icon: 'icon-bell',
      },
      {
        name: 'Operatii',
        url: '/nomenclatures/assetstates',
        icon: 'icon-bell',
      },
      {
        name: 'Companii',
        url: '/nomenclatures/companies',
        icon: 'icon-bell'
      },
      {
        name: 'Culori',
        url: '/nomenclatures/assetnatures',
        icon: 'icon-bell'
      },
      {
        name: 'Judete',
        url: '/nomenclatures/counties',
        icon: 'icon-bell'
      },
      {
        name: 'Orase',
        url: '/nomenclatures/cities',
        icon: 'icon-bell'
      },
      // {
      //   name: 'PC',
      //   url: '/nomenclatures/mastertypes',
      //   icon: 'fa fa-globe',
      // },
      // {
      //   name: 'EXPENCE TYPE',
      //   url: '/nomenclatures/types',
      //   icon: 'fa fa-globe',
      // },
      {
        name: 'CATEGORII',
        url: '/nomenclatures/subtypes',
        icon: 'fa fa-globe',
      },
      // {
      //   name: 'GROUPS',
      //   url: '/nomenclatures/assetcategories',
      //   icon: 'fa fa-globe',
      // },
      // {
      //   name: 'CLASSES',
      //   url: '/nomenclatures/classes',
      //   icon: 'fa fa-globe',
      // },
      {
        name: 'Tip dictionar',
        url: '/nomenclatures/dictionarytypes',
        icon: 'fa fa-globe',
      },
      {
        name: 'Dictionar',
        url: '/nomenclatures/dictionaryitems',
        icon: 'fa fa-globe',
      },
    ]
  },
  
  {
    name: 'Setari email',
    url: '/email',
    icon: 'fa fa-empire',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Transferuri',
    url: '/operation',
    icon: 'fa fa-exchange',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Administrare',
    url: '/admin',
    icon: 'fa fa-key',
    badge: {
      variant: 'info',
      text: ''
    }
  },
  {
    name: 'Setari',
    url: '/configs',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Configurari',
        url: '/configs/global',
        icon: 'fa fa-globe'
      },
      {
        name: 'Tabele',
        url: '/configs/table',
        icon: 'fa fa-table'
      },
      {
        name: 'Meniu',
        url: '/configs/permissiontype',
        icon: 'fa fa-table'
      },
      {
        name: 'Permisiuni',
        url: '/configs/permission',
        icon: 'fa fa-table'
      },
      {
        name: 'Roluri',
        url: '/configs/permissionrole',
        icon: 'fa fa-table'
      },
    ]
  },
  {
    name: 'Meniu',
    url: '/routes',
    icon: 'fa fa-cog',
    children: [
      {
        name: 'Principal',
        url: '/routes/parent',
        icon: 'fa fa-globe'
      },
      {
        name: 'Secundar',
        url: '/routes/children',
        icon: 'fa fa-table'
      },
    ]
  },
  // {
  //   title: true,
  //   name: 'Theme'
  // },
  // {
  //   name: 'Colors',
  //   url: '/theme/colors',
  //   icon: 'icon-drop'
  // },
  // {
  //   name: 'Typography',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
  // {
  //   title: true,
  //   name: 'Components'
  // },
  // {
  //   name: 'Base',
  //   url: '/base',
  //   icon: 'icon-puzzle',
  //   children: [
  //     {
  //       name: 'Cards',
  //       url: '/base/cards',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Carousels',
  //       url: '/base/carousels',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Collapses',
  //       url: '/base/collapses',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Forms',
  //       url: '/base/forms',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Navbars',
  //       url: '/base/navbars',
  //       icon: 'icon-puzzle'

  //     },
  //     {
  //       name: 'Pagination',
  //       url: '/base/paginations',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Popovers',
  //       url: '/base/popovers',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Progress',
  //       url: '/base/progress',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Switches',
  //       url: '/base/switches',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tables',
  //       url: '/base/tables',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tabs',
  //       url: '/base/tabs',
  //       icon: 'icon-puzzle'
  //     },
  //     {
  //       name: 'Tooltips',
  //       url: '/base/tooltips',
  //       icon: 'icon-puzzle'
  //     }
  //   ]
  // },




  // {
  //   name: 'Buttons',
  //   url: '/buttons',
  //   icon: 'icon-cursor',
  //   children: [
  //     {
  //       name: 'Buttons',
  //       url: '/buttons/buttons',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Dropdowns',
  //       url: '/buttons/dropdowns',
  //       icon: 'icon-cursor'
  //     },
  //     {
  //       name: 'Brand Buttons',
  //       url: '/buttons/brand-buttons',
  //       icon: 'icon-cursor'
  //     }
  //   ]
  // },
  // {
  //   name: 'Charts',
  //   url: '/charts',
  //   icon: 'icon-pie-chart'
  // },
  // {
  //   name: 'Icons',
  //   url: '/icons',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'CoreUI Icons',
  //       url: '/icons/coreui-icons',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'success',
  //         text: 'NEW'
  //       }
  //     },
  //     {
  //       name: 'Flags',
  //       url: '/icons/flags',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Font Awesome',
  //       url: '/icons/font-awesome',
  //       icon: 'icon-star',
  //       badge: {
  //         variant: 'secondary',
  //         text: '4.7'
  //       }
  //     },
  //     {
  //       name: 'Simple Line Icons',
  //       url: '/icons/simple-line-icons',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Notifications',
  //   url: '/notifications',
  //   icon: 'icon-bell',
  //   children: [
  //     {
  //       name: 'Alerts',
  //       url: '/notifications/alerts',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Badges',
  //       url: '/notifications/badges',
  //       icon: 'icon-bell'
  //     },
  //     {
  //       name: 'Modals',
  //       url: '/notifications/modals',
  //       icon: 'icon-bell'
  //     }
  //   ]
  // },
  // {
  //   name: 'Widgets',
  //   url: '/widgets',
  //   icon: 'icon-calculator',
  //   badge: {
  //     variant: 'info',
  //     text: 'NEW'
  //   }
  // },
  // {
  //   divider: true
  // },
  // {
  //   title: true,
  //   name: 'Extras',
  // },
  // {
  //   name: 'Pages',
  //   url: '/pages',
  //   icon: 'icon-star',
  //   children: [
  //     {
  //       name: 'Login',
  //       url: '/login',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Register',
  //       url: '/register',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 404',
  //       url: '/404',
  //       icon: 'icon-star'
  //     },
  //     {
  //       name: 'Error 500',
  //       url: '/500',
  //       icon: 'icon-star'
  //     }
  //   ]
  // },
  // {
  //   name: 'Disabled',
  //   url: '/dashboard',
  //   icon: 'icon-ban',
  //   badge: {
  //     variant: 'secondary',
  //     text: 'NEW'
  //   },
  //   attributes: { disabled: true },
  // },
  // {
  //   name: 'Download CoreUI',
  //   url: 'http://coreui.io/angular/',
  //   icon: 'icon-cloud-download',
  //   class: 'mt-auto',
  //   variant: 'success',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // },
  // {
  //   name: 'Try CoreUI PRO',
  //   url: 'http://coreui.io/pro/angular/',
  //   icon: 'icon-layers',
  //   variant: 'danger',
  //   attributes: { target: '_blank', rel: 'noopener' }
  // }
];
