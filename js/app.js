

// Detectar si podemos usar Service Workers
if ( navigator.serviceWorker ) {
    /*
    si puede usuar el service worker, lo registrará con el siguiente comanda que especifica
    la ruta del service worker

    Sino existe ningún service worker anterior, este comando va a
        - descargar
        - instalar
        - y activar
    el service worker

    en cada uno de estos procesos podemos añadir un evento para controlar cómo se 
    gestiona la información
    */
    navigator.serviceWorker.register('/sw.js');
}

// Al igual que el SW, podemos comprobar si nuestro buscador maneja la sincronización
// sin conexión
if  (window.SyncManager) {
    console.log('La página funciona sin conexión');
}

// También verificamos si existe la opción de las notificaciones push
if  (window.Notification) {
    // pedimos la confirmación del usuario para recibir notificaciones
    Notification.requestPermission()
    .then(result => {
        console.log(result);
    });
}

// Añadimos una petición para manejarla con el evento fetch

const usuarioUrl = 'https://reqres.in/api/users?page=2';

// Petición get
fetch(usuarioUrl)
    .then(resp => resp.text())
    .then(console.log);
