export class EntityType {
    id: number;
    code: string;
    name: string;
    uploadFolder: string;
    state: any; notSync: any; isLocked: any;



    constructor(id: number, code: string, name: string, uploadFolder: string) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.uploadFolder = uploadFolder;
    }
}