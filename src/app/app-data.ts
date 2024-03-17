import { AppConfig } from './config';
import { AssetSimpleDetail } from './model/api/assets/asset-simple-detail';
import { ConfigValue } from './model/api/common/config-value';
import { ColumnDefinition } from './model/common/column-definition';
import { TableDefinition } from './model/common/table-definition';
export class AppData {

    public static UserId: string = '';
    public static UserIsSignedIn: boolean = false;
    public static UserIsAdmin: boolean = false;
    public static UserRoles: string = '';

    public static AssetList: Array<AssetSimpleDetail> = new Array<AssetSimpleDetail>();
    public static DocumentTypes: Array<DocumentType> = new Array<DocumentType>();

    public static ColumnDefinitions: { [tableDefinitionId: string]: Array<ColumnDefinition>; } = {};
    // public static ConfigValues: { [code: string] : ConfigValue; } = {};
    public static ConfigValues: Map<string, ConfigValue> = new Map<string, ConfigValue>();

    public static UpdateColumnDefinitions(tableDefinitions: Array<TableDefinition>, columnDefinitions: Array<ColumnDefinition>) {

        // console.log('column updates');
        // console.log(tableDefinitions);
        // console.log(columnDefinitions);

        let columnIndex = 0;

        tableDefinitions.forEach((tableDefinition: TableDefinition) => {
            const colDefs: Array<ColumnDefinition> = new Array<ColumnDefinition>();

            columnIndex = 0;
            while (columnIndex < columnDefinitions.length) {
                if ((columnDefinitions[columnIndex].tableDefinitionId === tableDefinition.id)
                    && (columnDefinitions[columnIndex].active === true)) {
                    colDefs.push(columnDefinitions[columnIndex]);
                }
                // else {
                //     break;
                // }

                columnIndex++;
            }

            colDefs.sort((c1, c2) => c1.position - c2.position);
            this.ColumnDefinitions[tableDefinition.code] = colDefs;
        });

        // console.log(JSON.stringify(this.ColumnDefinitions));
    }

    public static UpdateConfigValues(configValues: Array<ConfigValue>) {
        configValues.forEach((configValue: ConfigValue) => {
            this.ConfigValues[configValue.group + '|' + configValue.code] = configValue;
            // this.ConfigValues.set(configValue.code, configValue);
        });

        // console.log(JSON.stringify(this.ConfigValues));

        AppConfig.UpdateAppConfig(this.ConfigValues);
    }
}
