import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransferInStockSAP } from '../../../model/api/sap/transfer-in-stock-sap';
import { GenericHttpService } from '../generic.http.service';

@Injectable()
export class TransferInStockSAPHttpService extends GenericHttpService<TransferInStockSAP, number> {
    constructor(public http: HttpClient) {
        super(http, '', 'transferinstocksaps');
    }
}
