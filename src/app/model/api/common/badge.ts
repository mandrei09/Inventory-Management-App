export class Badge {
    id: number;
    text: string;
    variant: string;
    active: boolean;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, text: string, variant: string, active: boolean) {
        this.id = id;
        this.text = text;
        this.variant = variant;
        this.active = active;
    }
}