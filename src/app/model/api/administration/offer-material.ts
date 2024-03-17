import { CodeNameEntity } from "../common/code-name-entity";
import { Offer } from "./offer";

export class OfferMaterial {
    id: number;
    offer: Offer;
    material: CodeNameEntity;


    constructor (id: number, offer: Offer, material: CodeNameEntity) {
        this.id = id;
        this.offer = offer;
        this.material = material;
    }
}
