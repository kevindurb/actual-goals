import { URLPattern } from 'urlpattern-polyfill';
import '@material/web/all.js';

import './elements/ag-header.ts';
import './actual-goals-app.js';

// @ts-ignore: Property 'UrlPattern' does not exist
globalThis.URLPattern = URLPattern;
