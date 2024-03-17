import { Component } from '@angular/core';
import { Location } from '../../../model/api/administration/location';
import { Router } from '@angular/router';
import * as L from 'leaflet';
import { LocationHttpService } from '../../../services/http/administration/location.http.service';

@Component({
    selector: 'location-map',
    templateUrl: './maps.html'
})
export class LocationMap {

    public map: any;
    public markersGroup: any;
    public locations: Array<Location> = new Array<Location>();

    constructor(public router: Router,
        public locationHttpService: LocationHttpService) {
    }

    ngAfterViewInit() {
        this.getLocations();
    }

    public getLocations() {
        this.locationHttpService.getData()
            .subscribe((locations) => {
                this.locations = locations;

                this.showMap();
            });
    }

    public updateLocation(location: Location) {
        this.locations.forEach((l: Location) => {
            if (l.id === location.id) {
                l.code = location.code;
                l.name = location.name;
                l.latitude = location.latitude;
                l.longitude = location.longitude;
                // l.address = location.address;
                // l.email = location.email;
                // l.phoneMobile = location.phoneMobile;
                // l.phoneOffice = location.phoneOffice;
            }
        });

        this.showMarkers();
    }

    public openLocationDetail(location: Location) {
        // if ((location !== null) && (location.id > 0)) {
        //     this.router.navigate(['/location', location.id]);
        // }
        alert('dblclick');
    }

    showMap() {
        setTimeout(() => {
            // this.map = L.map("map").setView([44.428097, 26.102403], 12);
            this.map = L.map("map").setView([46.222960, 24.788120], 8);
            // L.tileLayer('http://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
            //     attribution: 'Tiles &copy; Esri'
            // }).addTo(this.map);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                detectRetina: true,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            }).addTo(this.map)
            this.showMarkers();
        });
    }

    showMarkers() {

        const myIcon = L.icon({
            iconUrl: 'assets/images/marker-icon.png',
            iconSize: [25, 41],
            iconAnchor: [13, 41],
            popupAnchor: [-0, -32],
            shadowUrl: 'assets/images/marker-shadow.png',
            shadowSize: [41, 41],
            shadowAnchor: [15, 41]
          });

        if (this.markersGroup) {
            this.map.removeLayer(this.markersGroup);
        }
        this.markersGroup = L.layerGroup([]);
        this.locations.forEach(location => {
            if (location.latitude, location.longitude) {
                // let link = $(`<p>${location.name}<br /><a href="#">...</a>`).click(() => this.openLocationDetail(location))[0];
                let marker: any = L.marker([location.latitude, location.longitude], {icon: myIcon, clickable: true, title: location.name })
                // .bindPopup(`<p>${location.name}</p>`)
                .on('dblclick', event => 
                    this.openLocationDetail(event.target.data)
                    );
                marker.bindPopup(`
                    <p>${location.name}</p>
                    <img src="assets/images/marker-icon.png">
                `);
                marker.data = location;
                this.markersGroup.addLayer(marker);
            }
        });
        this.map.addLayer(this.markersGroup);
    }
}
