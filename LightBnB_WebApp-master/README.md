# LightBnB Project
A simple multi-page Airbnb clone that uses a server-side Javascript to display the information from queries to web pages via SQL queries. This project was for practicing connecting to and querying a database using PortgrestSQL as part of the Lighthouse Labs (LHL) Web Development bootcamp.

## Features 
- Create an account and login/logout
- Search property listings
- Create a new listing
- View your listings
- View your reservations

## Getting Started
1. Install dependencies using the `npm install` command.
2. Start the web server using the `npm run local` command.  
3. Go to http://localhost:3000 in your browser, this is where the app is served.
4. Start planning, listing, or reviewing!


## Disclaimer
This project uses some boiler-plate starter code developed by @kvirani of LHL.  Find it [here](https://github.com/lighthouse-labs/LightBnB_WebApp)

## Project Structure

```
├── db
│   ├── db.js
├── public
│   ├── index.html
│   ├── javascript
│   │   ├── components 
│   │   │   ├── header.js
│   │   │   ├── login_form.js
│   │   │   ├── new_property_form.js
│   │   │   ├── property_listing.js
│   │   │   ├── property_listings.js
│   │   │   ├── search_form.js
│   │   │   └── signup_form.js
│   │   ├── index.js
│   │   ├── libraries
│   │   ├── network.js
│   │   └── views_manager.js
│   └── styles
├── sass
└── server
  ├── apiRoutes.js
  ├── database.js
  ├── json
  ├── server.js
  └── userRoutes.js
```

* `db` contains the db.js, which is where the node-postgres database access code lives
* `public` contains all of the HTML, CSS, and client side JavaScript. 
  * `index.html` is the entry point to the application. It's the only html page because this is a single page application.
  * `javascript` contains all of the client side javascript files.
    * `index.js` starts up the application by rendering the listings.
    * `network.js` manages all ajax requests to the server.
    * `views_manager.js` manages which components appear on screen.
    * `components` contains all of the individual html components. They are all created using jQuery.
* `sass` contains all of the sass files. 
* `server` contains all of the server side and database code.
  * `server.js` is the entry point to the application. This connects the routes to the database.
  * `apiRoutes.js` and `userRoutes.js` are responsible for any HTTP requests to `/users/something` or `/api/something`. 
  * `json` is a directory that contains a bunch of dummy data in `.json` files.
  * `database.js` is responsible for all queries to the database. It doesn't currently connect to any database, all it does is return data from `.json` files.