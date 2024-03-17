import { CodeNameEntity } from "../common/code-name-entity";
import { CodePartnerEntity } from "../common/code-partner-entity";

export class OfferSave {
    id: number;
    // code: string;
    // name: string;
    // companyId: number;
    // projectId: number;
    // administrationId: number;
    // masterTypeId: number;
    // typeId: number;
    // subTypeId: number;
    employeeId: number;
    // accMonthId: number;
    // interCompanyId: number;
    // partnerId: number;
    // accountId: number;
    // costCenterId: number;
    // valueIni: number;
    // valueFin: number;
    // quantity: number;
    // info: string;
    // validated: boolean;

    requestId: number;
    // admCenterId: number;
    // regionId: number;
    // assetTypeId: number;
    // projectTypeId: number;
    // budgetForecastId: number;
    // budgetBaseId: number;
    partnerIds: CodePartnerEntity[];
    fileToUpload: Array<any>;
    headerMsg: string;
    footerMsg: string;
    guid: string;
    offerTypeId: number;
    offerCloneId: number;
}
