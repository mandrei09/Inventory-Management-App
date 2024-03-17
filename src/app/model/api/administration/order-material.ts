import { CodeNameEntity } from "../common/code-name-entity";
import { Order } from "./order";

export class OrderMaterial {
    id: number;
    order: Order;
    material: CodeNameEntity;


    constructor (id: number, order: Order, material: CodeNameEntity) {
        this.id = id;
        this.order = order;
        this.material = material;
    }
}
