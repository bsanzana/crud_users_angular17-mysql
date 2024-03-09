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

# Observaciones.

Se requiere mostrar un mensaje cuando no existe coincidencia con la base de datos. Actualmente, solo se realiza una coincidencia con el correo electrónico, pero no se realiza una validación de las contraseñas. Esto podría resultar en un acceso incorrecto si hay múltiples usuarios con el mismo correo electrónico, ya que solo se accedería al primer usuario que tenga dicho correo. Otro punto es que era mejor haber puesto como primary key el correo.

Ya iniciando sesión se puede realizar el CRUD, solo los usuarios como `ROLE_ADMIN` tiene acceso al boton `Crear usuario`, como tambien ver y editar todos los otros usuarios. Cuando se inicia con un usuario `ROLE_USER` solo puede ver sus datos.

# Observaciones.

Dentro de los bugs detectados son que si uno se elimina el usuario no te bota de la pagina, cómo tambien si el admin se cambia el rol a usuario.
Faltaria implentar una encriptación para las password, y una estrategia de tokens, porque al usar behavior subject no logre hacer que perdura las variables que guardan el login y autorización.
