import { Component, ElementRef, EventEmitter, HostBinding, HostListener, Input, Output } from '@angular/core';
import { MapOptions, tileLayer, Map, latLng, Layer, LatLng, marker, DragEndEvent } from 'leaflet';
import { BehaviorSubject } from 'rxjs';
import { delay, filter, take, tap } from 'rxjs/operators';
import { LeafletUtils } from 'src/app/model/leafletUtils';
import { NominatimService } from 'src/app/service/nominatim.service';

@Component({
    selector: 'leaflet-map',
    templateUrl: './map.component.html',
    styleUrls: ['./map.component.scss'],
})
export class MapComponent {
    map!: Map;
    latLng!: LatLng;
    markers: Layer[] = [];
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
    @Output()
    gpsCoordinatesChange: EventEmitter<LatLng> = new EventEmitter<LatLng>();

    @HostBinding('class')
    private class = 'full-width';
    private mapReady = new BehaviorSubject<boolean>(false);
    private posChanged = false;

    constructor(private nominatimService: NominatimService, private el: ElementRef) {}

    @Input()
    set gpsCoordinates(latLng: LatLng) {
        this.latLng = latLng;
        if (!!latLng && !this.posChanged) {
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
        this.markers = [marker(this.latLng, { icon: LeafletUtils.iconDefault, draggable: true })];
        this.getAddress();
        this.markers[0].on('dragend', (ev) => {
            this.onDragEnd(ev);
        });
    }

    private onDragEnd(ev: DragEndEvent): void {
        this.gpsCoordinatesChange.next(ev.target.getLatLng());
        this.posChanged = true;
        this.markers[0].unbindPopup();
    }

    private getAddress(): void {
        this.nominatimService
            .getAddress(this.latLng)
            .pipe(
                tap((resp) => this.markers[0].bindPopup(resp.display_name)),
                delay(1000),
            )
            .subscribe(() => {
                this.markers[0].togglePopup();
            });
    }
}
