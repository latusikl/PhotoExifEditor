import piexif from "piexifjs"
import {v4} from "uuid";
import fs from "fs";
import * as path from "path";


const fsPromises = fs.promises;



export function isImageOk(img){
    return !!img && img.includes('image/jpeg');
}

export function readImage(img){
    return piexif.load(img);
}

export async function writeImageExif(exifData, img, name){
    const newExifBinary = piexif.dump(exifData);
    const imageBinaryWithoutExif = piexif.remove(img);
    const newBinaryImage = piexif.insert(
        newExifBinary,
        imageBinaryWithoutExif,
    );
    const imgUuid = v4();
    await fsPromises.mkdir(imgUuid);
    const pathValue = path.join(process.cwd(),imgUuid,name);
    const base64 = newBinaryImage.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    await fsPromises.writeFile(pathValue, base64, 'base64');
    return {pathValue: pathValue, imgUuid: imgUuid};
}
