import { ConfigValue } from './model/api/common/config-value';


export class AppConfig {

    public static urlPrefix: string = 'http://localhost:7006/api/';
    public static urlAuthPrefix: string = 'http://localhost:7006/';
    public static reportingServer: string = 'http://localhost:7631/';
    public static partnerServer: string = 'https://webservicesp.anaf.ro/AsynchWebService/api/v6/ws/tva';
    public static urlPrefixPrint: string = 'http://127.0.0.1:8080/api/';

    public static clientDateFormat: string = 'DD/MM/YYYY';

    public static clientId: string = '';
    public static employeeLastSync: string = '';

    public static get ALLOW_WFH(): boolean { return this._allowWFH; }

    public static get VALUE_CLIENT_ID_NOT_SET(): string { return '00000000-0000-0000-0000-000000000000'; }
    public static get CONFIG_VALUE_CLIENT_ID(): string { return 'CLIENT_ID'; }
    public static get CONFIG_VALUE_EMPLOYEE_LAST_SYNC(): string { return 'EMPLOYEE_LAST_SYNC'; }

    public static get REQUIRE_ASSETACCSTATE(): string { return ';ASSETACCSTATE;'; }
    public static get REQUIRE_ASSETCATEGORY(): string { return ';ASSETCATEGORY;'; }
    public static get REQUIRE_ADMINISTRATION(): string { return ';ADMINISTRATION;'; }
    public static get REQUIRE_COSTCENTER(): string { return ';COSTCENTER;'; }
    public static get REQUIRE_DEPARTMENT(): string { return ';DEPARTMENT;'; }
    public static get REQUIRE_EMPLOYEE(): string { return ';EMPLOYEE;'; }
    public static get REQUIRE_ROOM(): string { return ';ROOM;'; }
    public static get REQUIRE_VALUE(): string { return ';VALUE;'; }
    public static get ACCMONTH_REQUIRED(): boolean { return true; }
    public static get ASSET_CATEGORY_REQUIRED(): boolean { return true; }
    public static get ASSET_TYPE_REQUIRED(): boolean { return true; }
    public static get DOCUMENTTYPE_MASK_ASSETACCSTATE(): string { return 'ASSETACCSTATE'; }
    public static get DOCUMENTTYPE_MASK_ASSETCATEGORY(): string { return 'ASSETCATEGORY'; }
    public static get DOCUMENTTYPE_MASK_ADMINISTRATION(): string { return 'ADMINISTRATION'; }
    public static get DOCUMENTTYPE_MASK_COSTCENTER(): string { return 'COSTCENTER'; }
    public static get DOCUMENTTYPE_MASK_DIVISION(): string { return 'DIVISION'; }
    public static get DOCUMENTTYPE_MASK_DEPARTMENT(): string { return 'DEPARTMENT'; }
    public static get DOCUMENTTYPE_MASK_EMPLOYEE(): string { return 'EMPLOYEE'; }
    public static get DOCUMENTTYPE_MASK_INVSTATE(): string { return 'INVSTATE'; }
    public static get DOCUMENTTYPE_MASK_ALL(): string { return 'ALL'; }
    public static get DOCUMENTTYPE_MASK_ROOM(): string { return 'ROOM'; }
    public static get DOCUMENTTYPE_MASK_VALUE(): string { return 'VALUE'; }
    public static get DOCUMENTTYPE_MASK_REQUIRED(): string { return 'NOTNULL'; }
    public static get EMAIL_TYPE_REQUIRED(): boolean { return false; }
    public static get EMAIL_MANAGER_REQUIRED(): boolean { return false; }
    public static get PERMISSION_TYPE_REQUIRED(): boolean { return false; }
    public static get PERMISSION_REQUIRED(): boolean { return false; }
    public static get PERMISSION_ROLE_REQUIRED(): boolean { return false; }

    public static get INVSTATE_CASS_ID(): number { return 2; }
    public static get INVSTATE_SELL_ID(): number { return 3; }

    public static get ASSET_REQUIRED(): boolean { return true; }
    public static get EMPLOYEE_REQUIRED(): boolean { return true; }

    public static get COSTCENTER_ADMCENTER_REQUIRED(): boolean { return true; }
    public static get ROOM_LOCATION_REQUIRED(): boolean { return true; }
    public static get LOCATION_REGION_REQUIRED(): boolean { return false; }
    public static get LOCATION_CITY_REQUIRED(): boolean { return false; }
    public static get EMPLOYEE_DEPARTMENT_REQUIRED(): boolean { return true; }
    public static get EMPLOYEE_DIVISION_REQUIRED(): boolean { return true; }

    public static get INTER_COMPANY_REQUIRED(): boolean { return true; }
    public static get INTER_COMPANY_EN_REQUIRED(): boolean { return true; }

    public static get DOCUMENT_TYPE_TRANSFER(): string { return 'TRANSFER'; }
    public static get DOCUMENT_TYPE_CASS(): string { return 'CASS'; }
    public static get DOCUMENT_TYPE_SELL(): string { return 'SELL'; }
    public static get DOCUMENT_TYPE_VALIDATE(): string { return 'VALIDATEASSET'; }
    public static get DOCUMENT_TYPE_INVENTORY(): string { return 'INVENTORY'; }

    public static get DOCUMENT_TYPE_ALL(): string { return 'ALL'; }
    public static get DOCUMENT_TYPE_STATE_CHANGE(): string { return 'STATE_CHANGE'; }
    public static get DOCUMENT_TYPE_TRANSFER_ROOM(): string { return 'TRANSFER_ROOM'; }
    public static get DOCUMENT_TYPE_TRANSFER_EMPLOYEE(): string { return 'TRANSFER_EMPLOYEE'; }
    public static get DIVISION_REQUIRED(): boolean { return true; }
    public static get COSTCENTER_REQUIRED(): boolean { return true; }
    public static get CITY_COUNTY_REQUIRED(): boolean { return true; }
    public static get COUNTY_COUNTRY_REQUIRED(): boolean { return true; }

    public static get ACCOUNT_COUNTY_REQUIRED(): boolean { return true; }
    public static get EXP_ACCOUNT_COUNTY_REQUIRED(): boolean { return true; }
    public static get ASSET_CATEGORY_COUNTY_REQUIRED(): boolean { return true; }
    public static get SUB_CATEGORY_COUNTY_REQUIRED(): boolean { return true; }
    public static get SUB_CATEGORYEN_COUNTY_REQUIRED(): boolean { return true; }
    public static get SUB_TYPE_COUNTY_REQUIRED(): boolean { return true; }

    public static get SHOW_DEPARTMENT_DETAILS(): boolean { return false; }
    public static get SHOW_ASSETCATEGORY_DETAILS(): boolean { return true; }

    // --- BNR --- //
    public static get SHOW_SUPPLIER_DETAILS(): boolean { return false; }
    public static get SHOW_ASSET_DETAILS_DOCUMENTTYPE(): boolean { return true; }
    public static get SHOW_ASSETTYPE_DETAILS(): boolean { return true; }
    public static get SHOW_DIVISION_DETAILS(): boolean { return true; }
    public static get SHOW_ADMINISTRATION_DETAILS(): boolean { return true; }
    public static get SHOW_ASSETTYPE_DETAILS_BUTTON(): boolean { return true; }
    public static get SHOW_ASSET_DETAILS_ADD_CATEGORY(): boolean { return true; }
    public static get SHOW_ASSET_DETAILS_SEARCH_CATEGORY(): boolean { return false; }
    public static get SHOW_ASSET_CLASS(): boolean { return true; }
    public static get SHOW_EMPLOYEE_DETAILS(): boolean { return true; }
    public static get SHOW_EMPLOYEE_DETAILS_BUTTON(): boolean { return false; }
    public static get SHOW_LOCATION_DETAILS(): boolean { return true; }
    public static get SHOW_LOCATION_DETAILS_BUTTON(): boolean { return false; }
    public static get SHOW_COSTCENTER_DETAILS(): boolean { return true; }
    public static get SHOW_COSTCENTER_DETAILS_BUTTON(): boolean { return false; }
    public static get SHOW_ROOMS_DETAILS(): boolean { return true; }
    public static get SHOW_ROOMS_DETAILS_BUTTON(): boolean { return false; }
    public static get SHOW_REGIONS_DETAILS(): boolean { return true; }
    public static get SHOW_REGIONS_DETAILS_BUTTON(): boolean { return false; }
    public static get SHOW_ASSET_DETAILS_SERIE_DOC1(): boolean { return false; }
    public static get SHOW_ASSET_DETAILS_SERIE_DOC2(): boolean { return false; }
    public static get SHOW_ASSET_DETAILS_SUPPLIER(): boolean { return false; }
    public static get SHOW_DOCUMENT_MODEL_DETAILS_(): boolean { return false; }
    public static get READ_ONLY(): boolean { return true; }
    public static get SHOW_ASSET_DETAILS_ERPCODE(): boolean { return true; }
    public static get USE_ASSET_CATEGORY(): boolean { return true; }
    public static get SHOW_REGION_DETAILS(): boolean { return true; }
    public static get USE_EXPORT_IN(): boolean { return true; }
    public static get USE_EXPORT_OUT(): boolean { return true; }
    public static get USE_ASSET_CLASS(): boolean { return false; }
    public static get USE_ASSET_ADD_BUTTON(): boolean { return false; }
    public static get USE_EXPORT_PIF(): boolean { return false; }
    public static get USE_EXPORT_PV(): boolean { return false; }
    public static get USE_EXPORT_OTP(): boolean { return false; }
    public static get SHOW_ASSET_STATES(): boolean { return true; }
    public static get SHOW_ASSET_DETAILS_SUPPLIER_ADD(): boolean { return false; }

    public static get SHOW_ASSET_DETAILS_EMPLOYEE_DETAILS(): boolean { return false; }
    public static get SHOW_ASSET_DETAILS_ROOM_DETAILS(): boolean { return true; }

    public static get SHOW_CUSTODY_DETAILS(): boolean { return false; }

    public static get IMPORT_TYPE(): string { return this._importType; }

    public static _companyName: string = '';
    public static _disclaimer: string = '';
    public static _inventoryListDirectLink: boolean = false;
    public static _useAdmCenter: boolean = false;
    public static _useCostCenter: boolean = false;
    public static _useRegion: boolean = false;
    public static _useDepartment: boolean = false;
    public static _useEmployee: boolean = false;
    public static _useRoom: boolean = false;
    public static _useAdministration: boolean = false;
    public static _useAssetType: boolean = false;
    public static _useAssetCategory: boolean = false;
    public static _useAssetState: boolean = false;
    public static _listFontSize: number = 9;
    public static _buttonSize: string = 'btn-xs';
    public static _textBoxHeight: number = 20;
    public static _importType: string = '';
    public static _allowWFH: boolean = false;

    public static _menuSuppliers: boolean = false;

    public static get COMPANY_NAME(): string { return this._companyName; }
    public static get DISCLAIMER(): string { return this._disclaimer; }
    public static get INVENTORYLIST_DIRECTLINK(): boolean { return this._inventoryListDirectLink; }

    public static get TRANSLATE_DEFAULT_LANGUAGE(): string { return 'ro'; }  // 'en' or 'ro'

    public static get USE_ADM_CENTER(): boolean { return this._useAdmCenter; }
    public static get USE_COST_CENTER(): boolean { return this._useCostCenter; }
    public static get USE_DEPARTMENT(): boolean { return this._useDepartment; }
    public static get USE_REGION(): boolean { return this._useRegion; }
    public static get USE_EMPLOYEE(): boolean { return this._useEmployee; }
    public static get USE_ROOM(): boolean { return this._useRoom; }
    public static get USE_ADMINISTRATION(): boolean { return this._useAdministration; }
    public static get USE_ASSETTYPE(): boolean { return this._useAssetType; }
    public static get USE_ASSETCATEGORY(): boolean { return this._useAssetCategory; }
    public static get LIST_FONT_SIZE(): number { return this._listFontSize; }
    public static get BUTTON_SIZE(): string { return this._buttonSize; }
    public static get TEXTBOX_HEIGHT(): number { return this._textBoxHeight; }
    public static get USE_ASSET_STATE(): boolean { return true; }

    // public static get MENU_SUPPLIERS(): boolean { return this._menuSuppliers; }

    public static UpdateAppConfig(configValues: Map<string, ConfigValue>) {
        // this._useAdmCenter = configValues.has('ENTITY|ADMCENTER_ENABLED') ? configValues.get('ENTITY|ADMCENTER_ENABLED').boolValue : false;
        this._companyName = configValues['COMPANY|NAME'] ? configValues['COMPANY|NAME'].textValue : '';
        this._disclaimer = configValues['COMPANY|DISCLAIMER'] ? configValues['COMPANY|DISCLAIMER'].textValue : '';
        this._inventoryListDirectLink = configValues['COMPANY|INVENTORYLIST_DIRECTLINK'] ? configValues['COMPANY|INVENTORYLIST_DIRECTLINK'].boolValue : false;
        this._useAdmCenter = configValues['ENTITY|ADMCENTER_ENABLED'] ? configValues['ENTITY|ADMCENTER_ENABLED'].boolValue : false;
        this._useCostCenter = configValues['ENTITY|COSTCENTER_ENABLED'] ? configValues['ENTITY|COSTCENTER_ENABLED'].boolValue : false;
        this._useRoom = configValues['ENTITY|ROOM_ENABLED'] ? configValues['ENTITY|ROOM_ENABLED'].boolValue : false;
        this._useAdministration = configValues['ENTITY|ADMINISTRATION_ENABLED'] ? configValues['ENTITY|ADMINISTRATION_ENABLED'].boolValue : false;
        this._useAssetType = configValues['ENTITY|ASSETTYPE_ENABLED'] ? configValues['ENTITY|ASSETTYPE_ENABLED'].boolValue : false;
        this._useAssetCategory = configValues['ENTITY|ASSETCATEGORY_ENABLED'] ? configValues['ENTITY|ASSETCATEGORY_ENABLED'].boolValue : false;
        this._useRegion = configValues['ENTITY|REGION_ENABLED'] ? configValues['ENTITY|REGION_ENABLED'].boolValue : false;
        this._useEmployee = configValues['ENTITY|EMPLOYEE_ENABLED'] ? configValues['ENTITY|EMPLOYEE_ENABLED'].boolValue : false;
        this._useDepartment = configValues['ENTITY|DEPARTMENT_ENABLED'] ? configValues['ENTITY|DEPARTMENT_ENABLED'].boolValue : false;
        this._useAssetState = configValues['ENTITY|ASSETSTATE_ENABLED'] ? configValues['ENTITY|ASSETSTATE_ENABLED'].boolValue : false;

        this._listFontSize = configValues['STYLE|LIST_FONT_SIZE'] ? configValues['STYLE|LIST_FONT_SIZE'].numericValue : 9;
        this._buttonSize = configValues['STYLE|BUTTON_SIZE'] ? configValues['STYLE|BUTTON_SIZE'].textValue : 'btn-xs';
        this._textBoxHeight = configValues['STYLE|TEXTBOX_HEIGHT'] ? configValues['STYLE|TEXTBOX_HEIGHT'].numericValue : 20;

        this._importType = configValues['COMPANY|IMPORT_TYPE'] ? configValues['COMPANY|IMPORT_TYPE'].textValue : '';

        this._allowWFH = configValues['ENTITY|WFH_ENABLED'] ? configValues['ENTITY|WFH_ENABLED'].boolValue : false;

        // this._menuSuppliers = configValues['MENU|SUPPLIERS'] ? configValues['MENU|SUPPLIERS'].boolValue : false;
    }
}


/**
 * Configuration data for the app, as in Config.cs.
 */
export class Config {

  /**
   * Token endpoint.
   * @see https://identityserver4.readthedocs.io/en/dev/endpoints/token.html
   */
  public static readonly TOKEN_ENDPOINT: string = AppConfig.urlAuthPrefix + 'connect/token';

  /**
   * Revocation endpoint.
   */
  public static readonly REVOCATION_ENDPOINT: string = AppConfig.urlAuthPrefix + 'connect/revocation';

  /**
   * UserInfo endpoint.
   * @see https://identityserver4.readthedocs.io/en/dev/endpoints/userinfo.html
   */
  public static readonly USERINFO_ENDPOINT: string = AppConfig.urlAuthPrefix + 'connect/userinfo';

  /**
   * The ClientId.
   */
  public static readonly CLIENT_ID: string = 'OFA';

  /**
   * Resource Owner Password Credential grant.
   */
  public static readonly GRANT_TYPE: string = 'password';

  /**
   * The Web API, refresh token (offline_access) & user info (openid profile roles).
   */
  public static readonly SCOPE: string = 'WebAPI offline_access openid profile roles';

}
