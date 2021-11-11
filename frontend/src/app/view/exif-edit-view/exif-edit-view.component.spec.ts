import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExifEditViewComponent } from './exif-edit-view.component';

describe('ExifEditViewComponent', () => {
    let component: ExifEditViewComponent;
    let fixture: ComponentFixture<ExifEditViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExifEditViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExifEditViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
