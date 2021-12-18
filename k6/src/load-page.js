import http from 'k6/http';
import {sleep} from 'k6';
import {check} from 'k6';


const localFrontendUrl = 'http://localhost:4200';
const deployedFrontendUrl = 'https://photo-exif-editor.netlify.app';
const baseUrl = !!__ENV.REMOTE ? deployedFrontendUrl : localFrontendUrl;

export const options = {
  stages: [
    {duration: '1m30s', target: 100},
    {duration: '10m', target: 100},
    {duration: '3m', target: 0},
  ],
};

/** *
 * Performance test that check the frontend page loading.
 * The number of users grows over specified time,
 * then it settles on specified level for longer period and lowers to 0.
 * Additional checks:
 * Status validation.
 * Page title validation.
 */
export default function() {
  const res = http.get(baseUrl);
  const doc = res.html();
  const pageTitle = doc.find('head title').text();

  check(res, {
    'Status is 200': (r) => r.status === 200,
  });
  check(pageTitle, {
    'Page title is returned': (st) => st === 'exif editor',
  });

  sleep(0.5);
}
