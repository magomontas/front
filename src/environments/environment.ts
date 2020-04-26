// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // Configuracion necesaria para usar firebase
  firebaseConfig: {
    apiKey: 'AIzaSyARyr7qSkxtxsrjCFCXyx3fXCP-iJAUsq4',
    authDomain: 'test-img-a2502.firebaseapp.com',
    databaseURL: 'https://test-img-a2502.firebaseio.com',
    projectId: 'test-img-a2502',
    storageBucket: 'test-img-a2502.appspot.com',
    messagingSenderId: '187104246240',
    appId: '1:187104246240:web:7635bd27e03f32b9829385',
    measurementId: 'G-JBP4WNH47X'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
