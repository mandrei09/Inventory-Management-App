import { CodeNameEntity } from '../common/code-name-entity';
import { EmailManager } from './email-manager';

export class EmailManagerDetail extends EmailManager {
    emailTypeCode: string;
    emailTypeName: string;

    constructor (id: number, code: string, name: string, emailTypeId: number, emailTypeCode: string, emailTypeName: string) {
        super(id, code, name, new CodeNameEntity(emailTypeId, emailTypeCode, emailTypeName));
        this.emailTypeCode = emailTypeCode;
        this.emailTypeName = emailTypeName;
    }
}