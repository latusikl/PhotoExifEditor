import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload/file-upload.component';
import { MapComponent } from './map/map.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { ImageComponent } from './image/image.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';

@NgModule({
    declarations: [FileUploadComponent, MapComponent, ImageComponent],
    imports: [
        CommonModule,
        LeafletModule,
        MatCardModule,
        MatButtonModule,
        RouterModule,
        MatTabsModule,
        MatIconModule,
        MatTooltipModule,
    ],
    exports: [FileUploadComponent, ImageComponent, MapComponent],
})
export class ComponentModule {}
