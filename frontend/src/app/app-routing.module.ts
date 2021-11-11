import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExifEditViewComponent } from './view/exif-edit-view/exif-edit-view.component';
import { ExifEditGuard } from './guard/exif-edit.guard';
import { HomeViewComponent } from './view/home-view/home-view.component';

const routes: Routes = [
    { path: '', component: HomeViewComponent },
    { path: 'exif-edit', component: ExifEditViewComponent, canActivate: [ExifEditGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
