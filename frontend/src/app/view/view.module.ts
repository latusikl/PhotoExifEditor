import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { HomeViewComponent } from './home-view/home-view.component';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [CommonModule, RouterModule, MatButtonModule, ComponentModule],
})
export class ViewModule {}
