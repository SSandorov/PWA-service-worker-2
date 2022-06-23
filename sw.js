// Ciclo de vida del SW

/*
Como está comentado en el app.js, cuando se registra por primera vez un service worker,
este se descarga, instala y activa
Y en cada uno de estos momentos, se puede crear un evento que maneje la información del
proceso
*/

// evento que maneja la instalación del sw
self.addEventListener('install', event => {
    /*
    Durante el proceso de instalación se llevan a cabo tareas como:
        - Descargar los archivos que componen mi aplicación
        - Creamos un caché
    */
    // cada vez que haya un cambio en el service worker, se instalará un sw nuevo 
    console.log('Se instaló el SW');

    // para que la activación del sw surta efecto inmediatamente sin que el usuario
    // tenga que recargar la página, escribimos el siguiente código en la instalación
    // es importante saber que son buenas prácticas el no hacer esto
    // self.skipWaiting();

    /*
    Por desgracia, cuando se instala el sw, inmediatamente despúes se puede activar el sw,
    para evitar errores en caso de que hayan instalaciones pendientes después de la 
    activación del sw, empleamos el event.waitUntil(). Es importante saber que este método
    recibe una promesa
    
    Para poder comprobar esta situación, empleamos un setTimeOut() que hace el efecto de
    instalación pendiente. Cuando esto sucede sin el waitUntil(), la activación sucede antes
    de que el setTimeOut() termine. Pero de esta manera podemos manejar el desfase
    */
    const instAdicional = new Promise((res, rej) => {
        setTimeout(() => {
            console.log('SW: Instalaciones terminadas');
            self.skipWaiting();
            res();
        }, 1000)
    }); 

    event.waitUntil(instAdicional);
})

// evento que maneja la activación del sw
// la activación supone el momento en el que el sw toma el control de la página web
self.addEventListener('activate', event => {
    /*
    Durante el proceso de activación se llevan a cabo tareas como:
        - Borrar el caché viejo
    */
    console.log('Se activó el sw');
});


/* 
Evento para manejar las peticiones HTTP

Este evento intercepta todo tipo de peticiones
    - Archivos (css, html, ...)
    - Imágenes y vídeos
    - APIs externas
*/
self.addEventListener('fetch', event => {
    // Con el event.request recibimos todas las peticiones interceptadas
    /*
    Con el evento fetch se busca manejar las estrategias del almacenamiento de la
    información en el caché

    En él decidimos que información guardamos y que información eliminamos. También
    elegimos que usuarios pueden entrar o no dependiendo de la información que pidan
    */
    console.log('SW: ', event.request.url);

    // esto es un ejemplo de como se maneja la intercepción de las peticiones
    if(event.request.url.includes('https://reqres.in/')) {
        const resp = new Response(`
        {
            ok: false,
            mensaje: perfecto
        }`)
        // es importante el uso del respondWith, porque es la manera en la que modificamos
        // la respuesta de la petición
        // esta respuesta está enlazada a la petición fetch del app.js a la API
        event.respondWith(resp);
    }
});