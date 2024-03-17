import { CodeNameEntity } from "./code-name-entity";
import { CodePartnerEntity } from "./code-partner-entity";
import { RequestBudgetForecast } from '../requests/request-budget-forecast';
import { Request } from "../administration/request";

export class EntityFile {
    id: number;
    entityId: number;
    entityTypeId: number;
    entityType: CodeNameEntity;
    fileType: string;
    storedAs: string;
    name: string;
    size: number;
    info: string;
    partner: CodePartnerEntity;
    request: Request;
    requestBudgetForecast:RequestBudgetForecast;
    quantity: number;
    skipEmail: boolean;
    selected: boolean;
    ModifiedAt : Date;
    // fileContent: any = null;
}

export class AssetImage {
    entityFile: EntityFile = null;
    fileContent: any = null;

    constructor(entityFile: EntityFile, fileContent: any) {
        this.entityFile = entityFile;
        this.fileContent = fileContent;
    }
}

// export class EntityFileSave {
//     entityId: number;
//     entityTypeCode: string;
//     info: string;
//     fileContent: any;
// }
