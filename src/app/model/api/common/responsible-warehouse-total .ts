export class ResponsableWarehouseTotal {
    id: number;
    code: string;
    name: string;
    room: string;
    administration: string;
    division: string;
    department: string;
    initial: number;
    initialCurrentAPC: number;
    initialCurrBkValue: number;
    initialAccumulDep: number;
    scanned: number;
    scannedCurrentAPC: number;
    scannedCurrBkValue: number;
    scannedAccumulDep: number;
    notScanned: number;
    notScannedCurrentAPC: number;
    notScannedCurrBkValue: number;
    notScannedAccumulDep: number;
    temp: number;
    procentage: number;
    lastScan: Date;
    valueRem: number;
}
