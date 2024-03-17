export class County {
    id: number;
    code: string;
    name: string;
    countryId: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, countryId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.countryId = countryId;

    }
}
