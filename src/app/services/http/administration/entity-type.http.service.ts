import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EntityType } from '../../../model/api/administration/entity-type';
import { GenericHttpService } from '../generic.http.service';
@Injectable()
export class EntityTypeHttpService extends GenericHttpService<EntityType, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'entitytypes');
    }
}
