importScripts('https://www.gstatic.com/firebasejs/8.10.1/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.1/firebase-messaging.js'
);

const firebaseConfig = {
  apiKey: 'AIzaSyAB6dzN8OfJzD9PRKV_tJuoDzZ80Dh1hVM',
  authDomain: 'bandy-773bf.firebaseapp.com',
  projectId: 'bandy-773bf',
  storageBucket: 'bandy-773bf.appspot.com',
  messagingSenderId: '150029715162',
  appId: '1:150029715162:web:39fd01cb68e4e0825587e3',
  measurementId: 'G-WYXZ5TSBKP',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();

messaging.onBackgroundMessage(messaging, (payload) => {
  console.log(
    '[firebase-messaging-sw.js] Received background message ',
    payload
  );
  // Customize notification here
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
    icon: payload.notification.icon,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});


// TODO: Add event listener for notification click
// self.addEventListener('notificationclick', function(event) {
//   event.notification.close(); // Close the notification

//   // Open the URL or focus if already opened
//   event.waitUntil(
//     clients.matchAll({ type: 'window' }).then(clientList => {
//       for (var i = 0; i < clientList.length; i++) {
//         var client = clientList[i];
//         if (client.url === event.notification.data.url && 'focus' in client)
//           return client.focus();
//       }
//       if (clients.openWindow)
//         return clients.openWindow(event.notification.data.url);
//     })
//   );
// });
