import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ExifModalComponent } from './exif-modal/exif-modal.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
    declarations: [FileUploadComponent, ExifModalComponent, MapComponent],
    imports: [CommonModule, LeafletModule],
    exports: [FileUploadComponent],
})
export class ComponentModule {}
