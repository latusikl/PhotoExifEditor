import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [CommonModule, RouterModule, ComponentModule, MatButtonModule, MatDialogModule],
})
export class ViewModule {}
