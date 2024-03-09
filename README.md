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

Dejo el archivo `schema.sql` para que puedan importarlo y tener la estructura de la base de datos.

## Instrucciones

La url raiz es `/login` donde se encontrará un formulario admin por default, correo: `admin@admin.cl`, password `admin`.

# bugs

Falta mostrar un mensaje cuando no existe coincidencia con la base de datos. Solo hago match con el correo, falta hacer validación de
las password, ya que si hubieran mismos correos solo entraria a un al primer usuario que haya el mismo correo. Como tambien haber puesto como primary key el correo.
