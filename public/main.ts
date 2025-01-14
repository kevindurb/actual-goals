import { URLPattern } from 'urlpattern-polyfill';
import './actual-goals-app.js';

// @ts-ignore: Property 'UrlPattern' does not exist
globalThis.URLPattern = URLPattern;
