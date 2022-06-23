

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
