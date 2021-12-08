import { Component, ElementRef, HostBinding, HostListener, Input } from '@angular/core';
import { MapOptions, tileLayer, Map, latLng, Layer, LatLng, marker } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { filter, take } from 'rxjs/operators';
import { LeafletUtils } from 'src/app/model/leafletUtils';
import { NominatimService } from 'src/app/service/nominatim.service';

@Component({
    selector: 'leaflet-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent {
    @HostBinding('class')
    private class = 'map-component';
    private mapReady = new BehaviorSubject<boolean>(false);

    options: MapOptions = {
        layers: [
            tileLayer(LeafletUtils.OSM_TEMPLATE, {
                opacity: 0.7,
                maxZoom: 19,
                attribution: LeafletUtils.OSM_ATTR,
            }),
        ],
        zoom: 1,
        center: latLng(0, 0),
    };
    map!: Map;
    markers: Layer[] = [];
    latLng!: LatLng;

    constructor(private nominatimService: NominatimService, private el: ElementRef) {}

    @Input()
    set gpsCoordinates(latLng: LatLng) {
        this.latLng = latLng;
        if (!!latLng) {
            this.mapReady
                .pipe(
                    filter((val) => !!val),
                    take(1),
                )
                .subscribe(() => this.addMarker());
        }
    }

    get mapHeight(): string {
        const { offsetHeight } = this.el.nativeElement;
        return (!!offsetHeight ? offsetHeight - 1 : 200) + 'px';
    }

    onMapReady(map: Map): void {
        this.map = map;
        this.mapReady.next(true);
    }

    @HostListener('window:resize')
    invalidateSize(): void {
        this.map.invalidateSize();
    }

    private addMarker(): void {
        this.markers = [marker(this.latLng, { icon: LeafletUtils.iconDefault })];
        this.getAddress();
    }

    private getAddress(): void {
        this.nominatimService.getAddress(this.latLng).subscribe((resp) => {
            this.markers[0].bindPopup(resp.display_name);
        });
    }
}
