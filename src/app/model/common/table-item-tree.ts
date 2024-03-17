export class TableItemTree<T> {
    data: T;
    selected: boolean;

    constructor(data: T, selected: boolean) {
        this.data = data;
        this.selected = selected;
    }
}