# Prueba 

Esta prueba esta planteado en un escenario con el framework de ionic en la última versiÓn estable 6.14.1

## En esta prueba tendrás que realizar lo siguiente:

* Realizar un login en donde al acceder se almacene el token y permitir acceder a los demás vistas.

## Login

```bash
POST ::  http://138.91.226.69:81/api/auth/login body = {	payroll_number: ‘’ (string)	password: ‘’ (string)}

```

* Realizar una vista de consulta para visualizar todos los usuarios de manera de paginación.

##  all Users:
```bash
GET :: http://138.91.226.69:81/api/admin/all
```

* Al acceder a la vista de los usuarios hay que realizar una validación en donde se verifique el usuario logueado, implementando un GUARD en el routeador y realizando una petición al servidor con el siguiente endpoint 

## Me:
```bash
GET :: http://138.91.226.69:81/api/auth/me
```

## Logout:
```bash
GET :: http://138.91.226.69:81/api/auth/logout
```


## Validaciones
* El usuario no puede acceder a los otras vistas sin estar logueado.

* Los endpoints de “All users” y “Me” reciben una cabecera en donde se envía el token de tipo Bearer como lo siguiente: 
Authorization: `Bearer ${token}`