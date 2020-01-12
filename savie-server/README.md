# App Documentation

## Notes / To Do's

## Overview

### Backend

### Frontend

### Admin CLI

### Launching the Server

Too launch the application please run the following command from the project root folder:

```bash
node index.js
```

You may also run the application in debugging mode:

```bash
env NODE_DEBUG=server,stripe,mailgun,cli,workers node index.js
```

Running the APP for different environments:

```bash
NODE_ENV=staging node index.js
```

The APP currently supports `staging` (default) and `production` environments.

### CLI Commands

The following CLI command are available for the execution:

```Text
-----------------------------------------------------------------------------------------------------------
                               CLI Manual
-----------------------------------------------------------------------------------------------------------

exit                           Kill the CLI (and the rest of the application)

man                            Show this help page

help                           Alis of the "man" command

services                       Show the list of available menu items (pizzas)

orders                         View all the recent orders in the system (orders placed in the last 24 hours)

order --{orderId}              Lookup the details of a specific order by order ID

users                          View all the users who have signed up in the last 24 hours

user --{email}                 Lookup the details of a specific user by email address

-----------------------------------------------------------------------------------------------------------
```

### Front-End

The following paths are available for the user in browser after launching the app.

#### Index Page

Path: `http://localhost:3000/`

#### Login Page

Path: `http://localhost:3000/user/session/create`

#### Menu List

Path: `http://localhost:3000/menu/list`

#### Cart

Path: `http://localhost:3000/user/cart/read`

#### Checkout Page

Path: `http://localhost:3000/user/order/create`

#### Checkout Success Page

Path: `http://localhost:3000/user/order/success`

#### User Profile Page

Path: `http://localhost:3000/user/account/edit`

### Back-End (API)

The following endpoints are available from API perspective.

#### HealthCheck Endpoint

Request example:

```bash
curl -X GET http://localhost:3000/ping
```

#### User Endpoints

##### Create the User

Request example:

```bash
curl -X POST \
  http://localhost:3000/users \
  -d '{
	"name": "John",
	"email": "any@email.com",
	"password": "1111",
	"address": "San Francisco, CA",
	"streetAddress": "Sunset blvd, 15"
}'
```

##### Read the User

Request example:

```bash
curl -X GET \
  'http://localhost:3000/users?email=any@email.com' \
  -H 'token: 48df0wibmpqz69rzgb5y'
```

##### Update the User

Request example:

```bash
curl -X PUT \
  http://localhost:3000/users \
  -H 'Content-Type: application/json' \
  -H 'token: 48df0wibmpqz69rzgb5y' \
  -d '{
	"name": "Bill",
	"email": "any@email.com"
}'
```

##### Delete the User

Request example:

```bash
curl -X DELETE \
  'http://localhost:3000/users?email=any@email.com' \
  -H 'token: b3xg95c3wp0ol1pk46vm'
```

#### Token Endpoints

##### Create the Token

Request example:

```bash
curl -X POST \
  http://localhost:3000/tokens \
  -d '{
	"email": "any@email.com",
	"password": "1111"
}'
```

##### Read the Token

Request example:

```bash
curl -X GET 'http://localhost:3000/tokens?id=gjfek6ha08p2x8877mno'
```

##### Update (Prolong) the Token

Request example:

```bash
curl -X PUT \
  http://localhost:3000/tokens \
  -H 'Content-Type: application/json' \
  -d '{
	"id": "gjfek6ha08p2x8877mno"
}'
```

##### Delete the Token

Request example:

```bash
curl -X DELETE 'http://localhost:3000/tokens?id=bivegzlqhs1z5q4np0yo'
```

#### Menu Endpoint

##### Get the Menu

Request example:

```bash
curl -X GET \
  http://localhost:3000/menus \
  -H 'token: 3c3nld8owylf927r5txu'
```

#### Cart Endpoint

##### Create Shopping Cart

Request example:

```bash
  http://localhost:3000/carts \
  -H 'token: ket278eemafcehh9vq30'
```

##### Read Shopping Cart

Request example:

```bash
curl -X GET \
  http://localhost:3000/carts \
  -H 'token: ket278eemafcehh9vq30'
```

##### Delete Shopping Cart

Request example:

```bash
curl -X DELETE \
  http://localhost:3000/carts \
  -H 'token: ket278eemafcehh9vq30'
```

#### Update Items in Shopping Cart

Request example:

```bash
curl -X PUT \
  http://localhost:3000/carts \
  -H 'Content-Type: application/json' \
  -H 'token: sdvr4w4e85gw8slgycnt' \
  -d '{
	"id": 4,
	"quantity": 2
}
'
```

#### Order Endpoint

##### Create the Order

Request example:

```bash
curl -X POST \
  http://localhost:3000/orders \
  -H 'Content-Type: application/json' \
  -H 'token: 8l06rtpic4y4kps54pe4' \
  -d '{
	"paymentSource": "tok_mastercard"
}'
```

##### Read the Order

Request example:

```bash
curl -X GET \
  'http://localhost:3000/orders?id=un2yhgqoajzmv76fozkd' \
  -H 'token: 4dpj97yqr53druol20ru'
```