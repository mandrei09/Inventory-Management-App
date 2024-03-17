
export class ReportFilter {
    departmentIds: Array<number>;
    divisionIds: Array<number>;
    costCenterIds: Array<number>;
    administrationIds: Array<number>;
    isPrinted: boolean;
    isDuplicate: boolean;
    isTemp: boolean;
    inventoryDateStart: Date | null;
    inventoryDateEnd: Date | null;
    employeeIds: Array<number>;

    constructor(inventoryDateStart: Date | null, inventoryDateEnd: Date | null){
        this.inventoryDateStart = inventoryDateStart;
        this.inventoryDateEnd = inventoryDateEnd;
    }
}