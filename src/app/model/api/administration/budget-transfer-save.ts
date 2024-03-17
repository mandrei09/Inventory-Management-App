export class BudgetTransferSave {
    id: number;
    code: string;
    name: string;
    depPeriod: number;
    depPeriodRem: number;
    // employeeId: number;
    // projectId: number;
    // countryId: number;
    // activityId: number;
    // departmentId: number;
    // admCenterId: number;
    // regionId: number;
    // divisionId: number;
    // projectTypeId: number;
    // assetTypeId: number;
    // appStateId: number;
    // startAccMonthId: number;
    info: string;
    //validated: boolean;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    octomber: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
    valueIni: number;
    aprilForecast: number;
    mayForecast: number;
    juneForecast: number;
    julyForecast: number;
    augustForecast: number;
    septemberForecast: number;
    octomberForecast: number;
    novemberForecast: number;
    decemberForecast: number;
    januaryForecast: number;
    februaryForecast: number;
    marchForecast: number;
    aprilForecastDestination: number;
    mayForecastDestination: number;
    juneForecastDestination: number;
    julyForecastDestination: number;
    augustForecastDestination: number;
    septemberForecastDestination: number;
    octomberForecastDestination: number;
    novemberForecastDestination: number;
    decemberForecastDestination: number;
    januaryForecastDestination: number;
    februaryForecastDestination: number;
    marchForecastDestination: number;
    aprilForecastDstNew: number;
    mayForecastDstNew: number;
    juneForecastDstNew: number;
    julyForecastDstNew: number;
    augustForecastDstNew: number;
    septemberForecastDstNew: number;
    octomberForecastDstNew: number;
    novemberForecastDstNew: number;
    decemberForecastDstNew: number;
    januaryForecastDstNew: number;
    februaryForecastDstNew: number;
    marchForecastDstNew: number;
    budgetForecastId: number;
    budgetForecastDestinationId: number;
    orderId: number;
    srcEmployeeId: number;
    dstEmployeeId: number;

    totalForecast: any;
    totalForecastDestination: any;

    // needeedBudget: number;
    // budgetBaseNewId: number;
    //orderId: number;
    //requestBudgetForecastId: number;
    importValueOrder: number;
    valueOrder: number;
    valueAsset: number;
    totalRem: number;
    valueAssetYTD: number;
    valueAssetYTG: number;
    totalRemDestination: number;
    importValueOrderDestination: number;
    valueAssetYTDDestination: number;
    valueAssetYTGDestination: number;
    valueOrderDestination: number;
}


export class BudgetAddSave {
    id: number;
    code: string;
    name: string;
    depPeriod: number;
    depPeriodRem: number;
    employeeId: number;
    projectId: number;
    countryId: number;
    activityId: number;
    departmentId: number;
    admCenterId: number;
    regionId: number;
    divisionId: number;
    projectTypeId: number;
    assetTypeId: number;
    appStateId: number;
    startAccMonthId: number;
    info: string;
    validated: boolean;
    april: number;
    may: number;
    june: number;
    july: number;
    august: number;
    september: number;
    octomber: number;
    november: number;
    december: number;
    january: number;
    february: number;
    march: number;
    total: number;
    valueIni: number;
    aprilForecast: number;
    mayForecast: number;
    juneForecast: number;
    julyForecast: number;
    augustForecast: number;
    septemberForecast: number;
    octomberForecast: number;
    novemberForecast: number;
    decemberForecast: number;
    januaryForecast: number;
    februaryForecast: number;
    marchForecast: number;
    aprilForecastNew: number;
    mayForecastNew: number;
    juneForecastNew: number;
    julyForecastNew: number;
    augustForecastNew: number;
    septemberForecastNew: number;
    octomberForecastNew: number;
    novemberForecastNew: number;
    decemberForecastNew: number;
    januaryForecastNew: number;
    februaryForecastNew: number;
    marchForecastNew: number;
    needeedBudget: number;
    requestId: number;

    totalForecast: any;
    totalForecastNew: any;

    constructor(id: number,
        code: string,
        name: string,
        depPeriod: number,
        depPeriodRem: number,
        employeeId: number,
        projectId: number,
        countryId: number,
        activityId: number,
        departmentId: number,
        admCenterId: number,
        regionId: number,
        divisionId: number,
        projectTypeId: number,
        assetTypeId: number,
        appStateId: number,
        startAccMonthId: number,
        info: string,
        validated: boolean,
        april: number,
        may: number,
        june: number,
        july: number,
        august: number,
        september: number,
        octomber: number,
        november: number,
        december: number,
        january: number,
        february: number,
        march: number,
        total: number,
        aprilForecast: number,
        mayForecast: number,
        juneForecast: number,
        julyForecast: number,
        augustForecast: number,
        septemberForecast: number,
        octomberForecast: number,
        novemberForecast: number,
        decemberForecast: number,
        januaryForecast: number,
        februaryForecast: number,
        marchForecast: number,
        aprilForecastNew: number,
        mayForecastNew: number,
        juneForecastNew: number,
        julyForecastNew: number,
        augustForecastNew: number,
        septemberForecastNew: number,
        octomberForecastNew: number,
        novemberForecastNew: number,
        decemberForecastNew: number,
        januaryForecastNew: number,
        februaryForecastNew: number,
        marchForecastNew: number,
        needeedBudget: number,
        requestId: number,
        totalForecast: any,
        totalForecastNew: any) {

            this.id = id;
            this.code = code;
            this.name = name;
            this.depPeriod = depPeriod;
            this.depPeriodRem = depPeriodRem;
            this.employeeId = employeeId;
            this.projectId = projectId;
            this.countryId = countryId;
            this.activityId = activityId;
            this.departmentId = departmentId;
            this.admCenterId = admCenterId;
            this.regionId = regionId;
            this.divisionId = divisionId;
            this.projectTypeId = projectTypeId;
            this.assetTypeId = assetTypeId;
            this.appStateId = appStateId;
            this.startAccMonthId = startAccMonthId;
            this.info = info;
            this.validated = validated;
            this.april = april;
            this.may = may;
            this.june = june;
            this.july = july;
            this.august = august;
            this.september = september;
            this.octomber = octomber;
            this.november = november;
            this.december = december;
            this.january = january;
            this.february = february;
            this.march = march;
            this.total = total;
            this.aprilForecast = aprilForecast;
            this.mayForecast = mayForecast;
            this.juneForecast = juneForecast;
            this.julyForecast = julyForecast;
            this.augustForecast = augustForecast;
            this.septemberForecast = septemberForecast;
            this.octomberForecast = octomberForecast;
            this.novemberForecast = novemberForecast;
            this.decemberForecast = decemberForecast;
            this.januaryForecast = januaryForecast;
            this.februaryForecast = februaryForecast;
            this.marchForecast = marchForecast;
            this.aprilForecastNew = aprilForecastNew;
            this.mayForecastNew = mayForecastNew;
            this.juneForecastNew = juneForecastNew;
            this.julyForecastNew = julyForecastNew;
            this.augustForecastNew = augustForecastNew;
            this.septemberForecastNew = septemberForecastNew;
            this.octomberForecastNew = octomberForecastNew;
            this.novemberForecastNew = novemberForecastNew;
            this.decemberForecastNew = decemberForecastNew;
            this.januaryForecastNew = januaryForecastNew;
            this.februaryForecastNew = februaryForecastNew;
            this.marchForecastNew = marchForecastNew;
            this.needeedBudget = needeedBudget;
            this.requestId = requestId;
            this.totalForecast = totalForecast;
            this.totalForecastNew = totalForecastNew;
    }
}
