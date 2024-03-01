# **_Api Documentation Endpoint_**

## Athentication endpoints

http://localhost:4444/auth/register

**_Done_**

```json
{
  "message": "Usuario creado correctamente",
  "password": "12312345",
  "role": "corporate"
}
```

> In the body of the request,
> you must include the 'role' parameter to enable login functionality.

**_Bad Request_**

```json
{
  "message": "El usuario ya existe con el email",
  "error": "Bad Request",
  "statusCode": 400
}
```

http://localhost:4444/auth/login

**_Done_**

```json
{
  "accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRlc3QyQGdtYWlsLmNvbSIsImlhdCI6MTcwMzc4MjUyNCwiZXhwIjoxNzAzODY4OTI0fQ.y-7Tx_Ui-GkOolRJzorZjL7fyQGWTm5R2ZzDWUnd9PU",
  "email": "test2@gmail.com"
}
```

**_Bad Request_**

```json
{
  "message": "El email no existe",
  "error": "Bad Request",
  "statusCode": 400
}
```

```json
{
  "message": "La contraseña no es correcta",
  "error": "Unauthorized",
  "statusCode": 401
}
```

## Users Individual endpoints

http://localhost:4444/users

**_Done_**

```json
{
  "_id": "658d99dfbbe2f1607fc4ccd9",
  "name": "dante",
  "email": "test2@gmail.com",
  "password": "$2a$10$/IWU1rt7dCU/Y/LPQkpnT.b7yA7pfxUnzT7PtIGlTkpt6yQPrLVrO",
  "createdAt": "2023-12-28T15:53:03.711Z",
  "updatedAt": "2023-12-28T15:53:03.711Z",
  "__v": 0,
  "role": "user"
}
```

**_Bad Request_**

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

http://localhost:4444/users/:email

**_Done_** (_Enpoint Protected Response_)

```json
{
  "_id": "65969988a43a023fe2e01a66",
  "name": "dante84",
  "email": "test4@gmail.com",
  "password": "$2a$10$ell4YaBbcKd1fyRJ51AI/.HBHjnM91S4NECRIk/PdD8PpH92APudG",
  "createdAt": "2024-01-04T11:42:00.982Z",
  "updatedAt": "2024-01-04T11:42:00.982Z",
  "__v": 0,
  "role": "admin"
}
```

**_Bad Request_**

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```

```json
{
  "message": "User not found",
  "error": "Bad Request",
  "statusCode": 400
}
```

## Users Corporate endpoints

http://localhost:4444/users-corporate

**_Done_** (_Enpoint Protected Response_)

```json
 {
    "_id": "65a0aec53604c5e2cc68c44a",
    "name": "dante",
    "email": "testcorp2@gmail.com",
    "password": "$2a$10$zkP5LyHQ7xqEe7UPAiVpr.HHnwW8WP9AWLvrn/0.ZCfkPMUN/LFLO",
    "role": "corporate",
    "organisation": "holaMundo",
    "createdAt": "2024-01-12T03:15:17.517Z",
    "updatedAt": "2024-01-12T03:15:17.517Z",
    "__v": 0
},
```
**_Bad Request_**

```json
{
  "message": "Unauthorized",
  "statusCode": 401
}
```
