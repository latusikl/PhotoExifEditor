import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LatLng } from 'leaflet';
import { Observable } from 'rxjs';
import { NominatimResponse } from '../model/nominatimResponse';

@Injectable({
    providedIn: 'root',
})
export class NominatimService {
    constructor(private http: HttpClient) {}

    getAddress(latLng: LatLng): Observable<NominatimResponse> {
        const params = new HttpParams()
            .set('lat', latLng.lat.toString())
            .set('lon', latLng.lng.toString())
            .set('format', 'json');
        return this.http.get<NominatimResponse>('https://nominatim.openstreetmap.org/reverse', {
            params: params,
        });
    }
}
