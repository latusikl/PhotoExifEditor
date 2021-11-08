import { Component, HostBinding, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { ExifModalComponent } from 'src/app/component/exif-modal/exif-modal.component';
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

    constructor(private imageService: ImageService, private dialog: MatDialog) {}

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

    deleteImg(): void {
        this.imageService.deleteImage();
    }

    editExif(): void {
        this.dialog
            .open(ExifModalComponent, { disableClose: true })
            .afterClosed()
            .subscribe((result) => this.afterEditClosed(result));
    }

    private afterEditClosed(result: boolean): void {
        if (result) {
            console.log('udalo sei');
        }
    }
}
