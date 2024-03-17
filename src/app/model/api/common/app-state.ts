export class AppState {
    id: number;
    code: string;
    name: string;
    parentCode: string;
    state: any; notSync: any; isLocked: any;
    badgeColor?: string;
    badgeIcon?: string;

    constructor(id: number, code: string, name: string, parentCode: string, badgeColor?: string, badgeIcon?: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.parentCode = parentCode;
        this.badgeColor = badgeColor;
        this.badgeIcon = badgeIcon;
    }
}
