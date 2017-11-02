# Typescript workshop


### How do I get set up?

* `Clone`
* `put your firebase service_account json in .env/`
* `copy .env/.example to .env/dev`
* `Replace the keys with valid data`
* `npm start`

# API

### Users

`GET /api/users`

```json
{
    "users": [
        {
            "uid": "10sDkLOBjPgvdEF5rWjWzOauByH3",
            "email": "andrei.robu@assist.ro",
            "emailVerified": false,
            "disabled": false,
            "metadata": {
                "lastSignInTime": "Thu, 02 Nov 2017 20:08:35 GMT",
                "creationTime": "Wed, 01 Nov 2017 15:20:05 GMT"
            },
            "passwordHash": "iTmHsLKvQxVt9xTuwKDemDCmANazzE5suFMmZhGgrInMTI2eoiwyaNy-_J0vxyIWGsUxDVvbk7O_oBtNa4KK5g==",
            "passwordSalt": "26z6jSfCWYb-5Q==",
            "providerData": [
                {
                    "uid": "andrei.robu@assist.ro",
                    "email": "andrei.robu@assist.ro",
                    "providerId": "password"
                }
            ]
        }
    ]
}
```

### Pokemons

*IMPORTANT:* Works only with firebase authentication token
Add the `x-auth` header with the firebase token value

`GET /api/pokemons`

```json
{
    "success": true,
    "pokemons": [
        {
            "id": "-KxyMB3Xpi5kpKOdScJI",
            "abilities": "Coding123",
            "gender": "M",
            "height": "128 cm",
            "name": "Codosaurus1",
            "weight": "650kg"
        },
        {
            "id": "-KxyQcmLYL1svdrqXF2T",
            "abilities": "Loser",
            "gender": "M",
            "height": "128 cm",
            "name": "Gerula",
            "weight": "60kg"
        }
    ]
}
```

`GET /api/pokemon/:pokemonId`

```json
{
    "success": true,
    "pokemon": {
        "abilities": "Coding123",
        "gender": "M",
        "height": "128 cm",
        "name": "Codosaurus1",
        "weight": "650kg",
        "id": "-KxyMB3Xpi5kpKOdScJI"
    }
}
```

`POST /api/pokemon`

*Post body:*

```json
{
    "abilities": "Coding",
    "gender": "M",
    "height": "128 cm",
    "name": "Codosaurus1",
    "weight": "65kg"
}
```

*Response:*

```json
{
    "success": true,
    "pokemon": "https://workshop-typescript.firebaseio.com/workshop-typescript/pokemons/10sDkLOBjPgvdEF5rWjWzOauByH3/-KxyVBu5s3yJeF11IGEl"
}
```

`PUT /api/pokemon/:pokemonId`

*PUT body:*

```json
{
    "abilities": "newAbility",
    "gender": "M",
    "height": "128 cm",
    "name": "New name",
    "weight": "65kg"
}
```

*Response:*

```json
{
    "success": true
}
```

`DELTE /api/pokemon/:pokemonId`

*Response:*

```json
{
    "success": true
}
```