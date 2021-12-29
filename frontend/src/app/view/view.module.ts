import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { MatButtonModule } from '@angular/material/button';
import { ExifEditViewComponent } from './exif-edit-view/exif-edit-view.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import {
    NgxMatDatetimePickerModule,
    NgxMatNativeDateModule,
    NgxMatTimepickerModule,
} from '@angular-material-components/datetime-picker';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { ReactiveFormsModule } from '@angular/forms';
import {NgxSkeletonLoaderModule} from "ngx-skeleton-loader";

@NgModule({
    declarations: [HomeViewComponent, ExifEditViewComponent],
    imports: [
        ReactiveFormsModule,
        CommonModule,
        RouterModule,
        MatButtonModule,
        ComponentModule,
        MatTabsModule,
        MatIconModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        NgxMatDatetimePickerModule,
        NgxMatNativeDateModule,
        NgxMatTimepickerModule,
        MatDatepickerModule,
        NgxSkeletonLoaderModule
    ],
})
export class ViewModule {}
