import { Badge } from "./badge";
import { RoleEntity } from "./role-entity";

export class Route {
    id: number;
    url: string;
    name: string;
    role: RoleEntity;
    roleId: string;
    icon: string;
    active: boolean;
    variant: string;
    class: string;
    badge: Badge;
    position: number;
    state: any; notSync: any; isLocked: any;


    constructor(id: number, url: string, name: string, roleId: string) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.roleId = roleId;

    }
}
