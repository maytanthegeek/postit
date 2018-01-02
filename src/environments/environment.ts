// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  firebase: {
    apiKey: "AIzaSyBkRcohiVSiPgkh4W5wh1msbpf9B_9cahU",
    authDomain: "mypostcomment-bd3c4.firebaseapp.com",
    databaseURL: "https://mypostcomment-bd3c4.firebaseio.com",
    projectId: "mypostcomment-bd3c4",
    storageBucket: "mypostcomment-bd3c4.appspot.com",
    messagingSenderId: "798882255066"
  }
};
