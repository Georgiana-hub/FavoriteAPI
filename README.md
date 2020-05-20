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
                "_id": "5ebd6d4f59fbd93becf04e3f",
                "userId": "5eb16fdf4afbf654966cb68d",
                "items": [
                    {
                        "item": {
                            "name": "house pizza",
                            "image": "https://img.favpng.com/7/18/21/shashlik-pizza-dish-main-course-restaurant-png-favpng-6qHVKG4NM94QxrdHUWzwj75y5.jpg",
                            "price": 30
                        },
                        "_id": "5ebd739787338e3824d40d32",
                        "id": "5eb17a5c6f436666294bc420"
                    },
                    {
                        "item": {
                            "name": "Supa crema de porcini cu julien de pancetta",
                            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsavoriurbane.com%2Fsupa-crema-de-legume-reteta-simpla%2F&psig=AOvVaw0MMf0dit7e7lduDbiL1v6L&ust=1588773203502000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi8x8XvnOkCFQAAAAAdAAAAABAD",
                            "price": 19
                        },
                        "_id": "5ebd73b187338e3824d40d33",
                        "id": "5eb173d3d6fb9132c43218a2"
                    }
                ],
                "__v": 9
            },
            {
                "_id": "5ebd745bc495253ba8c1834c",
                "userId": "5eb175539dff1b3844a84ab8",
                "items": [
                    {
                        "item": {
                            "name": "Bifteki de legume",
                            "image": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fpetrisorcatering.ro%2Fprodus%2Fbiftec-cu-legume-la-gratar%2F&psig=AOvVaw2TY0GzNrt922WnIceR-5om&ust=1588773245671000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCzytnvnOkCFQAAAAAdAAAAABAD",
                            "price": 25
                        },
                        "_id": "5ebd745bc495253ba8c1834d",
                        "id": "5eb173d3d6fb9132c43218a3"
                    }
                ],
                "__v": 0
            }
        ]
    }
}
```

## /api/v1/favorites/:idUser

### GET

Get a specific list of favorite foods by an userId

**Return codes**:

-   200 - OK
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/5eb16fdf4afbf654966cb68d`

**Returned data example**:

```JSON
{
    "success": true,
    "data": {
        "favorites": [
            {
                "_id": "5ebd6d4f59fbd93becf04e3f",
                "userId": "5eb16fdf4afbf654966cb68d",
                "items": [
                    {
                        "item": {
                            "name": "house pizza",
                            "image": "https://img.favpng.com/7/18/21/shashlik-pizza-dish-main-course-restaurant-png-favpng-6qHVKG4NM94QxrdHUWzwj75y5.jpg",
                            "price": 30
                        },
                        "_id": "5ebd739787338e3824d40d32",
                        "id": "5eb17a5c6f436666294bc420"
                    },
                    {
                        "item": {
                            "name": "Supa crema de porcini cu julien de pancetta",
                            "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsavoriurbane.com%2Fsupa-crema-de-legume-reteta-simpla%2F&psig=AOvVaw0MMf0dit7e7lduDbiL1v6L&ust=1588773203502000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi8x8XvnOkCFQAAAAAdAAAAABAD",
                            "price": 19
                        },
                        "_id": "5ebd73b187338e3824d40d33",
                        "id": "5eb173d3d6fb9132c43218a2"
                    }
                ],
                "__v": 9
            }
        ]
    }
}
```

## /api/v1/favorites/add-product/:idProduct

### POST

Post a favorite food in a list for an user to Favorites Database

**Body example**

`userId` is required

```JSON
{
 "userId":"5eb175539dff1b3844a84ab8"
}
```

**Return codes**:

-   201 - CREATED
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/add-product/5eb173d3d6fb9132c43218a2`

**Returned data example**:

```JSON
{
    "success": true,
    "data": {
        "userExists": {
            "_id": "5ebd745bc495253ba8c1834c",
            "userId": "5eb175539dff1b3844a84ab8",
            "items": [
                {
                    "item": {
                        "name": "Bifteki de legume",
                        "image": "https://www.google.com/url?sa=i&url=http%3A%2F%2Fpetrisorcatering.ro%2Fprodus%2Fbiftec-cu-legume-la-gratar%2F&psig=AOvVaw2TY0GzNrt922WnIceR-5om&ust=1588773245671000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCMCzytnvnOkCFQAAAAAdAAAAABAD",
                        "price": 25
                    },
                    "_id": "5ebd745bc495253ba8c1834d",
                    "id": "5eb173d3d6fb9132c43218a3"
                },
                {
                    "_id": "5ebd7681c495253ba8c1834e",
                    "id": "5eb173d3d6fb9132c43218a2",
                    "item": {
                        "name": "Supa crema de porcini cu julien de pancetta",
                        "image": "https://www.google.com/url?sa=i&url=https%3A%2F%2Fsavoriurbane.com%2Fsupa-crema-de-legume-reteta-simpla%2F&psig=AOvVaw0MMf0dit7e7lduDbiL1v6L&ust=1588773203502000&source=images&cd=vfe&ved=0CAIQjRxqFwoTCOi8x8XvnOkCFQAAAAAdAAAAABAD",
                        "price": 19
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

`userId` is required

```JSON
{
 "userId":"5eb175539dff1b3844a84ab8"
}
```

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/delete-product/5eb173d3d6fb9132c43218a2`

## /api/v1/favorites/:idUser

### DELETE

Delete an user's list of favorite products

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/5eb16fdf4afbf654966cb68d`

## /api/v1/favorites/all

### DELETE

Delete all favorite products lists from Favorite database

**Return codes**:

-   204 - NO CONTENT
-   400 - BAD REQUEST

**Usage example**:  
 `http://favoriteip.herokuapp.com/api/v1/favorites/all/`
