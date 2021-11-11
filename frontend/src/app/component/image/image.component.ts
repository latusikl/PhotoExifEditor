import { Component, Input } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
    constructor(private imageService: ImageService) {}

    @Input()
    imageUrl!: string;

    @Input()
    imageName!: string;

    @Input()
    showButtons = true;

    deleteImg(): void {
        this.imageService.deleteImage();
    }
}
