# LightBnB Project
A simple Airbnb clone that uses server-side Javascript to display the information from queries to web pages. This project was for practicing connecting to and querying a database using PortgrestSQL as part of the Lighthouse Labs (LHL) Web Development bootcamp.  The server and client side code provided by LHL can be found [here](https://github.com/lighthouse-labs/LightBnB_WebApp).

## Features 
- Create an account and login/logout
- Search property listings
- Create a new listing
- View your listings
- View your reservations

## Getting Started

### Database
1. Install PostgreSQL if it is not already on your machine
2. Connect to the command line shell by typing `psql`
3. Create database by typing `CREATE DATABASE lightbnb`
4. Create the tables by running the migration files (ensure you are in the LightBnb root folder):

    `\i migrations/01_schema.sql`

    `\i migrations/02_additional_schema.sql`
5. Populate tables with data by running the seed files:

    `\i seeds/01_seeds.sql`
    
    `\i seeds/02_seeds.sql`

### Using the app
1. Install dependencies using the `npm install` command.
2. Start the web server in LightBnB_WebApp-master using the `npm run local` command.  
3. Rename the `.env.example` file to `.env`, and enter the following:

    `DB_PORT=3000`
    
    `DB_USER=vagrant`

    `DB_PASSWORD=123`

    `DB_HOST=localhost`

    `DB_DATABASE=lightbnb`

3. Go to http://localhost:3000 in your browser, this is where the app is served. Or use your desired port in the .env file
4. Start planning, listing, or reviewing! Sign up or use jacksonrose@hotmail.com and 'password' to trial.


## ERD
View the entity relationship diagram for the database [here](https://github.com/schmmv/LightBnb/blob/master/docs/erd.png?raw=true).

## Final Product
Login

<img src="https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/login.png?raw=true" width="50%">

View Listings

<img src="https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/listings.png?raw=true" width="50%">

Search Listings

<img src="https://github.com/schmmv/LightBnb/blob/master/docs/screenshots/search.png?raw=true" width="50%">

## Dependencies
- bcrypt
- body-parser
- cookie-session
- dotenv
- express
- nodemon
- pg (node-postgress)