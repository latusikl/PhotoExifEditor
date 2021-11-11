import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { ExifEditComponent } from './exif-edit/exif-edit.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ImageComponent } from './image/image.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';

@NgModule({
    declarations: [FileUploadComponent, ExifEditComponent, MapComponent, ImageComponent],
    imports: [CommonModule, LeafletModule, MatCardModule, MatButtonModule, RouterModule],
    exports: [FileUploadComponent, ImageComponent],
})
export class ComponentModule {}
