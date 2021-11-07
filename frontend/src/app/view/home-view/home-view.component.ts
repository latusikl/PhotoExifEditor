import { Component, HostBinding } from '@angular/core';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent {
    @HostBinding('class')
    class = 'view';

    image!: File | undefined;
    imageUrl!: string;

    constructor(private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageService.image.subscribe((img) => {
            this.image = img;
        });
        this.imageService.url.subscribe((url) => {
            this.imageUrl = url;
        });
    }
}
