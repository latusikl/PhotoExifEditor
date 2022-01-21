import http from 'k6/http';
import {check, group, sleep} from 'k6';

export const options = {
  vus: 150,
  duration: '10m',
};

const backendRemoteUrl = 'https://photo-exif-backend.herokuapp.com';
const backendLocalUrl = 'http://localhost:3000';

const backendBaseUrl = !!__ENV.REMOTE ? backendRemoteUrl : backendLocalUrl;

const localFrontendUrl = 'http://localhost:4200';
const deployedFrontendUrl = 'https://photo-exif-editor.netlify.app';

const frontendBaseUrl = !!__ENV.REMOTE ? deployedFrontendUrl : localFrontendUrl;


const imgForExifReadContent = open('../samples/img-encoded.txt');
const exifReadBody = JSON.stringify({'imgUrl': imgForExifReadContent});

const exifWriteBodyValue = JSON.parse(open('../samples/write-body.json'));
const exifWriteBody = JSON.stringify(exifWriteBodyValue);


const websiteEnterParams = {
  tags: {
    name: 'website',
  },
};

const readExifParams = {
  headers: {
    'Content-Type': 'application/json',
  },
  tags: {
    name: 'readExif',
  },
};

const writeExifParams = {
  headers: {
    'Content-Type': 'application/json',
  },
  tags: {
    name: 'website',
  },
};


const SLEEP_DURATION = 0.5;

/**
 * Performance test for full usage scenario.
 * Test consist of 3 requests:
 * 1. Open web page.
 * 2. Read EXIF data.
 * 3. Write EXIF data.
 */
export default function() {
  group('User EXIF edition journey', () => {
    const openWebsiteResponse = http.get(frontendBaseUrl, websiteEnterParams);
    check(openWebsiteResponse, {
      'is status 200': (r) => r.status === 200,
      'is title returned in website': (r) => r.html().find('head title').text() === 'exif editor',
    });

    sleep(SLEEP_DURATION);

    const readExifResponse = http.post(`${backendBaseUrl}/exif/read`, exifReadBody, readExifParams);
    check(readExifResponse, {
      'Status is 200': (r) => r.status === 200,
      'Body contains decoded EXIF': (r) => {
        const basicExif = r.json()['0th'];
        return basicExif['271'] === 'Canon' && basicExif['272'] === 'Canon DIGITAL IXUS 400';
      },
    });

    sleep(SLEEP_DURATION);

    const writeExifResponse = http.post(`${backendBaseUrl}/exif/write`, exifWriteBody, writeExifParams);
    check(writeExifResponse, {
      'Status is 200': (r) => r.status === 200,
      'Content type is image': (r) => r.headers['Content-Type'] === 'image/jpeg',
    });

    sleep(SLEEP_DURATION);
  });
}


