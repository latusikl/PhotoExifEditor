import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ImageService } from 'src/app/service/image/image.service';

@Component({
    selector: 'app-home-view',
    templateUrl: './home-view.component.html',
    styleUrls: ['./home-view.component.scss'],
})
export class HomeViewComponent implements OnInit, OnDestroy {
    @HostBinding('class')
    class = 'view';

    image!: File | undefined;
    imageUrl!: string;

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
