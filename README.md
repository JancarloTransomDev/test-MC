# Prueba 

Esta prueba esta planteado en un escenario con el framework de Ionic en la última versión estable 6.14.1 en complementacióno de Angular.

## En esta prueba tendrás que realizar lo siguiente:

* Realizar un login en donde se pida usuario y password, al acceder que se almacene el token y permitir acceder a los demás vistas.

## Login

```bash
POST ::  http://138.91.226.69:81/api/auth/login body = {  payroll_number: ‘151154’ (string)	password: ‘151154’ (string) }

```

* Realizar una vista de consulta para visualizar todos los usuarios de manera de paginación. (estilo vizual libre)

##  all Users:
```bash
GET :: http://138.91.226.69:81/api/admin/all
```

* Al acceder a la vista de los usuarios hay que realizar una validación en donde se verifique el usuario logueado, implementando un GUARD en el ruteador y realizando una petición al servidor con el siguiente endpoint 

## Me:
```bash
GET :: http://138.91.226.69:81/api/auth/me
```
* El usuarion podrá finalizar la sesión y regresar al login.
## Logout:
```bash
GET :: http://138.91.226.69:81/api/auth/logout
```



## Validaciones
* El usuario no puede acceder a los otras vistas sin estar logueado.

* Los endpoints de “All users” y “Me” reciben una cabecera en donde se envía el token de tipo Bearer como lo siguiente: 
Authorization: `Bearer ${token}`

* Se evaluará el uso de: pages (Components), Lazyloading, interceptors, guards, styles, responisve, API, rxjs.

## Entrega y Evaluación

* Una vez finalizada la prueba se tendrá que subir los cambios en una nueva rama de nombre "Test-final-(iniciales de tu nombre)".
* Solo se tiene un tiempo de 24 hrs. para terminar la prueba.
