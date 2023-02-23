# LightBnB Project
A simple Airbnb clone that uses server-side Javascript to display the information from queries to web pages. This project was for practicing connecting to and querying a database using PortgrestSQL as part of the Lighthouse Labs (LHL) Web Development bootcamp.  The server and client side code provided by LHL can be found [here](https://github.com/lighthouse-labs/LightBnB_WebApp).

## Features 
- Create an account and login/logout
- Search property listings
- Create a new listing
- View your listings
- View your reservations

## Getting Started
1. Install dependencies using the `npm install` command.
2. Start the web server in LightBnB_WebApp-master using the `npm run local` command.  
3. Go to http://localhost:3000 in your browser, this is where the app is served. Or use your own variables in a .env file
4. Start planning, listing, or reviewing! Sign up or use jacksonrose@hotmail.com and 'password' to trial.

## ERD
View the entity relationship diagram for the database [here](https://github.com/schmmv/LightBnb/blob/master/docs/erd.png?raw=true).

## Final Product
Login
![Login](https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/login.png?raw=true | width=50)

View Listings
![Listings](https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/listings.png?raw=true | width=50)

Search Listings
![Search](https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/search.png?raw=true | width=50)

## Dependencies
- bcrypt
- body-parser
- cookie-session
- dotenv
- express
- nodemon
- pg (node-postgress)