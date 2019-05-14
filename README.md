
# Bon-Appetit-Server

This is the back-end of the [Bon-Appetit App](https://github.com/steniowagner/bon-appetit-app). It's a RESTful API built with NodeJS, that serves all the static data that the App needs.

## About this Project

This project is part of my personal portfolio, so, I'll be happy if you could provide me any feedback about the project, code, structure or anything that you can report that could make me a better developer!

  

Email-me: stenio.wagner1@gmail.com

  

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

  

Also, you can use this Project as you wish, be for study, be for make improvements or earn money with it!

  

It's free!

## Getting Started

### Prerequisites

To run this project in the development mode, you'll need to have a basic environment with NodeJS 8+ installed. To use the database, you'll need to have MongoDB installed and running on your machine at the default port (27017).

### Installing

**Cloning the Repository**

```
$ https://github.com/steniowagner/bon-appetit-server

$ cd bon-appetit-server
```

**Installing dependencies**

```
$ yarn
```

_or_

```
$ npm install
```

### Running

Now, you'll need to change to development branch:
```
$ git checkout development
```

With all dependencies installed, the Database running and the environment properly configured, you can now run the server:

```
$ yarn dev
```

_or_

```
$ npm run dev
```

After run the server, [populate the Database](#data-management).

## Routes

The base URL is: http://localhost:3001/bon-appetit/api/v1

### Test Route

This is the route that you can use to check if the API is running properly.

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| / | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** `{ message:  "UHUL! The API is UP && RUNNING!" }`  |  **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ error:  <A Message with a description of the Error> }`|

### Data Management

This routes are used to populate and to clear the Database with a single request. All the static data  are stored at [src/json-models](https://github.com/steniowagner/bon-appetit-server/tree/master/src/json-models), but it doesn't prevent you from create new data with custom values.

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /data/populate | `POST`  | - | - |**Code:** 201 - CREATED <br />**Content:** `{ message:  "Database Filled and Ready to Use!" }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Populate the Database." }`|
| /data/clear | `DELETE`  | - | - |**Code:** 201 - CREATED <br />**Content:** `{ message:  "Database Cleared!" }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Clear the Database." }`|

### Home

Returns all the data needed to show the Gastronomic Events happening in the City, Dishes that User might like and Popular Dishes, and also returns a [random user-location](https://github.com/steniowagner/bon-appetit-server/blob/master/src/utils/get-user-location.js) as a current user location.

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /home| `GET`  |-|-|**Code:** 200 - OK<br />**Content:** <br />`{`<br />`userLocation`: [UserLocation](#user-location) <br /> `inYourCityEvents:` [[Event](#event)],<br />`youMightLikeDishes`: [[Dish](#dish)],<br />`popularDishes`: [[Dish](#dish)]<br />`}`|<br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  <A Message with a description of the Error> }`


### Dishes

This routes are used to make CRUD operations with Dishes.

- **Create a single Dish**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish | `POST`  | [Dish](#dish) | - |**Code:** 201 - CREATED <br />**Content:** `{ id: <ID of the Dish Created> }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Dish." }`
<br />

- **Create a set of Dishes in batch**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish/batch | `POST`  | [[Dish](#dish)] | - |**Code:** 201 - CREATED<br />**Content:** `{ message: "Dishes Created with Success!"}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Dishes." }`
<br />

- **Read all Dishes recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish | `GET`  | - | - |**Code:** 200 - OK <br />**Content:** `{ dishes:`[[Dish](#dish)]`}`  |  **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ error:  "Error when trying to Read All Dishes." }`
<br />

- **Read a single Dish recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish/:id | `GET`  | - | **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** `{`<br /> `dish:` [Dish](#dish),<br />`reviews:` [Review](#review),<br />`restaurant`: [Restaurant](#restaurant)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Dish Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Read Dish." }`

- **Update a Dish**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish/:id | `PATCH`  | **Required:**<br /> `Object with the Fields that will be updated`<br /><br />| **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `dishUpdated:` [Dish](#dish)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Dish Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Update Dish." }`

- **Delete a Dish**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /dish/:id | `DELETE`  | **Required**<br />-| **Required:**<br />id: String |**Code:** 201 - CREATED<br />**Content:** <br />`{`<br /> `message:  "Dish Deleted with Success!"`<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Dish Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Delete Dish." }`


### Restaurants

This routes are used to make CRUD operations with Restaurants.

- **Create a single Restaurant**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant | `POST`  | [Restaurant](#restaurant) | - |**Code:** 201 - CREATED <br />**Content:** `{ id: <ID of the Restaurant Created> }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Restaurant." }`
<br />

- **Create a set of Restaurants in batch**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/batch | `POST`  | [[Restaurant](#restaurant)] | - |**Code:** 201 - CREATED<br />**Content:** `{ message: "Restaurants Created with Success!"}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Restaurants." }`
<br />

- **Read all Restaurants recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant | `GET`  | - | - |**Code:** 200 - OK <br />**Content:** `{ dishes:`[[Restaurant](#restaurant)]`}`  |  **Code:** 500 - INTERNAL SERVER ERROR <br />**Content:** `{ error:  "Error when trying to Read All Restaurants." }`
<br />

- **Read a single Restaurant recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/:id | `GET`  | - | **Required:**<br />id: String |**Code:** 200 - OK<br /><br />**Content:** `{`<br /> `review:` [Restaurant](#restaurant)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Restaurant Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Read Restaurant." }`

- **Update a Restaurant**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/:id | `PATCH`  | **Required:**<br /> `Object with the Fields that will be updated`<br /><br />| **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `restaurantUpdated:` [Restaurant](#restaurant)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Restaurant Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Update Restaurant." }`

- **Delete an Restaurant**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/:id | `DELETE`  |-| **Required:**<br />id: String |**Code:** 201 - CREATED<br />**Content:** <br />`{`<br /> `message:  "Restaurant deleted with Success!"`<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Restaurant Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Delete Restaurant." }`

- **Get the nearest Restaurants from User**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/nearby | `GET`  |**Required:**<br />header: [UserLocation](#user-location)| **Required:**<br />query: dishesTypes=[Dish](#dish).type<br /><br />**Example**: /restaurant/nearby?dishesType=Pizza |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `restaurants`: [[Restaurant](#restaurant)]<br />`}`  |**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Read by Dishe Type." }`

- **Filter Restaurants**

Filter Restaurants based on the type of Dishes selected and the distance from the User to Restaurant .

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /restaurant/filter | `GET`  |**Required:**<br />header: [UserLocation](#user-location)| **Required:**<br />query: ``{``<br />```dishesTypes=```[Dish](#dish).type<br />```maxDistance=```[Number]<br />``}``<br /><br />**Example**: restaurant/filter?dishesTypes=Pizza&<br />dishesTypes=Dessert&<br />maxDistance=8.5 |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `restaurants`: [[Restaurant](#restaurant)]<br />`}`  |**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Filter Restaurants." }`

### Events

This routes are used to make CRUD operations with Events.

- **Create a single Event**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event | `POST`  | [Event](#event) | - |**Code:** 201 - CREATED<br />**Content:** `{ id: <ID of the Event Created> }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Event." }`
<br />

- **Create a set of Events in batch**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event/batch | `POST`  | [[Event](#event)] | - |**Code:** 201 - CREATED<br />**Content:** `{ message: "Events Created with Success!"}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Events." }`
<br />

- **Read all Events recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** `{ dishes:`[[Event](#event)]`}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Read All Events." }`
<br />

- **Read a single Event recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event/:id | `GET`  | - | **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** `{`<br /> `restaurants:` [[Restaurant](#restaurant)],<br />`event:` [Event](#event)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Event Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Read Event." }`

- **Update an Event**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event/:id | `PATCH`  | **Required:**<br /> `Object with the Fields that will be updated`<br /><br />| **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `eventUpdated:` [Event](#event)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Event Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Update Event." }`

- **Delete an Event**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /event/:id | `DELETE`  |-| **Required:**<br />id: String |**Code:** 201 - CREATED<br />**Content:** <br />`{`<br /> `message:  "Event deleted with Success!"`<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Event Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Delete Event." }`

### Reviews

This routes are used to make CRUD operations with Reviews.

- **Create a single Review**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review | `POST`  | [Review](#review) | - |**Code:** 201 - CREATED<br />**Content:** `{ id: <ID of the Review Created> }`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Review." }`
<br />

- **Create a set of Reviews in batch**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review/batch | `POST`  | [[Review](#review)] | - |**Code:** 201 - CREATED<br />**Content:** `{ message: "Reviews Created with Success!"}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Create Reviews." }`
<br />

- **Read all Reviews recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review | `GET`  | - | - |**Code:** 200 - OK<br />**Content:** `{ dishes:`[[Review](#review)]`}`  |  **Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ error:  "Error when trying to Read All Reviews." }`
<br />

- **Read a single Review recorded from Database**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review/:id | `GET`  | - | **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** `{`<br /> `review:` [Review](#review)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Review Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Read Review." }`

- **Update a Review**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review/:id | `PATCH`  | **Required:**<br /> `Object with the Fields that will be updated`<br /><br />| **Required:**<br />id: String |**Code:** 200 - OK<br />**Content:** <br />`{`<br /> `reviewUpdated:` [Review](#event)<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Review Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Update Review." }`

- **Delete a Review**

| URL | Method | Params | URL Params | Success Response | Error Response
|--|--|--|--|--|--|
| /review/:id | `DELETE`  |-| **Required:**<br />id: String |**Code:** 201 - CREATED<br />**Content:** <br />`{`<br /> `message:  "Review deleted with Success!"`<br />`}`  |**Code**: 400 - BAD REQUEST<br />**Content**: `{ message:  "The field id is required." }`<br /><br />or<br /><br />**Code:** 404 - NOT FOUND<br />**Content:** `{ message:  "Review Not Found." }`<br /><br />or<br /><br />**Code:** 500 - INTERNAL SERVER ERROR<br />**Content:** `{ message:  "Error when trying to Delete Review." }`

### Models

### Dish

```json
{
   "imageURL":  {
      "type":  "String",
      "required":  true
   },
   "thumbnailImageURL":  {
      "type":  "String",
      "required":  true
   },
   "mediumImageURL":  {
      "type":  "String",
      "required":  true
   },
   "title":  {
      "type":  "String",
      "required":  true
   },
   "description":  {
      "type":  "String",
      "required":  true
   },
   "type":  {
      "type":  "String",
      "enum": [
	      "Barbecue",
	      "Dessert",
	      "Fast-Food",
	      "Homemade",
	      "Japanese",
	      "Pasta",
	      "Pizza",
	      "Salad",
	      "Seafood"
	   ],
      "required":  true
},
   "stars":  {
      "type":  "String",
      "required":  true
},
   "reviews":  {
      "type":  "String",
      "required":  true
   },
   "price":  {
      "type":  "String",
      "required":  true
   },
   "ingredients":  {
      "type":  "[String]",
      "required":  true
   }
}
```

### Restaurant

```json
{
   "imageURL": {
      "type": "String",
      "required": true
   },
   "thumbnailImageURL": {
      "type": "String",
      "required": true
   },
   "mediumImageURL": {
      "type": "String",
      "required": true
   },
   "name": {
      "type": "String",
      "required": true
   },
   "description": {
      "type": "String",
      "required": true
   },
   "stars": {
      "type": "Number",
      "required": true
   },
   "location": {
      "coordinates": {
         "type": "[Number]",
         "default": [0, 0]
      },
      "address": {
         "type": "String",
         "required": true
      }
   },
   "operatingHours": {
      "open": {
         "type": "String",
         "required": true
      },
      "close": {
         "type": "String",
         "required": true
      }
   },
   "dishesTypes": [
      {
         "type": "String",
         "enum": [
            "Barbecue",
            "Dessert",
            "Fast-Food",
            "Homemade",
            "Japanese",
            "Pasta",
            "Pizza",
            "Salad",
            "Seafood"
         ],
         "required": true
     }
   ]
}
```

### Event

```json
{
   "imageURL": {
      "type": "String",
      "required": true
   },
   "thumbnailImageURL": {
      "type": "String",
      "required": true
   },
   "mediumImageURL": {
      "type": "String",
      "required": true
   },
   "smallImageURL": {
      "type": "String",
      "required": true
   },
   "title": {
      "type": "String",
      "required": true
   },
   "description": {
      "type": "String",
      "required": true
   },
   "dishesTypes": [
      {
         "type": "String",
         "enum": [
            "Barbecue",
            "Dessert",
            "Fast-Food",
            "Homemade",
            "Japanese",
            "Pasta",
            "Pizza",
            "Salad",
            "Seafood"
         ],
         "required": true
     }
],
   "restaurantsParticipating": {
      "type": "Number",
      "required": true
   }
}
```

### Review

```json
{
   "profileImageURL": {
      "type": "String",
      "required": true
   },
   "name": {
      "type": "String",
      "required": true
   },
   "review": {
      "type": "String",
      "required": true
   },
   "stars": {
      "type": "Number",
      "required": false,
      "default":  0
   }
}
```

### User Location
```json
{
   "latitude": "Number",
   "longitude: "Number",
}
```

## Built With

- [NodeJS](https://nodejs.org/en/) - Build the server
- [Heroku](https://www.heroku.com/) - PaaS used in the production
- [Body-Parser](https://github.com/expressjs/body-parser#readme) - Node.js body parsing middleware
- [Express](https://expressjs.com/) - Router of the Application
- [MongoDB](https://www.mongodb.com/) - Database
- [Mongoose](https://mongoosejs.com/) - Object Modeling
- [PM2](http://pm2.keymetrics.io/) - Process Manager used in the production
- [Nodemon](https://nodemon.io/) - Process Manager used in the development
- [Debug](https://github.com/visionmedia/debug) - Debug in development
- [Dotenv](https://github.com/motdotla/dotenv) - Environment loader

## Support tools

- [Image-Resize](https://imageresize.org) - Resize the Images
- [Unsplash](https://unsplash.com) - Source of the Images
- [Tabs and Tidbits](http://www.tabsandtidbits.com) - Dishes Recipes
- [Recipe Tin Eats](https://www.recipetineats.com) - Dishes Recipes
- [Japan - Recipe Tin Eats](https://japan.recipetineats.com) - Japanese Dishes Recipes
- [BBC Good Food](https://www.bbcgoodfood.com) - Dishes Recipes
- [Trip Advisor](https://www.tripadvisor.com.br) - Restaurants Information
- [LatLong](https://www.latlong.net) - Convert Address to LatLong coordinates
- [Amazon S3](https://aws.amazon.com/pt/s3/) - Storage Service

## Contributing

You can send how many PR's do you want, I'll be glad to analyse and accept them! And if you have any question about the project...

Email-me: stenio.wagner1@gmail.com

Connect with me at [LinkedIn](https://www.linkedin.com/in/steniowagner/)

Thank you!

## License

This project is licensed under the MIT License - see the [LICENSE.md](https://github.com/steniowagner/bon-appetit-server/blob/master/LICENSE) file for details
