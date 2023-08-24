# PracticaIntegradora-1-Galvaliz-Aranzazu
Se alojo el proyecto dentro de una carpeta src donde encontraremos:
1. Carpeta Dao: que contendra las siguientes carpetas:
   A. Filemanagers: donde estan alojados los archivos FS en la carpeta controllers y en la segunda
   carpeta llamada db tendremos los archivos json.
   B. Models: que incluira los modelos para el carrito, los productos y los mensajes del chat.
   C. Mongomanagers: aqui estaran los managers que se utilizaran para trabajar en conjunto con los
   enrutadores para llegar a la nube de Mongodb.
   D. DataBaseM: nos encontraremos aqui con el conector a mongo.
3. Carpeta Public: esta compuesta por el siguiente contenido:
   A. Css: se encarga de los estilos de la pagina.
   B. Images: contiene el logo del cliente.
   C. Js: realtime y chat son sus componenetes.
4. Carpeta de Rutas: tendra en su interior las diferentes rutas para trabajar tanto con el chat como
   con el sector de productos y tambien los carritos activos.
6. Carpeta Views: que contiene a Layouts que engloba a main.handlebars, y por fuera estan los handlebars
   de chat, realtimeProducts y home, todos ellos dan forma a lo que vemos en la pagina al visitarla.
7. App.js: quien nos abre paso hacia la real conexion con la web, ya que aqui confluyen, express, handlebars,
   socket.io, mongodb y las diferentes rutas
8. Utils: quien aloja al _dirname.
    
