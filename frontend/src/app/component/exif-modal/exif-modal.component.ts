import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { IExif } from '../../model/piexif-types/interfaces';
import { ExifService } from '../../service/exif/exif.service';
import { ImageService } from '../../service/image/image.service';

@Component({
    selector: 'exif-modal',
    templateUrl: './exif-modal.component.html',
    styleUrls: ['./exif-modal.component.scss'],
})
export class ExifModalComponent implements OnInit {
    exifData!: IExif;
    imgUrl!: string;

    constructor(
        private exifService: ExifService,
        private imageService: ImageService,
        private dialogRef: MatDialogRef<ExifModalComponent>,
    ) {}

    ngOnInit(): void {
        this.imgUrl = this.imageService.url.getValue();
        this.exifService.getExif(this.imgUrl).subscribe((exifData) => (this.exifData = exifData));
    }

    closeDialog(): void {
        this.dialogRef.close(true);
    }
}
