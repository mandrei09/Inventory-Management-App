export class RequestSave {
    id: number;
    // budgetBaseId: number;
    // budgetForecastId: number;
    // costCenterId: number;
    assetTypeId: number;
    projectTypeId: number;
    divisionId: number;
    employeeId: number;
    ownerId: number;
    info: string;
    validated: boolean;
    endDate: Date;
    budgetValueNeed: number;
    startAccMonthId: number;
    budgetForecastIds: RequestBudgetForecastSave[];
    rangeDates: Date[];
    startPeriodDate: Date;
    endPeriodDate: Date;
    // quantity: number;
}


export class RequestBudgetForecastSave {
  id: number;
  needBudgetValue: number;
}

