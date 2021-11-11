import { Component, OnInit } from '@angular/core';
import { IExif } from '../../model/piexif-types/interfaces';
import { ExifService } from '../../service/exif/exif.service';
import { ImageService } from '../../service/image/image.service';

@Component({
    selector: 'exif-edit',
    templateUrl: './exif-edit.component.html',
    styleUrls: ['./exif-edit.component.scss'],
})
export class ExifEditComponent implements OnInit {
    exifData!: IExif;
    imageUrl!: string;
    imageName!: string;

    constructor(private exifService: ExifService, private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageUrl = this.imageService.url.getValue();
        this.imageName = this.imageService.image.getValue()?.name ?? '';
        this.exifService.getExif(this.imageUrl).subscribe((exifData) => (this.exifData = exifData));
    }
}
