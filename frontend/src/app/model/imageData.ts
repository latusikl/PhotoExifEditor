import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TagValues } from './piexif-types/constants';
import { IExif } from './piexif-types/interfaces';

dayjs.extend(customParseFormat);

type TagValue = string | number | number[] | number[][] | null;
export type ExifTag = keyof typeof TagValues.ExifIFD;
export type GpsTag = keyof typeof TagValues.GPSIFD;
export type ImageTag = keyof typeof TagValues.ImageIFD;

export class ImageData {
    constructor(public name: string, public exifData: IExif) {}

    private getImageAttribute0(imageTag: ImageTag): TagValue {
        const imageData = (this.exifData['0th'] = this.exifData['0th'] ?? {});
        return imageData[TagValues.ImageIFD[imageTag]];
    }

    private setImageAttribute0(imageTag: ImageTag, value: TagValue): void {
        if (!!value) {
            const imageData = (this.exifData['0th'] = this.exifData['0th'] ?? {});
            imageData[TagValues.ImageIFD[imageTag]] = value;
        }
    }

    private getImageAttribute1(exifTag: ImageTag): TagValue {
        const imageData = (this.exifData['1st'] = this.exifData['1st'] ?? {});
        return imageData[TagValues.ImageIFD[exifTag]];
    }

    private setImageAttribute1(imageTag: ImageTag, value: TagValue): void {
        if (!!value) {
            const imageData = (this.exifData['1st'] = this.exifData['1st'] ?? {});
            imageData[TagValues.ImageIFD[imageTag]] = value;
        }
    }

    private getExifAttribute(exifTag: ExifTag): TagValue {
        const exifData = (this.exifData.Exif = this.exifData.Exif ?? {});
        return exifData[TagValues.ExifIFD[exifTag]];
    }

    // eslint-disable-next-line
    private setExifAttribute(exifTag: ExifTag, value: TagValue): void {
        if (!!value) {
            const exif = (this.exifData.Exif = this.exifData.Exif ?? {});
            exif[TagValues.ExifIFD[exifTag]] = value;
        }
    }

    get dateTimeOriginal(): Date | undefined {
        const atr = this.getExifAttribute('DateTimeOriginal');
        return !!atr ? dayjs(String(atr), 'YYYY:MM:DD HH:mm:ss').toDate() : undefined;
    }

    set dateTimeOriginal(date: Date | undefined) {
        const value = date ? dayjs(date).format('YYYY:MM:DD HH:mm:ss') : null;
        this.setExifAttribute('DateTimeOriginal', value);
    }

    get pixelXDimension(): number {
        return this.getExifAttribute('PixelXDimension') as number;
    }

    set pixelXDimension(pixelXDimension: number) {
        this.setExifAttribute('PixelYDimension', pixelXDimension);
    }

    get pixelYDimension(): number {
        return this.getExifAttribute('PixelYDimension') as number;
    }

    set pixelYDimension(pixelYDimension: number) {
        this.setExifAttribute('PixelYDimension', pixelYDimension);
    }

    get isoSpeedRatings(): number {
        return this.getExifAttribute('ISOSpeedRatings') as number;
    }

    set isoSpeedRatings(isoSpeedRatings: number) {
        this.setExifAttribute('ISOSpeedRatings', isoSpeedRatings);
    }

    get cameraMake(): string {
        return this.getImageAttribute0('Make') as string;
    }

    set cameraMake(cameraMake: string) {
        this.setImageAttribute0('Make', cameraMake);
    }

    get cameraModel(): string {
        return this.getImageAttribute0('Model') as string;
    }

    set cameraModel(cameraModel: string) {
        this.setImageAttribute0('Model', cameraModel);
    }

    get editingSoftware(): string {
        return this.getImageAttribute0('Software') as string;
    }

    set editingSoftware(editingSoftware: string) {
        this.setImageAttribute0('Software', editingSoftware);
    }

    get imageOrientation(): number {
        return this.getImageAttribute1('Orientation') as number;
    }

    set imageOrientation(orientation: number) {
        this.setImageAttribute1('Orientation', orientation);
    }
}
