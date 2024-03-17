import { Asset } from "../assets/asset";
import { CodeNameEntity } from './code-name-entity';

export class PrintLabel {
    id: number;
    code: string;
    name: string;
    uploadDate: Date;
    printDate: Date;
    asset: Asset;
    company: CodeNameEntity;
    state: any; notSync: any; isLocked: any;
}
