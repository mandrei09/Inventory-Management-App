import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AppConfig } from '../../../config';
import { Employee } from '../../../model/api/administration/employee';
import { EmployeeResource } from '../../../model/api/administration/employee-resource';
import { SubType } from '../../../model/api/administration/sub-type';
import { Asset } from '../../../model/api/assets/asset';
import { AssetComponent } from '../../../model/api/assets/asset-component';
import { AssetEntity } from '../../../model/api/common/asset-entity';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';
import { Param } from '../../../model/common/param';
import { EntityFileHttpService } from '../../../services/http/common/entity-file.http.service';
import { EntityFileListComponent } from '../../common/entity-file.list';
import { GenericDetail } from '../../generic/generic.detail';

@Component({
    selector: 'asset-component-detail',
    templateUrl: 'asset-component.detail.html',
    inputs: [ 'assetLink', 'assetSelectedEvent', 'employeeLink', 'employeeSelectedEvent', 'subTypeLink', 'subTypeSelectedEvent'],
    outputs: ['assetNeeded', 'employeeNeeded', 'subTypeNeeded'],
    providers: []
})
export class AssetComponentDetail extends GenericDetail<AssetComponent, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;
    @ViewChild('entityFileList') public entityFileList: EntityFileListComponent;
    public entityTypeCode: string = 'ASSETCOMPONENT';
    public assetRequired: boolean = AppConfig.ASSET_REQUIRED;
    public assetSelectedEvent: EventEmitter<Asset>;
    public assetNeeded: EventEmitter<void> = new EventEmitter<void>();

    public employeeRequired: boolean = AppConfig.EMPLOYEE_REQUIRED;
    public employeeSelectedEvent: EventEmitter<Employee>;
    public employeeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public subTypeSelectedEvent: EventEmitter<SubType>;
    public subTypeNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedAsset: Asset = null;
    public assetLink: boolean = false;

    public selectedEmployee: Employee = null;
    public employeeLink: boolean = false;


    public selectedSubType: SubType = null;
    public subTypeLink: boolean = false;
    /**
     *
     */
    constructor( public entityFileHttpService: EntityFileHttpService) {
        super();
        
    }

    setItemDefaultValues() {
    this.item = new AssetComponent(0, '', '', null, null, null);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public saveItem() {
        // if ((this.assetRequired) && (this.selectedAsset == null)) {
        //     alert('Parintele este obligatoriu!');
        // }
        // else {
            
        // }
        super.saveItem();
    }

    public set asset(asset: Asset) {
        this.selectedAsset = asset;
        this.item.asset = asset != null ? new AssetEntity(asset.id, asset.invNo, asset.name) : null;
    }

    public askForAsset() {
        this.assetNeeded.emit();
    }

    public set employee(employee: Employee) {
        this.selectedEmployee = employee;
        this.item.employee = employee != null ? new EmployeeResource(employee.id, employee.internalCode, employee.firstName, employee.lastName, employee.email) : null;
    }

    public askForEmployee() {
        this.employeeNeeded.emit();
    }

    public refreshEntityFiles(){
    let params: Array<Param> = new Array<Param>();
    params.push(new Param('entityTypeCode', 'ASSETCOMPONENT'));
    params.push(new Param('entityId', this.item.id.toString()));
    this.entityFileList.refresh(params);
        
    }

    public set subType(subType: SubType) {
        this.selectedSubType = subType;
        this.item.subType = subType != null ? new CodeNameEntity(subType.id, subType.code, subType.name) : null;
    }

    public askForSubType() {
        this.subTypeNeeded.emit();
    }

}
