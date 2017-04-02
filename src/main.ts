import 'core-js';
import 'reflect-metadata';
import 'zone.js/dist/zone';

import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
//import { platformBrowser } from '@angular/platform-browser'

import { AppModule } from './app/app.module'

console.log('app.environment: ', app.environment);
if(app.environment === 'production') {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule).catch(err => console.error(err));
