import { Company } from "../assets/company";
import { CodeNameEntity } from "../common/code-name-entity";

export class CostCenter {
    id: number;
    code: string;
    name: string;
    admCenterId: number;
    admCenter: CodeNameEntity;
    regionId: number;
    region: CodeNameEntity;
    divisionId: number;
    division: CodeNameEntity;
    administrationId: number;
    administration: CodeNameEntity;
    companyId: number;
    company: Company;
    roomId: number;
    room: CodeNameEntity;
    storageId: number;
    storage: CodeNameEntity;
    state: any; notSync: any; isLocked: any;
    // employeeId: number;
    // employeeId2: number;
    // employeeId3: number;
    // employeeId4: number;
    // employeeId5: number;

    constructor(id: number, code: string, name: string, admCenterId: number,
      admCenter: CodeNameEntity,
      regionId: number,
      region: CodeNameEntity,
      divisionId: number,
      division: CodeNameEntity,
      administrationId: number,
      administration: CodeNameEntity,
      companyId: number,
      company: Company,
      roomId: number,
      room: CodeNameEntity,
      storageId: number,
      storage: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.admCenterId = admCenterId;
        this.admCenter = admCenter;
        this.regionId = regionId;
        this.region = region;
        this.divisionId = divisionId;
        this.division = division;
        this.administrationId = administrationId;
        this.administration = administration;
        this.companyId = companyId;
        this.company = company;
        this.roomId = roomId;
        this.room = room;
        this.storageId = storageId;
        this.storage = storage;
    }
}
