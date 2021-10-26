# store-payment

Simple aplicacion que se comunica con el sistema de pagos Mobbex. Decidi hacerle un frontend muy simple para poder hacer una compra y redireccionar al usuario despues de pagar.

## Levantar el proyecto

Primero hay que completar los datos sensibles en la carpeta config como el nombre de la DB, la conexion con la misma, las credenciales de Mobbex y la url de la pagina provisto por ngrok y luego renombrar el archivo sacando el .example.

Y luego por terminal en la carpeta raiz correr estos comandos

```bash
yarn install

yarn tsc

yarn start
```
