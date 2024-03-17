export class PagingInfo {
    totalItems: number;
    pageSize: number;
    currentPage: number;
    sumValueDepFYStart: number;
    sumValueAPCFYStart: number;
    sumValueBkValFYStart: number;
    sumValueDepYTDIn: number;
    sumValueCurrentAPC: number;
    sumValueDepTransfer: number;
    sumValueDepRetirement: number;
    sumValueTransfer: number;
    sumValueRetirement: number;
    sumValueAcquisition: number;
    sumValueDepForYear: number;
    sumValueAccumulDep: number;
    sumApril: number = 0;
    sumMay: number = 0;
    sumJune: number = 0;
    sumJuly: number = 0;
    sumAugust: number = 0;
    sumSeptember: number = 0;
    sumOctomber: number = 0;
    sumNovember: number = 0;
    sumDecember: number = 0;
    sumJanuary: number = 0;
    sumFebruary: number = 0;
    sumMarch: number = 0;
    sumTotal: number = 0;

    totalNetAmount: number;
    totalTaxAmount: number;
    showFooter: boolean;

    constructor(totalItems: number, pageSize: number, currentPage: number, sumValueDepFYStart: number,
        sumValueAPCFYStart: number,
        sumValueBkValFYStart: number,
        sumValueDepYTDIn: number,
        sumValueCurrentAPC: number,
        sumValueDepTransfer: number,
        sumValueDepRetirement: number,
        sumValueTransfer: number,
        sumValueRetirement: number,
        sumValueAcquisition: number,
        sumValueDepForYear: number,
        sumValueAccumulDep: number,
        sumApril: number,
        sumMay: number,
        sumJune: number,
        sumJuly: number,
        sumAugust: number,
        sumSeptember: number,
        sumOctomber: number,
        sumNovember: number,
        sumDecember: number,
        sumJanuary: number,
        sumFebruary: number,
        sumMarch: number,
        sumTotal: number,
        totalNetAmount: number,
        totalTaxAmount: number,
        showFooter: boolean) {
        this.totalItems = totalItems;
        this.pageSize = pageSize;
        this.currentPage = currentPage;
        this.sumValueDepFYStart = sumValueDepFYStart;
        this.sumValueAPCFYStart = sumValueAPCFYStart;
        this.sumValueBkValFYStart = sumValueBkValFYStart;
        this.sumValueDepYTDIn = sumValueDepYTDIn;
        this.sumValueCurrentAPC = sumValueCurrentAPC;
        this.sumValueDepTransfer = sumValueDepTransfer;
        this.sumValueDepRetirement = sumValueDepRetirement;
        this.sumValueTransfer = sumValueTransfer;
        this.sumValueRetirement = sumValueRetirement;
        this.sumValueAcquisition = sumValueAcquisition;
        this.sumValueDepForYear = sumValueDepForYear;
        this.sumValueAccumulDep = sumValueAccumulDep;
        this.sumApril = sumApril;
        this.sumMay = sumMay;
        this.sumJune = sumJune;
        this.sumJuly = sumJuly;
        this.sumAugust = sumAugust;
        this.sumSeptember = sumSeptember;
        this.sumOctomber = sumOctomber;
        this.sumNovember = sumNovember;
        this.sumDecember = sumDecember;
        this.sumJanuary = sumJanuary;
        this.sumFebruary = sumFebruary;
        this.sumMarch = sumMarch;
        this.sumTotal = sumTotal;
        this.totalNetAmount = totalNetAmount;
        this.totalTaxAmount = totalTaxAmount;
        this.showFooter = showFooter;
    }
}
