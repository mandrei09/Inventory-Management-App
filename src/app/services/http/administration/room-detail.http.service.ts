import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { RoomDetail } from '../../../model/api/administration/room-detail';
import { GenericHttpService } from '../generic.http.service';
// import { AuthHttp } from 'angular2-jwt';

@Injectable()
export class RoomDetailHttpService extends GenericHttpService<RoomDetail, number> {
    constructor(public http: HttpClient) {
        super(http, "", "rooms");
    }
}