import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifEditComponent } from './exif-edit.component';

describe('ExifEditComponent', () => {
    let component: ExifEditComponent;
    let fixture: ComponentFixture<ExifEditComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExifEditComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExifEditComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
