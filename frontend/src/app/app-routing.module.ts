import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExifEditComponent } from './component/exif-edit/exif-edit.component';
import { ExifEditGuard } from './guard/exif-edit.guard';
import { HomeViewComponent } from './view/home-view/home-view.component';

const routes: Routes = [
    { path: '', component: HomeViewComponent },
    { path: 'exif-edit', component: ExifEditComponent, canActivate: [ExifEditGuard] },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
})
export class AppRoutingModule {}
