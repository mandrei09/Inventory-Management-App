export class PropertyFilterEntity {
    property: string;
    filter: string;

    constructor (property: string, filter: string) {
        this.property = property;
        this.filter = filter;
    }
}
