## Descargar laravel

Descargar Laravel
 sudo composer create-project laravel/laravel sce 4.0.9

Guía sencilla de git (aquí)[http://rogerdudler.github.io/git-guide/index.es.html]

## Considerar

* Ir app/config/database.php y en la linea 55 comienza el driver de mysql, configurar según su servidor
* En la carpeta public se muestran todos los archivos que son publicos para los usuarios, tales como imagenes, js, etc. por eso se crearon esas carpetas.
* Tener permisos de lectura y escritura en los archivos, y sobre todo en la carpeta app/storage
* Tener todos el mismo key (linea 68) en app/config/app.php para el uso de encriptación y demás cosas
