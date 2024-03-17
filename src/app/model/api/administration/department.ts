export class Department {
    id: number;
    code: string;
    name: string;
    teamLeaderId: number;
    state: any; notSync: any; isLocked: any;

    constructor(id: number, code: string, name: string, teamLeaderId: number) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.teamLeaderId = teamLeaderId;
    }
}