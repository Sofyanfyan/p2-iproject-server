## Endpoints

List of Available Endpoints:

- `POST /users/register`
- `GET /users/login`
- `GET /games`
- `GET /games/favorites`
- `GET /games/:id`
- `POST /favorites/:gameId`
- `PATCH /subs`
- `PATCH /favorites/:id`



### POST /users/register

#### Description

- Register for user

#### Response

_201 - Created_

- Body

  ```json
   {
    "id": 17,
    "username": "Fyans",
    "email": "fyans665@gmail.com"
   }
  ```

  _400 - Validation_

- Body

  ```json
   {
    "message": "Username is required"
   }
  ```

  _400 - Validation Email unique_

- Body
  ```json
   {
    "message": "Email has been registered"
   }
  ```



### POST /users/login

#### Description

- Login for user

#### Response

_200 - OK_

- Body

  ```json
   {
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTY3MzQ5MTk1NX0.4vdxpZQ-8yaDAFl2yW78Kue8GOPjckcWncFwgvqU124",
    "username": "Fyans",
    "isSubs": false,
   }
  ```

_400 - Validation_

- Body

  ```json
   {
    "message": "Email is required"
   }
  ```

_401 - Invalid_

- Body
  ```json
   {
    "message": "Invalid email or password"
   }
  ```

### GET /games

#### Description

- Get All Games

#### Response



- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```
_200 - OK_

- Body

  ```json
   [
    {
        "id": 365,
        "title": "Naruto Online",
        "thumbnail": "https://www.freetogame.com/g/365/thumbnail.jpg",
        "short_description": "A free-to-play MMO based on the popular anime series and manga, developed \r\nby Bandai Namco Entertainment. ",
        "game_url": "https://www.freetogame.com/open/naruto-online",
        "genre": "MMORPG",
        "platform": "Web Browser",
        "publisher": "OAS Games",
        "developer": "Bandai Namco",
        "release_date": "2016-07-20",
        "freetogame_profile_url": "https://www.freetogame.com/naruto-online"
    },
    {
        "id": 475,
        "title": "Genshin Impact",
        "thumbnail": "https://www.freetogame.com/g/475/thumbnail.jpg",
        "short_description": "If you’ve been looking for a game to scratch that open-world action RPG itch, one with perhaps a bit of Asian flair, then you’re going to want to check out miHoYo’s Genshin Impact.",
        "game_url": "https://www.freetogame.com/open/genshin-impact",
        "genre": "Action RPG",
        "platform": "PC (Windows)",
        "publisher": "miHoYo",
        "developer": "miHoYo",
        "release_date": "2020-09-28",
        "freetogame_profile_url": "https://www.freetogame.com/genshin-impact"
    },
    {
        "id": 523,
        "title": "Fall Guys",
        "thumbnail": "https://www.freetogame.com/g/523/thumbnail.jpg",
        "short_description": "Play the most competitive massively multiplayer party royale game featuring beans ever for free on a variety of platforms. ",
        "game_url": "https://www.freetogame.com/open/fall-guys",
        "genre": "Battle Royale",
        "platform": "PC (Windows)",
        "publisher": "Mediatonic",
        "developer": "Mediatonic",
        "release_date": "2020-08-04",
        "freetogame_profile_url": "https://www.freetogame.com/fall-guys"
    },
    {
        "id": 516,
        "title": "PUBG: BATTLEGROUNDS",
        "thumbnail": "https://www.freetogame.com/g/516/thumbnail.jpg",
        "short_description": "Get into the action in one of the longest running battle royale games PUBG Battlegrounds.",
        "game_url": "https://www.freetogame.com/open/pubg",
        "genre": "Shooter",
        "platform": "PC (Windows)",
        "publisher": "KRAFTON, Inc.",
        "developer": "KRAFTON, Inc.",
        "release_date": "2022-01-12",
        "freetogame_profile_url": "https://www.freetogame.com/pubg"
    },
   ]
  ```


### GET /games/favorites

#### Description

- Get All favorites by user

#### Response

- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```

_200 - OK_

- Body 

   ```json

   [
      {
          "id": 5,
          "UserId": 1,
          "gameId": 524,
          "name": "Temperia: Soul of Majestic",
          "status": "Completed",
          "genre": "Card Game",
          "imageUrl": "https://www.freetogame.com/g/524/thumbnail.jpg",
          "createdAt": "2023-01-11T16:55:46.993Z",
          "updatedAt": "2023-01-11T18:58:17.621Z"
      }
   ]

   ```


### GET /games/:id

#### Description

- Get games by id

#### Response

- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```

_200 - OK_

- Body 

   ```json

   {
    "id": 525,
    "title": "MultiVersus",
    "thumbnail": "https://www.freetogame.com/g/525/thumbnail.jpg",
    "status": "Live",
    "short_description": "The Warner Bros lineup meets Smash in Player First Games’ MultiVersus.",
    "description": "The Warner Bros lineup meets Smash in Player First Games’ MultiVersus, a platform fighter featuring a wide range of characters from Warner’s movies, cartoons, and more. Fight Batman as Shaggy. Team up with Steven Universe and Finn. Make use of their unique abilities and take your opponents down.\r\n\r\nThe game features a large roster from popular media and shows as well as maps based on locations found there. That means players can visit the Batcave or Jake and Finn’s Treefort among other places. And they'll do it while taking par tin epic 1v1, 2v2, or 4 players free for all battles. \r\n\r\nThere’s also a handy training mode where players can hone their skills. The game is available on all platforms and includes cross-platform play and progression.",
    "game_url": "https://www.freetogame.com/open/multiversus",
    "genre": "Fighting",
    "platform": "Windows",
    "publisher": "Warner Bros. Games",
    "developer": "Player First Games",
    "release_date": "2022-07-19",
    "freetogame_profile_url": "https://www.freetogame.com/multiversus",
    "minimum_system_requirements": {
        "os": null,
        "processor": null,
        "memory": null,
        "graphics": null,
        "storage": null
    },
    "screenshots": [
        {
            "id": 1289,
            "image": "https://www.freetogame.com/g/525/multiversus-1.jpg"
        },
        {
            "id": 1290,
            "image": "https://www.freetogame.com/g/525/multiversus-2.jpg"
        },
        {
            "id": 1291,
            "image": "https://www.freetogame.com/g/525/multiversus-3.jpg"
        }
    ]
   }

   ```

 _404 - NotFound_

- Body

  ```json
   {
    "message": "Game not found"
   }
  ```




### POST /favorites/:gameId

#### Description

- POST Favortite Game

#### Response

- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```
_200 - OK_

   ```json

      {
         "id": 16,
         "UserId": 1,
         "gameId": 540,
         "name": "Overwatch 2",
         "genre": "Shooter",
         "imageUrl": "https://www.freetogame.com/g/540/thumbnail.jpg",
         "status": "Uncompleted",
         "updatedAt": "2023-01-12T03:19:00.962Z",
         "createdAt": "2023-01-12T03:19:00.962Z"
      }
   ```


_404 - NotFound_

- Body

  ```json
   {
    "message": "Game not found"
   }
  ```


### PATCH /subs

#### Description

- PATCH subscribe

#### Response

- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```

_200 - OK_

   ```json

      {
         "message": "SUBSCRIPTION SUCCESS"
      }
   ```

### PATCH /favorites/:id

#### Description

- PATCH status favorite 

#### Response

- Headers

   ```json
      {
         "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNjczMzU0NjE5fQ.DgQ4f49BCofMT0EykiOcAWR_SY_I-kwmiwWs6SsiJ-c"
      }
   ```

_200 - OK_

   ```json

      {
         "message": "SUCCESS UPDATE STATUS WITH ID = 3"
      }
   ```

_404 - NotFound_

- Body

  ```json
   {
    "message": "Game not found"
   }
  ```


### Global Error

#### Response

_401 - Invalid Token_

- Body
  ```json
  {
    "message": "Invalid token"
  }
  ```

_403 - Forbidden_

- Body
  ```json
  {
    "message": "Forbidden"
  }
  ```

_500 - Internal Server Error_

- Body
  ```json
  {
    "message": "Internal server error"
  }
  ```