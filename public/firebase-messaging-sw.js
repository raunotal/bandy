importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

firebase.initializeApp({
  apiKey: 'AIzaSyAB6dzN8OfJzD9PRKV_tJuoDzZ80Dh1hVM',
  authDomain: 'bandy-773bf.firebaseapp.com',
  projectId: 'bandy-773bf',
  storageBucket: 'bandy-773bf.appspot.com',
  messagingSenderId: '150029715162',
  appId: '1:150029715162:web:39fd01cb68e4e0825587e3',
  measurementId: 'G-WYXZ5TSBKP',
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
