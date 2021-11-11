import { IExif } from './piexif-types/interfaces';

export interface SaveExifReqBody {
    imgUrl: string;
    exifData: IExif;
    name: string;
}
