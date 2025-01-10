import { URLPattern } from 'urlpattern-polyfill';
// @ts-ignore: Property 'UrlPattern' does not exist
globalThis.URLPattern = URLPattern;

import './actual-goals-app.js';
