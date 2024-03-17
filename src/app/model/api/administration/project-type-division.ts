import { CodeNameEntity } from "../common/code-name-entity";

export class ProjectTypeDivision {
    id: number;
    projectType: CodeNameEntity;
    division: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, projectType: CodeNameEntity, division: CodeNameEntity) {
        this.id = id;
        this.projectType = projectType;
        this.division = division;
    }
}
