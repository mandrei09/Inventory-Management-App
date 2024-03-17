import { Administration } from "../administration/administration";
import { CostCenter } from "../administration/cost-center";
import { InvCommittee } from "./inv-committtee";

export class InventoryPlan {
    id: number;
    administrationId: number;
    administration: Administration;
    costCenterId: number;
    costCenter: CostCenter;
    invCommitteeId: number;
    invCommittee: InvCommittee;
    dateStarted: Date;
    dateFinished: Date;
}
