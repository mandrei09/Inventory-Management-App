export class Operation {

    operationId: number;
    assetId: number;
    isDeleted: boolean;
    divisionId: number;
    costCenterId: number;
    partnerId: number;
    budgetManagerId: number;
    projectId: number;
    dimensionId: number;
    employeeId: number;
    assetAccStateId: number;
    assetCategoryId: number;
    departmentId: number;
    roomId: number;
    invStateId: number;
    employeeIdIni: number;
    orderId: number;

    constructor(operationId: number, assetId: number, isDeleted: boolean, divisionId: number, costCenterId: number, partnerId: number, budgetManagerId: number, projectId: number, dimensionId: number,
        employeeId: number, assetAccStateId: number, assetCategoryId: number, departmentId: number, roomId: number, invStateId: number, employeeIdIni: number, orderId: number) {

        this.operationId = operationId;
        this.assetId = assetId;
        this.isDeleted = isDeleted;
        this.divisionId = divisionId;
        this.costCenterId = costCenterId;
        this.partnerId = partnerId;
        this.budgetManagerId = budgetManagerId;
        this.projectId = projectId;
        this.dimensionId = dimensionId;
        this.employeeId = employeeId;
        this.assetAccStateId = assetAccStateId;
        this.assetCategoryId = assetCategoryId;
        this.departmentId = departmentId;
        this.roomId = roomId;
        this.invStateId = invStateId;
        this.employeeIdIni = employeeIdIni;
        this.orderId = orderId;
    }
}
