# crud_users_angular17-mysql

Prueba Técnica ThinkAgro

## Para correr la aplicación

Instalar modulos de node.

Escribir `ng serve` para el cliente de desarrollo. Esta predeterminado en puerto `http://localhost:4200/`.

Escribir `node index.js` dentro de /server para correr el server de desarrollo. Esta predeterminado en puerto `http://localhost:3000/`.

## Base de datos MySQL

Version de MySQl: 8.0.36-0ubuntu0.22.04.1

Configurar credenciales en /server/index.js. Parametros predeterminados

```javascript
{
  host: "localhost",

  user: "root",

  password: "password",

  database: "users",
}
```

Deje una funcion que creara un admin default, asi pueden ingresar por primera vez a la app.

```javascript
{
  correo: "admin@admin",

  password: "admin",
}
```

Dejo el archivo `schema.sql` para que puedan importarlo y tener la estructura de la base de datos.
