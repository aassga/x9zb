// import {register} from 'register-service-worker';

// if ('serviceWorker' in window.navigator && process.env.NODE_ENV === 'production') {
//   register(`${process.env.BASE_URL}service-worker.js`, {
//     ready() {
//       console.log(
//         'App is being served from cache by a service worker.\n' +
//         'For more details, visit https://goo.gl/AFskqB'
//       );
//     },
//     registered() {
//       console.log('Service worker has been registered.');
//     },
//     cached() {
//       console.log('Content has been cached for offline use.');
//     },
//     updatefound() {
//       console.log('New content is downloading.');
//     },
//     updated() {
//       document.getElementById('refresh').innerHTML = 'New content is available; please <a onclick="document.location.reload(true)">refresh to update</a>'
//       console.log('New content is available; please refresh.');
//     },
//     offline() {
//       console.log('No internet connection found. App is running in offline mode.');
//     },
//     error(error) {
//       console.error('Error during service worker registration:', error);
//     }
//   });
// }

// 注销已安装SW用户的缓存
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then((registrations) => {
    registrations.forEach(sw => sw.unregister())
  })
}