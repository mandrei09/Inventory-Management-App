import { Component, EventEmitter, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { GenericDetail } from '../../generic/generic.detail';
import { Location } from '../../../model/api/administration/location';
import { Room } from '../../../model/api/administration/room';
import { AppConfig } from '../../../config';
import { CodeNameEntity } from '../../../model/api/common/code-name-entity';

@Component({
    selector: 'app-room-detail',
    templateUrl: 'room.detail.html',
    inputs: [ 'locationLink', 'locationSelectedEvent' ],
    outputs: ['locationNeeded']
})
export class RoomDetailComponent extends GenericDetail<Room, number> {

    @ViewChild('detailForm') detailForm: FormGroup;
    // @ViewChild('detailForm') detailForm: any;

    public locationRequired: boolean = AppConfig.ROOM_LOCATION_REQUIRED;
    public locationSelectedEvent: EventEmitter<Location>;
    public locationNeeded: EventEmitter<void> = new EventEmitter<void>();

    public selectedLocation: Location = null;
    public locationLink: boolean = false;

    setItemDefaultValues() {
        this.item = new Room(0, '', '', null, false);
    }

    public resetForm() {
        this.detailForm.reset();
    }

    public set location(location: Location) {
        this.selectedLocation = location;
        this.item.location = location != null ? new CodeNameEntity(location.id, location.code, location.name) : null;
    }

    public askForLocation() {
        this.locationNeeded.emit();
    }

    public setLocation(location: Location) {
        this.selectedLocation = location;
        this.item.location = location != null ? location : null;
    }

    public saveItem() {
        if ((this.locationRequired) && (this.selectedLocation == null)) {
            alert('Directia este obligatorie!');
        }
        else {
            super.saveItem();
        }
    }

    //public get allowSaving(): boolean { return ((this.detailForm != null) && (this.detailForm.form.valid) && (location != null)); }
}