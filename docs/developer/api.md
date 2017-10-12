# The Reka API

`*` indicates an endpoint protected with an `Authorization` header

## `POST /auth/register`

Request:

```js
{
  username: string,
  password: string
}
```

Response:

```js
{
  message: string,
  token: string
}
```


## `POST /auth/signin`

Request:

```js
{
  username: string,
  password: string
}
```

Response:

```js
{
  message: string,
  token: string
}
```


## `GET /users/:id`*

Response:

```js
{
  id: number,
  username: string
}
```


## `PUT /users/:id`*

Request:

```js
{
  username: string,
  newPassword: string,
  currentPassword: string
}
```

Response: HTTP status `202` or `500`


## `GET /events`*

Response:

```js
{
  hosted: [{
    id: number,
    name: string,
    userId: number,
    offeringType: string,
    location: string,
    description: string
  }],
  attended: [{
    id: number,
    name: string,
    userId: number,
    offeringType: string,
    location: string,
    description: string
  }]
}
```


## `POST /events`*

Request:

```js
{
  name: string,
  userId: number,
  location: string,
  dateTime: number,
  description: string,
  offeringType: string
}
```

Response: HTTP status `202` or `500`


## `GET /events/:id`

Response:

```js
{
  details: {
    id: number,
    name: string,
    location: string,
    description: string,
    offeringType: string,
    userId: string,
    dateTime: number
  },
  registrations: [{
    id: number,
    name: string,
    userId: number,
    eventId: number
  }]
}
```


## `GET /events/:id/registrations`

Response:

```js
[{
  id: number,
  name: string,
  userId: number,
  eventId: number
}]
```


## `POST /events/:id/registrations`

Request:

```js
{
  name: string,
  userId: number or null
}
```

Response: HTTP status `202` or `500`


## `DELETE /events/:id/registrations`

Request:

```js
{
  name: string
}
```

Response: HTTP status `204` or `500`


## `GET /registrations/:id`

Response:

```js
{
  id: number,
  name: string,
  offeringIds: array,
  eventId: number
}
```


## `GET /events/:id/offerings`

Response:

```js
[{
  id: number,
  name: string,
  description: string,
  photoUrl: string,
  registrationIds: array<number>,
  eventId: number
}]
```


## `POST /events/:id/offerings`*

Request:

```js
{
  name: string,
  description: string,
  photoUrl: string,
  registrationIds: array<number>
}
```

Response: HTTP status `202` or `500`



## `GET /offerings/:id`

```js
{
  id: number,
  name: string,
  description: string,
  photoUrl: string,
  registrationIds: array<number>,
  eventId: number
}
```

