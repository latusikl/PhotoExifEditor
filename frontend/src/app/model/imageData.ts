import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { TagValues } from './piexif-types/constants';
import { ExifFieldNames, IExif, IExifElement } from './piexif-types/interfaces';

dayjs.extend(customParseFormat);

type TagValue = string | number | number[] | number[][] | null;
export type ExifTag = keyof typeof TagValues.ExifIFD;
export type GpsTag = keyof typeof TagValues.GPSIFD;
export type ImageTag = keyof typeof TagValues.ImageIFD;

export class ImageData {
    constructor(public name: string, public exifData: IExif) {}

    private readonly FRACTION_NUMBERS = 4;

    private getImageAttribute0(imageTag: ImageTag): TagValue {
        const imageData = this.getExifElement('0th');
        return imageData[TagValues.ImageIFD[imageTag]];
    }

    private setImageAttribute0(imageTag: ImageTag, value: TagValue): void {
        if (!!value) {
            const imageData = this.getExifElement('0th');
            imageData[TagValues.ImageIFD[imageTag]] = value;
        }
    }

    private getImageAttribute1(exifTag: ImageTag): TagValue {
        const imageData = this.getExifElement('1st');
        return imageData[TagValues.ImageIFD[exifTag]];
    }

    private setImageAttribute1(imageTag: ImageTag, value: TagValue): void {
        if (!!value) {
            const imageData = this.getExifElement('1st');
            imageData[TagValues.ImageIFD[imageTag]] = value;
        }
    }

    private getExifElement(key?: ExifFieldNames): IExifElement {
        switch (key) {
            case '1st':
                return (this.exifData['1st'] = this.exifData['1st'] ?? {});
            case '0th':
                return (this.exifData['0th'] = this.exifData['0th'] ?? {});
            default:
                return (this.exifData.Exif = this.exifData.Exif ?? {});
        }
    }

    private getExifAttribute(exifTag: ExifTag): TagValue {
        const exifData = this.getExifElement();
        return exifData[TagValues.ExifIFD[exifTag]];
    }

    private setExifAttribute(exifTag: ExifTag, value: TagValue): void {
        if (!!value) {
            const exif = (this.exifData.Exif = this.exifData.Exif ?? {});
            exif[TagValues.ExifIFD[exifTag]] = value;
        }
    }

    private getExifRealValue(exifTag: ExifTag): string {
        const spec = this.getExifAttribute(exifTag) as number[];
        if (spec && spec[1] !== 0) return (spec[0] / spec[1]).toFixed(this.FRACTION_NUMBERS);
        return '';
    }

    private setExifRealValue(exifTag: ExifTag, value: string): void {
        value
            ? this.setExifAttribute(exifTag, this.toIrreducibleOrdinaryFraction(value))
            : this.setExifAttribute(exifTag, null);
    }

    private toIrreducibleOrdinaryFraction(value: string): [number, number] {
        const exponent = value.indexOf('.') !== -1 ? value.trim().split('.')[1].length : value.length;
        const denominator = Math.pow(10, exponent);
        const numerator = Math.floor(Number(value) * denominator);
        const greatestCommonDivisor = this.greatestCommonDivisor(denominator, numerator);

        return [numerator / greatestCommonDivisor, denominator / greatestCommonDivisor];
    }

    private greatestCommonDivisor(a: number, b: number): number {
        let greatestCommonDivisor = 1;
        while (b !== 0) {
            greatestCommonDivisor = b;
            b = a % b;
            a = greatestCommonDivisor;
        }
        return greatestCommonDivisor;
    }

    private getGpsAttribute(gpsTag: GpsTag): TagValue {
        const gpsData = this.exifData?.GPS;
        return gpsData?.[TagValues.GPSIFD[gpsTag]] ?? null;
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

    get focal(): string {
        return this.getExifRealValue('FocalLength');
    }

    set focal(focal: string) {
        this.setExifRealValue('FocalLength', focal);
    }

    get exposure(): string {
        return this.getExifRealValue('ExposureTime');
    }

    set exposure(exposure: string) {
        this.setExifRealValue('ExposureTime', exposure);
    }

    get longitudeRef(): string {
        const value = this.getGpsAttribute('GPSLongitudeRef');
        return value ? String(value) : '';
    }

    get longitude(): string {
        const value = this.getGpsAttribute('GPSLongitude');
        return value ? String(value) : '';
    }

    get latitudeRef(): string {
        const value = this.getGpsAttribute('GPSLatitudeRef');
        return value ? String(value) : '';
    }

    get latitude(): string {
        const value = this.getGpsAttribute('GPSLatitude');
        return value ? String(value) : '';
    }

    get imageDescription(): string {
        return (this.getImageAttribute0('ImageDescription') as string) ?? '';
    }

    set imageDescription(value: string) {
        this.setImageAttribute0('ImageDescription', value);
    }

    get copyright(): string {
        return (this.getImageAttribute0('Copyright') as string) ?? '';
    }

    set copyright(value: string) {
        this.setImageAttribute0('Copyright', value);
    }

    get author(): string {
        return (this.getImageAttribute0('Artist') as string) ?? '';
    }

    set author(value: string) {
        this.setImageAttribute0('Artist', value);
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

    get isGpsDataDefined(): boolean {
        return !!this.exifData.GPS && Object.keys(this.exifData.GPS).length > 0;
    }
}
