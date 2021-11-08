import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifModalComponent } from './exif-modal.component';

describe('ExifModalComponent', () => {
    let component: ExifModalComponent;
    let fixture: ComponentFixture<ExifModalComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExifModalComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExifModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
