import {sleep} from 'k6';
import http from 'k6/http';
import {check} from 'k6';

export const options = {
  stages: [
    {duration: '1m30s', target: 100},
    {duration: '10m', target: 100},
    {duration: '3m', target: 0},
  ],
  discardResponseBodies: true,
};

const remoteUrl = 'https://photo-exif-backend.herokuapp.com';
const localUrl = 'http://localhost:3000';

const baseUrl = !!__ENV.REMOTE ? remoteUrl : localUrl;


const bodyValue = JSON.parse(open('../samples/write-body.json'));
const body = JSON.stringify(bodyValue);

const httpParams = {
  headers: {
    'Content-Type': 'application/json',
  },
};


/**
 * Performance test responsible to stress testing writing exif functionality.
 */
export default function() {
  const res = http.post(`${baseUrl}/exif/write`, body, httpParams);
  check(res, {
    'Status is 200': (r) => r.status === 200,
    'Content type is image': (r) => r.headers['Content-Type'] === 'image/jpeg',
  });
  sleep(0.5);
}
