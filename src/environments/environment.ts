// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  adsense: {
    adClient: 'ca-pub-2064593657160416',
    show: true
  },
  firebase: {
    projectId: 'fantasybl-stats',
    appId: '1:158019324122:web:d98497c332adeb3f44fde3',
    databaseURL: 'https://fantasybl-stats.firebaseio.com',
    storageBucket: 'fantasybl-stats.appspot.com',
    locationId: 'europe-west',
    apiKey: 'AIzaSyD8SNLjMn7YsTbc7i8UfXdcYBpsROXRR4Q',
    authDomain: 'fantasybl-stats.firebaseapp.com',
    messagingSenderId: '158019324122',
    measurementId: 'G-FXCC144YHB'
  },
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyD8SNLjMn7YsTbc7i8UfXdcYBpsROXRR4Q',
    authDomain: 'fantasybl-stats.firebaseapp.com',
    databaseURL: 'https://fantasybl-stats.firebaseio.com',
    projectId: 'fantasybl-stats',
    storageBucket: 'fantasybl-stats.appspot.com',
    messagingSenderId: '158019324122',
    appId: '1:158019324122:web:d98497c332adeb3f44fde3'
  },
  linkPreviewApiKey: 'c38748f735036b3fc5ee5cd3612f9171'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
