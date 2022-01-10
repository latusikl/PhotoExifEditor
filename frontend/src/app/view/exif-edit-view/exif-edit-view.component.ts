import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LatLng } from 'leaflet';
import { MapComponent } from '../../component/map/map.component';
import { ExifFormData } from '../../model/exifFormData';
import { CoordinatesService } from '../../service/coordinates.service';
import { ToastService } from '../../service/toast.service';
import { ImageData } from '../../model/imageData';
import { ExifService } from '../../service/exif/exif.service';
import { ImageService } from '../../service/image/image.service';
import { IExifElement } from '../../model/piexif-types/interfaces';

@Component({
    selector: 'exif-edit-view',
    templateUrl: './exif-edit-view.component.html',
    styleUrls: ['./exif-edit-view.component.scss'],
})
export class ExifEditViewComponent implements OnInit {
    readonly MAP_TAB_INDEX = 2;
    imgData!: ImageData;
    imageUrl!: string;
    imageName!: string;
    gpsCoordinates!: LatLng;
    latitudeRef = 1;
    longitudeRef = 1;

    isDataLoaded = false;
    form: FormGroup;
    tabIndex = 0;

    brands: string[] = [
        'Canon',
        'Nikon',
        'Panasonic',
        'Fujifilm',
        'Sony',
        'Olympus',
        'Leica',
        'GoPro',
        'Pentax',
        'Kodak',
    ].sort();

    @HostBinding('class')
    private class = 'view';

    @ViewChild('map')
    private mapComponent!: MapComponent;

    constructor(
        private exifService: ExifService,
        private imageService: ImageService,
        private toastService: ToastService,
        private coordinatesService: CoordinatesService,
        private router: Router,
    ) {
        this.form = new FormGroup({
            name: new FormControl('', [Validators.required]),
            dateTime: new FormControl(''),
            focal: new FormControl(),
            fNumber: new FormControl(),
            exposure: new FormControl(),
            cameraBrand: new FormControl(),
            cameraModel: new FormControl(),
            author: new FormControl(),
            imageDescription: new FormControl(),
            title: new FormControl(),
            comment: new FormControl(),
            copyright: new FormControl(),
        });
    }

    get centerButtonVisible(): boolean {
        return this.isMapTabSelected && !!this.imgData?.isGpsDataDefined;
    }

    get isMapTabSelected(): boolean {
        return this.tabIndex === this.MAP_TAB_INDEX;
    }

    get latitude(): number {
        return +Math.abs(this.gpsCoordinates.lat).toFixed(6);
    }

    set latitude(value: number) {
        this.gpsCoordinates.lat = value * this.latitudeRef;
    }

    get longitude(): number {
        return +Math.abs(this.gpsCoordinates.lng).toFixed(6);
    }

    set longitude(value: number) {
        this.gpsCoordinates.lng = value * this.longitudeRef;
    }

    ngOnInit(): void {
        this.imageUrl = this.imageService.url.getValue();
        this.imageName = this.imageService.image.getValue()?.name ?? '';
        this.exifService.getExif(this.imageUrl, this.imageName).subscribe((imgData) => {
            this.isDataLoaded = true;
            this.imgData = imgData;
            if (imgData.isGpsDataDefined) {
                this.gpsCoordinates = this.coordinatesService.calculateCoordinates(
                    imgData.exifData.GPS as IExifElement,
                );
            }
            this.initForm();
        });
    }

    generateGpsTemplate(): void {
        this.imgData.exifData.GPS = this.coordinatesService.generateGpsTemplate();
        this.gpsCoordinates = this.coordinatesService.calculateCoordinates(this.imgData.exifData.GPS as IExifElement);
    }

    selectedTabChange(tabIndex: number): void {
        this.tabIndex = tabIndex;
        if (this.isMapTabSelected) {
            setTimeout(() => this.mapComponent.invalidateSize());
        }
    }

    clear(): void {
        this.form.reset();
    }

    save(formData: ExifFormData): void {
        this.patchExif(formData);
        this.exifService
            .saveExif(this.imageUrl, formData.name, this.imgData.exifData)
            .subscribe((blob) => this.downloadImage(blob, formData.name));
    }

    private downloadImage(blob: Blob, fileName: string): void {
        this.imageService.downloadImage(blob, fileName);
        this.toastService.open('Edited exif was successfully saved!', 'success');
        this.router.navigate(['/']);
    }

    private initForm(): void {
        this.form.controls.name.setValue(this.imageName);
        this.form.controls.dateTime.setValue(this.imgData.dateTimeOriginal);
        this.form.controls.focal.setValue(this.imgData.focal);
        this.form.controls.exposure.setValue(this.imgData.exposure);
        this.form.controls.author.setValue(this.imgData.author);
        this.form.controls.imageDescription.setValue(this.imgData.imageDescription);
        this.form.controls.copyright.setValue(this.imgData.copyright);
        this.form.controls.cameraBrand.setValue(this.imgData.cameraMake);
        this.form.controls.cameraModel.setValue(this.imgData.cameraModel);
    }

    private patchExif(formData: ExifFormData): void {
        this.imgData.dateTimeOriginal = formData.dateTime;
        if (!!this.imgData.isGpsDataDefined) {
            this.coordinatesService.calculateExifGPSLongitude(
                this.imgData.exifData.GPS as IExifElement,
                this.gpsCoordinates,
            );
            this.coordinatesService.calculateExifGPSLatitude(
                this.imgData.exifData.GPS as IExifElement,
                this.gpsCoordinates,
            );
        }
        this.imgData.name = formData.name;
        this.imgData.focal = formData.focal?.toString() ?? '';
        this.imgData.exposure = formData.exposure?.toString() ?? '';
        this.imgData.author = formData.author ?? '';
        this.imgData.imageDescription = formData.imageDescription ?? '';
        this.imgData.copyright = formData.copyright ?? '';
        this.imgData.cameraMake = formData.cameraBrand ?? '';
        this.imgData.cameraModel = formData.cameraModel ?? '';
    }
}
