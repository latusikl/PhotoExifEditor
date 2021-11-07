import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class ExifService {
    private url = 'http://localhost:3000/';
    private httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
        }),
    };

    constructor(private http: HttpClient) {}

    //TODO: create type for exif data
    getExif(imgUrl: string): Observable<any> {
        return this.http.post(this.url + 'getExif', { imgUrl: imgUrl }, this.httpOptions);
    }
}
