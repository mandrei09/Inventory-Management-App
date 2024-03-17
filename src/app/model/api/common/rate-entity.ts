export class RateEntity {
    id: number;
    code: string;
    name: string;
    value: number;

    constructor (id: number, code: string, name: string, value: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.value = value;
    }
}
