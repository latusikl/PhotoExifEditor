import * as fs from "fs";
import express from "express";
import {isImageOk, readImage, writeImageExif} from "../serice/exif-service.js";
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

export default () => {
    const router = express.Router({
        caseSensitive: true,
    })

    router.post('/read', (req, res) => {
        const img = req.body?.imgUrl;
        if (isImageOk(img)) {
            try {
                const exif = readImage(img);
                return res.status(200).json(exif);
            } catch (e) {
                return res.status(400).json({message: e.message});
            }
        }
        return res.status(400).json({message: 'Invalid image'});
    });

    router.post('/write', async (req, res) => {
        const {imgUrl: img, exifData, name} = req.body;
        if (isImageOk(img)) {
            try {
                const {path, imgUuid} = await writeImageExif(exifData, img, name);
                return res.sendFile(path, {root: __dirname}, () =>
                    fs.rmdirSync(imgUuid, {recursive: true, force: true}),
                );
            } catch (e) {
                return res.status(400).json({message: e.message});
            }
        }
        return res.status(400).json({message: 'Invalid data'});
    });

    return router;
}
