import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GetExifReqBody } from '../../model/getExifReqBody';
import { IExif } from '../../model/piexif-types/interfaces';
import { ImageData } from '../../model/imageData';
import { map } from 'rxjs/operators';
import { SaveExifReqBody } from 'src/app/model/saveExifReqBody';

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

    getExif(imgUrl: string, imgName: string): Observable<ImageData> {
        const reqBody = { imgUrl: imgUrl } as GetExifReqBody;
        return this.http
            .post<IExif>(this.url + 'getExif', reqBody, this.httpOptions)
            .pipe(map((exif) => new ImageData(imgName, exif)));
    }

    saveExif(imgUrl: string, imgName: string, exifData: IExif): Observable<Blob> {
        const reqBody = { imgUrl: imgUrl, name: imgName, exifData: exifData } as SaveExifReqBody;
        return this.http.post(this.url + 'saveExif', reqBody, { responseType: 'blob' });
    }
}
