import { Injectable } from '@angular/core';
import { IExifElement } from '../model/piexif-types/interfaces';
import { LatLng, latLng } from 'leaflet';

@Injectable({
    providedIn: 'root',
})
export class CoordinatesService {
    calculateCoordinates(gps: IExifElement): LatLng {
        const latitudeTable = gps[2] as number[][];
        let lat =
            latitudeTable[0][0] / latitudeTable[0][1] +
            latitudeTable[1][0] / (60 * latitudeTable[1][1]) +
            latitudeTable[2][0] / (3600 * latitudeTable[2][1]);

        const longitudeTable = gps[4] as number[][];
        let lng =
            longitudeTable[0][0] / longitudeTable[0][1] +
            longitudeTable[1][0] / (60 * longitudeTable[1][1]) +
            longitudeTable[2][0] / (3600 * longitudeTable[2][1]);

        if (gps[1] === 'S') lat = -lat;
        if (gps[3] === 'W') lng = -lng;

        return latLng(lat, lng);
    }
}
