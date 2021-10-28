import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { RouterModule } from '@angular/router';
import { ComponentModule } from '../component/component.module';
import { HomeViewComponent } from './home-view/home-view.component';

@NgModule({
    declarations: [HomeViewComponent],
    imports: [CommonModule, MatPaginatorModule, RouterModule, ComponentModule],
})
export class ViewModule {}
