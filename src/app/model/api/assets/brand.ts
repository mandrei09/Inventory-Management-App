import { CodeNameEntity } from "../common/code-name-entity";

export class Brand {
    id: number;
    code: string;
    name: string;
    tag1Pattern: string;
    tag2Pattern: string;
    tag3Pattern: string;
    tag4Pattern: string;
    tag5Pattern: string;
    serial1Pattern: string;
    serial2Pattern: string;
    serial3Pattern: string;
    serial4Pattern: string;
    serial5Pattern: string;
    imei1Pattern: string;
    imei2Pattern: string;
    imei3Pattern: string;
    imei4Pattern: string;
    imei5Pattern: string;
    phoneNumber1Pattern: string;
    phoneNumber2Pattern: string;
    phoneNumber3Pattern: string;
    phoneNumber4Pattern: string;
    phoneNumber5Pattern: string;
    dictionaryItem: CodeNameEntity;
    state: any; notSync: any; isLocked: any;

    constructor (id: number, code: string, name: string, tag1Pattern: string,
      tag2Pattern: string,
      tag3Pattern: string,
      tag4Pattern: string,
      tag5Pattern: string,
      serial1Pattern: string,
      serial2Pattern: string,
      serial3Pattern: string,
      serial4Pattern: string,
      serial5Pattern: string,
      imei1Pattern: string,
      imei2Pattern: string,
      imei3Pattern: string,
      imei4Pattern: string,
      imei5Pattern: string, phoneNumber1Pattern: string,
      phoneNumber2Pattern: string,
      phoneNumber3Pattern: string,
      phoneNumber4Pattern: string,
      phoneNumber5Pattern: string, dictionaryItem: CodeNameEntity) {
        this.id = id;
        this.code = code;
        this.name = name;
        this.tag1Pattern = tag1Pattern;
        this.tag2Pattern = tag2Pattern;
        this.tag3Pattern = tag3Pattern;
        this.tag4Pattern = tag4Pattern;
        this.tag5Pattern = tag5Pattern;
        this.serial1Pattern = serial1Pattern;
        this.serial2Pattern = serial2Pattern;
        this.serial3Pattern = serial3Pattern;
        this.serial4Pattern = serial4Pattern;
        this.serial5Pattern = serial5Pattern;
        this.imei1Pattern = imei1Pattern;
        this.imei2Pattern = imei2Pattern;
        this.imei3Pattern = imei3Pattern;
        this.imei4Pattern = imei4Pattern;
        this.imei5Pattern = imei5Pattern;
        this.phoneNumber1Pattern = phoneNumber1Pattern;
        this.phoneNumber2Pattern = phoneNumber2Pattern;
        this.phoneNumber3Pattern = phoneNumber3Pattern;
        this.phoneNumber4Pattern = phoneNumber4Pattern;
        this.phoneNumber5Pattern = phoneNumber5Pattern;
        this.dictionaryItem = dictionaryItem;
    }
}
