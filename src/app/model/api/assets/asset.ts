import { CodeNameEntity } from '../common/code-name-entity';
export class Asset {
    id: number;
    invNo: string;
    name: string;
    serialNumber: string;
    purchaseDate: Date;
    sapCode: string;
    subNo: string;
    company: CodeNameEntity;
}
