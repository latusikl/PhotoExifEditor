import { Component, HostBinding, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { Router } from '@angular/router';
import { LatLng } from 'leaflet';
import { MapComponent } from 'src/app/component/map/map.component';
import { ExifFormData } from 'src/app/model/exifFormData';
import { CoordinatesService } from 'src/app/service/coordinates.service';
import { ToastService } from 'src/app/service/toast.service';
import { ImageData } from '../../model/imageData';
import { ExifService } from '../../service/exif/exif.service';
import { ImageService } from '../../service/image/image.service';

@Component({
    selector: 'exif-edit-view',
    templateUrl: './exif-edit-view.component.html',
    styleUrls: ['./exif-edit-view.component.scss'],
})
export class ExifEditViewComponent implements OnInit {
    imgData!: ImageData;
    imageUrl!: string;
    imageName!: string;
    gpsCoordinates!: LatLng;

    form: FormGroup;

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
        });
    }

    ngOnInit(): void {
        this.imageUrl = this.imageService.url.getValue();
        this.imageName = this.imageService.image.getValue()?.name ?? '';
        this.exifService.getExif(this.imageUrl, this.imageName).subscribe((imgData) => {
            this.imgData = imgData;
            if (!!imgData.exifData.GPS) {
                this.gpsCoordinates = this.coordinatesService.calculateCoordinates(imgData.exifData.GPS);
            }
            this.initForm();
        });
    }

    selectedTabChange(event: MatTabChangeEvent): void {
        if (event.index === 3) {
            this.mapComponent.invalidateSize();
        }
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
    }

    private patchExif(formData: ExifFormData): void {
        this.imgData.dateTimeOriginal = formData.dateTime;
        // TODO more exif data
    }
}
