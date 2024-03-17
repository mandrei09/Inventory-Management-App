import { Badge } from "./badge";
import { RoleEntity } from "./role-entity";

export class RouteChild {
    id: number;
    url: string;
    name: string;
    role: RoleEntity;
    roleId: string;
    routeId: number;
    icon: string;
    active: boolean;
    variant: string;
    class: string;
    badge: Badge;
    position: number;
    state: any; notSync: any; isLocked: any;


    constructor(id: number, url: string, name: string, roleId: string, routeId: number) {
        this.id = id;
        this.url = url;
        this.name = name;
        this.roleId = roleId;
        this.routeId = routeId;

    }
}
