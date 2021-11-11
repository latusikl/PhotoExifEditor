import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit, OnDestroy {
    image!: File | undefined;
    imageUrl!: string;

    @HostBinding('class')
    private class = 'view';

    private imageSub = Subscription.EMPTY;
    private imgUrlSub = Subscription.EMPTY;

    constructor(private imageService: ImageService) {}

    ngOnInit(): void {
        this.imageSub = this.imageService.image.subscribe((img) => {
            this.image = img;
        });
        this.imgUrlSub = this.imageService.url.subscribe((url) => {
            this.imageUrl = url;
        });
    }

    ngOnDestroy(): void {
        this.imageSub.unsubscribe();
        this.imgUrlSub.unsubscribe();
    }

    get imageName(): string {
        return this.image?.name ?? '';
    }
}
