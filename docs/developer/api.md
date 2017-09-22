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
  guests: [{
    id: number,
    name: string,
    userId: number,
    eventId: number
  }]
}
```


## `GET /events/:id/guests`

Response:

```js
[{
  id: number,
  name: string,
  userId: number,
  eventId: number
}]
```


## `POST /events/:id/guests`*

Request:

```js
{
  name: string
}
```

Response: HTTP status `202` or `500`


## `GET /guests/:id`

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
  guestIds: array<number>,
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
  guestIds: array<number>
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
  guestIds: array<number>,
  eventId: number
}
```

