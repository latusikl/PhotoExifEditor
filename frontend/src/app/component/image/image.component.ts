import { Component, HostBinding, Input } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'image',
    templateUrl: './image.component.html',
    styleUrls: ['./image.component.scss'],
})
export class ImageComponent {
    @Input()
    imageUrl!: string;

    @Input()
    imageName!: string;

    @Input()
    showButtons = true;

    @HostBinding('class')
    class = 'flex-stretch';

    constructor(private imageService: ImageService) {}

    deleteImg(): void {
        this.imageService.deleteImage();
    }
}
