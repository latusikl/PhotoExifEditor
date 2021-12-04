import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ToastService } from '../toast.service';

@Injectable({
    providedIn: 'root',
})
export class ImageService {
    private static FILE_SIZE_LIMIT = 50 * 1024 * 1024; // 50MiB limit
    image = new BehaviorSubject<File | undefined>(undefined);
    url = new BehaviorSubject<string>('');

    constructor(private toastService: ToastService) {}

    checkFile(file: File): void {
        if (file.size > ImageService.FILE_SIZE_LIMIT) {
            this.showTooBigImageError(file);
            return;
        }
        const filereader = new FileReader();
        filereader.onloadend = (event) => {
            if (!!event.target && event.target.readyState === FileReader.DONE) {
                const uint = new Uint8Array(event.target.result as ArrayBuffer);
                const bytes: string[] = [];
                uint.forEach((byte) => {
                    bytes.push(byte.toString(16));
                });
                const hex = bytes.join('').toUpperCase();
                if (hex === 'FFD8FFE0' || hex === 'FFD8FFDB' || hex === 'FFD8FFE1') {
                    // image/jpeg
                    this.selectImage(file);
                } else {
                    this.showInvalidImageError(file);
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

    downloadImage(img: Blob, fileName: string): void {
        const a = document.createElement('a');
        a.href = window.URL.createObjectURL(img);
        a.setAttribute('download', fileName);
        document.body.appendChild(a);
        a.click();
        a.remove();
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

    private showInvalidImageError(img: File): void {
        this.showError('Invalid image with name ' + img.name);
    }

    private showTooBigImageError(img: File): void {
        this.showError('Image ' + img.name + ' is too large. The file size can not exceed 50MiB.');
    }

    private showError(msg: string): void {
        this.toastService.open(msg, 'error');
    }
}
