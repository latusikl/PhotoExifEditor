import { Component, HostBinding, OnInit } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent implements OnInit {
    isActive = false;
    image: File | undefined;

    @HostBinding('class')
    class = 'flex-stretch';

    constructor(private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageService.image.pipe().subscribe((img) => this.selectImage(img));
    }

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!!event.dataTransfer) {
            this.imageService.checkFile(event.dataTransfer.files[0]);
        }
        this.isActive = false;
    }

    onSelectedFile(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (!!target.files && target.files.length > 0) {
            this.imageService.checkFile(target.files[0]);
        }
    }

    private selectImage(img: File | undefined): void {
        this.image = img;
    }
}
