import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetExifReqBody } from '../../model/getExifReqBody';
import { IExif } from '../../model/piexif-types/interfaces';

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

    getExif(imgUrl: string): Observable<IExif> {
        const reqBody = { imgUrl: imgUrl } as GetExifReqBody;
        return this.http.post<IExif>(this.url + 'getExif', reqBody, this.httpOptions);
    }
}
