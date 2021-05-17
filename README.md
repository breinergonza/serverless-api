# Proyecto Serverless con Firebase.

Proyecto de ejemplo con functions y host en firebase.

## Pasos para la ejecución del proyecto

Agregar variables de sesión para la cadena de conexión a Mongo:

```
firebase functions:config:set mongo.username=<<usuario>>
```

```
firebase functions:config:set mongo.password=<<password>>
```

```
firebase functions:config:set mongo.host=<<host>>
```

Para ejecutar el proyecto nos ubicamos en la carpeta /functions  

```
yarn serve
```

Para desplegar el proyecto ejecutamos:

```
firebase deploy
```