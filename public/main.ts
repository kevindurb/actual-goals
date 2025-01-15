import { URLPattern } from 'urlpattern-polyfill';
import '@material/web/all.js';
import { styles as typescaleStyles } from '@material/web/typography/md-typescale-styles.js';

import './actual-goals-app.js';

// @ts-ignore: Property 'UrlPattern' does not exist
globalThis.URLPattern = URLPattern;
document.adoptedStyleSheets.push(typescaleStyles.styleSheet!);
