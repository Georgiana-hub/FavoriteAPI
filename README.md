# Favorites API

## Response structure

The structure of the API responses' body is as follows:

-   for successful responses, a JSON object containing the properties:
    -   `success`: `true`
    -   `data`: An object, structure detailed for each route below.
-   for unsuccessful responses, a JSON object containing the
    properties:
    -   `success`: `false`
    -   `error`: An object containing a `message` property, and
        sometimes additional helpful properties.

## /api/v1/favorites

### GET

Get the all user's favorite foods from the db.

**Return codes**:

-   200 - OK
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites`

**Returned data example**:

```JSON
{
    "success": true,
    "data": {
        "favorites": [
            {
                "_id": "5ec52ba216f3e40017c3901b",
                "userId": "5eb16fdf4afbf654966cb68d",
                "items": [
                    {
                        "item": {
                            "name": "Chicken Fajitas",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Shepherds-Pie-Final-small.jpg",
                            "price": 19
                        },
                        "_id": "5ec52ba216f3e40017c3901c",
                        "id": "5ebcf37326e32517c46f0061"
                    },
                    {
                        "item": {
                            "name": "Teriyaki Chicken Donburi",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Firecracker-Shrimp-small1.jpg",
                            "price": 26
                        },
                        "_id": "5ec52bb416f3e40017c3901d",
                        "id": "5ebcf37326e32517c46f0063"
                    },
                    {
                        "item": {
                            "name": "Kebab",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Shepherds-Pie-Final-small.jpg",
                            "price": 25
                        },
                        "_id": "5ec52bc816f3e40017c3901e",
                        "id": "5ebcf37326e32517c46f0065"
                    }
                ],
                "__v": 2
            },
            {
                "_id": "5ec52bea16f3e40017c3901f",
                "userId": "5eb175539dff1b3844a84ab8",
                "items": [
                    {
                        "item": {
                            "name": "Kebab",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Shepherds-Pie-Final-small.jpg",
                            "price": 25
                        },
                        "_id": "5ec52bea16f3e40017c39020",
                        "id": "5ebcf37326e32517c46f0065"
                    },
                    {
                        "item": {
                            "name": "VENTOURAGE (Falafel Burger)",
                            "image": "http://localhost:4000/images/7aebd1a1-d433-4a9d-93ab-5bf3d4855dde.png",
                            "price": 22
                        },
                        "_id": "5ec52bfc16f3e40017c39021",
                        "id": "5ec18dc2d854d72f54741fd3"
                    },
                    {
                        "item": {
                            "name": "THE GOODFATHER (Italian Burger)",
                            "image": "http://localhost:4000/images/c58c7052-5ae2-46b9-aaf7-99d9123cab61.png",
                            "price": 22
                        },
                        "_id": "5ec52c0d16f3e40017c39022",
                        "id": "5ec1b0bed5556202b8425bb5"
                    }
                ],
                "__v": 2
            }
        ]
    }
}
```

## /api/v1/favorites/user?token

### GET

Get a specific list of favorite foods by an userId

**Return codes**:

-   200 - OK
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/user?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNmZkZjRhZmJmNjU0OTY2Y2I2OGQiLCJpYXQiOjE1ODg2ODY4MzF9.zH0WgOcGZdb8WVy_eehj2-7_Otjbkd4OYCb80Uu49sc`

**Returned data example**:

```JSON
{
    "success": true,
    "data": {
        "favorites": [
            {
                "_id": "5ec5295316f3e40017c39018",
                "userId": "5eb16fdf4afbf654966cb68d",
                "items": [
                    {
                        "item": {
                            "name": "Bruschette with Tomato",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Firecracker-Shrimp-small1.jpg",
                            "price": 29
                        },
                        "_id": "5ec5295316f3e40017c39019",
                        "id": "5ebcf37126e32517c46f0049"
                    },
                    {
                        "item": {
                            "name": "Pappardelle alla Bolognese",
                            "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Firecracker-Shrimp-small1.jpg",
                            "price": 22
                        },
                        "_id": "5ec5297016f3e40017c3901a",
                        "id": "5ebcf37226e32517c46f005d"
                    }
                ],
                "__v": 1
            }
        ]
    }
}
```

## /api/v1/favorites/add-product/:idProduct

### POST

Post a favorite food in a list for an user to Favorites Database

**Body example**

`token` is required

```JSON
{
 "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNmZkZjRhZmJmNjU0OTY2Y2I2OGQiLCJpYXQiOjE1ODg2ODY4MzF9.zH0WgOcGZdb8WVy_eehj2-7_Otjbkd4OYCb80Uu49sc"
}
```

**Return codes**:

-   201 - CREATED
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/add-product/5ebcf37226e32517c46f005d`

**Returned data example**:

```JSON
{
    "success": true,
    "data": {
        "userExists": {
            "_id": "5ec5295316f3e40017c39018",
            "userId": "5eb16fdf4afbf654966cb68d",
            "items": [
                {
                    "item": {
                        "name": "Bruschette with Tomato",
                        "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Firecracker-Shrimp-small1.jpg",
                        "price": 29
                    },
                    "_id": "5ec5295316f3e40017c39019",
                    "id": "5ebcf37126e32517c46f0049"
                },
                {
                    "_id": "5ec5297016f3e40017c3901a",
                    "id": "5ebcf37226e32517c46f005d",
                    "item": {
                        "name": "Pappardelle alla Bolognese",
                        "image": "http://picturetherecipe.com/wp-content/uploads/2012/07/Firecracker-Shrimp-small1.jpg",
                        "price": 22
                    }
                }
            ],
            "__v": 0
        }
    }
}
```

## /api/v1/favorites/delete-product/:idProduct

### DELETE

Delete a favorite product from an user's list from Favorite database

**Body example**

`token` is required

```JSON
{
 "token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNmZkZjRhZmJmNjU0OTY2Y2I2OGQiLCJpYXQiOjE1ODg2ODY4MzF9.zH0WgOcGZdb8WVy_eehj2-7_Otjbkd4OYCb80Uu49sc"
}
```

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/delete-product/5ebcf37126e32517c46f0049`

## /api/v1/favorites/user?token

### DELETE

Delete an user's list of favorite products

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/user?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWIxNmZkZjRhZmJmNjU0OTY2Y2I2OGQiLCJpYXQiOjE1ODg2ODY4MzF9.zH0WgOcGZdb8WVy_eehj2-7_Otjbkd4OYCb80Uu49sc`

## /api/v1/favorites/all

### DELETE

Delete all favorite products lists from Favorite database

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/all/`
