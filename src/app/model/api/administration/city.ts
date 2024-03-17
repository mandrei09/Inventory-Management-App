export class City {
    id: number;
    code: string;
    name: string;
    countyId: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, countyId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.countyId = countyId;

    }
}
