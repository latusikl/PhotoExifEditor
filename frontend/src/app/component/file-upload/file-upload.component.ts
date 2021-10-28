import { Component } from '@angular/core';

@Component({
    selector: 'file-upload',
    templateUrl: './file-upload.component.html',
    styleUrls: ['./file-upload.component.scss'],
})
export class FileUploadComponent {
    isActive = false;
    image: File | undefined;

    onDrop(event: DragEvent): void {
        event.preventDefault();
        event.stopPropagation();
        if (!!event.dataTransfer) {
            this.checkFile(event.dataTransfer.files[0]);
        }
        this.isActive = false;
    }

    onSelectedFile(event: Event): void {
        const target = event.target as HTMLInputElement;
        if (!!target.files && target.files.length > 0) {
            this.checkFile(target.files[0]);
        }
    }

    private selectImage(img: File): void {
        this.image = img;
    }

    private checkFile(file: File): void {
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
                }
            }
        };
        const blob = file.slice(0, 4);
        filereader.readAsArrayBuffer(blob);
    }
}
