// ntoifcation locale 
/*self.addEventListener('notificationclick', function(e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    clients.openWindow('https://newstorciiot.bss.design/');
  }
});
 navigator.serviceWorker.ready.then(reg =>{
     reg.pushManager.getSubcription().then(sub =>{
         if(sub == undefined){
             
         }
     })
 })*/

//push per server
let baseURL = window.location.protocol + "//" + window.location.host;
let image = baseURL + "/assets/img/Storci_Logo_1024_1024.png"
self.addEventListener('push', function(e) {
  var options = {
    body: 'This notification was generated from a push!',
    icon: 'images/example.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2'
    },
    actions: [
      {action: 'explore', title: 'Explore this new world',
        icon: image },
      {action: 'close', title: 'Close',
        icon: 'images/xmark.png'},
    ]
  };
  e.waitUntil(
    self.registration.showNotification('Hello world!', options)
  );
});