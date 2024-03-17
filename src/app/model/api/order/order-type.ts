export class OrderType {
    id: number;
    code: string;
    name: string;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string) {
        this.id = id;
        this.code = code;
        this.name = name;
    }
}