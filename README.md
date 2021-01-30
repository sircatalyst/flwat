# FLWAT

A simple validation api

## API Deployed Link

https://flwat.herokuapp.com

## Built With

- [Node.js](https://nodejs.org/)
- [Typescript](https://www.typescriptlang.org/)
- [Nest.js](https://docs.nestjs.com/)

## For Development

To clone and run this application in development mode, you will need [Node.js](https://nodejs.org/en/download/), [Git](https://git-scm.com) and [Nest.js](https://docs.nestjs.com/) on your computer.
In your command line, type:

```bash
# Clone this repository
$ git clone https://github.com/sircatalyst/flwat.git

# Enter the project directory
$ cd flwat

# Install dependencies
$ npm install

# Start the development server
$ npm run start:dev
```

With the server running, visit the endpoint below with [Postman](https://www.postman.com/) or any other api testing tool

`GET localhost:3000`

```bash
# success request to this GET localhost:3000 endpoint will return
{
  "message": "My Rule-Validation API",
  "status": "success",
  "data": {
      "name": "Temitope Bamidele",
      "github": "@sircatalyst",
      "email": "temibami@gmail.com",
      "mobile": "08134849551",
      "twitter": "@sircatalyst"
  }
}
```

#Other route:
`POST localhost:3000/validate-rule`

## Author

- **Temitope Bamidele**
