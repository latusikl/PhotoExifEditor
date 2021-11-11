import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../toast.service';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    image = new BehaviorSubject<File | undefined>(undefined);
    url = new BehaviorSubject<string>('');

    constructor(private toastService: ToastService) {}

    checkFile(file: File): void {
        const filereader = new FileReader();
        filereader.onloadend = (event) => {
            if (!!event.target && event.target.readyState === FileReader.DONE) {
                const uint = new Uint8Array(event.target.result as ArrayBuffer);
                const bytes: string[] = [];
                uint.forEach((byte) => {
                    bytes.push(byte.toString(16));
                });
                const hex = bytes.join('').toUpperCase();
                if (hex === 'FFD8FFE0' || hex === 'FFD8FFDB') {
                    // image/jpeg
                    this.selectImage(file);
                } else {
                    this.showError(file);
                }
            }
        };
        const blob = file.slice(0, 4);
        filereader.readAsArrayBuffer(blob);
    }

    deleteImage(): void {
        this.image.next(undefined);
        this.url.next('');
    }

    get isImageLoaded(): boolean {
        return !!this.image.getValue() && !!this.url.getValue();
    }

    private readUrl(file: File) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const url = event.target?.result as string;
            this.url.next(url);
        };

        reader.readAsDataURL(file);
    }

    private selectImage(img: File): void {
        this.image.next(img);
        this.readUrl(img);
    }

    private showError(img: File): void {
        const msg = 'Invalid image with name ' + img.name;
        this.toastService.open(msg, 'error');
    }
}
