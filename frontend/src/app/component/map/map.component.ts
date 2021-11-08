import { Component, OnDestroy } from '@angular/core';
import { MapOptions, tileLayer, Map, latLng } from 'leaflet';

@Component({
    selector: 'leaflet-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnDestroy {
    options: MapOptions = {
        layers: [
            tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                opacity: 0.7,
                maxZoom: 19,
                attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }),
        ],
        zoom: 1,
        center: latLng(0, 0),
    };
    map!: Map;

    ngOnDestroy(): void {
        this.map.clearAllEventListeners;
        this.map.remove();
    }

    onMapReady(map: Map): void {
        this.map = map;
    }
}
