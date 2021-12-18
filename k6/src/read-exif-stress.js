import {sleep} from 'k6';
import http from 'k6/http';
import {check} from 'k6';

export const options = {
  stages: [
    {duration: '1m30s', target: 100},
    {duration: '10m', target: 100},
    {duration: '3m', target: 0},
  ],
};

const remoteUrl = 'https://photo-exif-backend.herokuapp.com';
const localUrl = 'http://localhost:3000';

const baseUrl = !!__ENV.REMOTE ? remoteUrl : localUrl;


const fileContentEncoded = open('../samples/img-encoded.txt');
const body = JSON.stringify({'imgUrl': fileContentEncoded});

const httpParams= {
  headers: {
    'Content-Type': 'application/json',
  }};

/**
 * Performance test responsible to stress testing reading exif functionality.
 */
export default function() {
  const response = http.post(`${baseUrl}/exif/read`, body, httpParams);
  check(response, {
    'Status is 200': (r) => r.status === 200,
    'Body contains decoded EXIF': (r) => {
      const basicExif = r.json()['0th'];
      return basicExif['271'] === 'Canon' && basicExif['272'] === 'Canon DIGITAL IXUS 400';
    },
  });
  sleep(0.5);
}
