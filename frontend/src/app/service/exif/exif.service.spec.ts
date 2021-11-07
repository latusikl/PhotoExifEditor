import { TestBed } from '@angular/core/testing';

import { ExifService } from './exif.service';

describe('ExifService', () => {
    let service: ExifService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(ExifService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
