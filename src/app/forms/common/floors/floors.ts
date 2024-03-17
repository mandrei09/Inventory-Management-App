import { Component } from '@angular/core';
import { fabric } from "fabric";
import * as Indoor from 'indoorjs';

@Component({
    selector: 'app-floor',
    templateUrl: './floors.html'
})
export class FloorMap {

    pdfSrc = 'https://inventare.ro/ftp/bnr/test/1.jpg';
    


    constructor() {
    }
    ngAfterViewInit() {
        
        const mapEl = document.querySelector('#canvas');
 
        let radar; let
        markers;
        
        
        const map = new Indoor.Map(mapEl, {
        floorplan: new Indoor.Floor({
            url: this.pdfSrc,
            opacity: 0.4,
            width: 400,
            zIndex: 1
        }),
        minZoom: 0.001,
        maxZoom: 10,
        center: {
            x: 0,
            y: 0,
            zoom: 1
        },
        markers: markers
        });

    }

    
}
