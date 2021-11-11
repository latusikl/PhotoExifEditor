import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { ImageService } from '../service/image/image.service';

@Injectable({
    providedIn: 'root',
})
export class ExifEditGuard implements CanActivate {
    constructor(private imageService: ImageService, private router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        const canActivate = !!this.imageService.isImageLoaded;
        if (!canActivate) {
            this.goToHome();
        }
        return !!this.imageService.isImageLoaded;
    }

    private goToHome(): void {
        this.router.navigate(['/']);
    }
}
