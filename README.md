# isaunal
Repositorio para almacenar un trabajo colaborativo para el desarrollo del taller de la materia de Ingeniería de Software Avanzada - ISA de la Maestria de Ingeniería de Sistemas y Computación de la Universidad Nacional de Colombia

TODOS LOS PASOS ACONTINUACIÓN SON DESDE LA VENTANA DE COMANDO DEL SISTEMA OPERATIVO DE PREFERENCIA

# Pasos para instalación

0. Instalar nodejs (https://nodejs.org/es/)
1. Hacer npm install -> para instalar todas las librería necesarias, como express, para que funcione el servidor NodeJs
2. Instalar browserify de manera global -> npm install -g browserify
3. Instalar Watchify de manera global -> npm install -g watchify
4. Instalar Gulp de manera global -> npm install gulp -g


# Pasos para ejecutar la aplicación en el servidor

0. Se debe parar en la carpeta del proyecto y ejecutar el comando npm start
1. Ir al navegador y escribir la dirección http://127.0.0.1:8080 


Otras configuraciones

No son necesarias realizarlas pero se deja como documentación para que el desarrollador se haga una idea.

# Pasos para encapsular los modulos de javascript de la logica del negocio

Como la idea es trabajar lo aproximado a clases pero con javascript por el lado del frontend, vamos a dividir el codigo en componente para asi cada desarrollador trabaja en un archivo diferente dependiendo en la caracteristica que se este desarrollando.

0. Instalado previamente browserify, se para en la carpeta del proyecto.
1. Ejecutar comando browserify app/index.js > assets/js/.main.js

Este ultimo comando encapsula todos los archivos diferentes usado en uno solo javascript que usara el cliente en el navegador
