const pool = require('./db');

/// Users
/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithEmail = function(email) {
  return pool
    .query(`
      SELECT * 
      FROM users 
      WHERE email = $1;`, [email])
    .then((result) => result.rows[0] || null);
    //bubble up to userRoutes for error handling

};
exports.getUserWithEmail = getUserWithEmail;

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
const getUserWithId = function(id) {
  return pool
    .query(`
      SELECT * 
      FROM users 
      WHERE id = $1;`, [id])
    .then((result) => result.rows[0] || null);
   //bubble up to userRoutes for error handling
};
exports.getUserWithId = getUserWithId;

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
const addUser =  function(user) {
  return pool
    .query(`
      INSERT INTO users (name, email, password) 
      VALUES ($1, $2, $3) RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => result.rows[0]);
    //bubble up to userRoutes for error handling

};
exports.addUser = addUser;

/// Reservations
/**
 * Get all reservations for a single user.
 * @param {string} guest_id The id of the user.
 * @return {Promise<[{}]>} A promise to the reservations.
 */
const getAllReservations = function(guest_id, limit = 10) {
  return pool
    .query(`
      SELECT reservations.*, properties.*, AVG(property_reviews.rating) AS average_rating 
      FROM reservations
      JOIN properties ON reservations.property_id = properties.id
      JOIN property_reviews ON properties.id = property_reviews.property_id
      WHERE reservations.guest_id = $1
      GROUP BY properties.id, reservations.id
      ORDER BY start_date
      LIMIT $2;`, [guest_id, limit])
    .then((result) => result.rows);
    //bubble up to apiRoutes for error handling
};
exports.getAllReservations = getAllReservations;

/// Properties
/**
 * Get all properties.
 * @param {{}} options An object containing query options.
 * @param {*} limit The number of results to return.
 * @return {Promise<[{}]>}  A promise to the properties.
 */
const getAllProperties = function(options, limit = 10) {

  const queryParams = [];
  let conjunction;
  let queryString = `
    SELECT properties.*, AVG(property_reviews.rating) AS average_rating
    FROM properties
    LEFT JOIN property_reviews ON properties.id = property_id`;

  //Add to queryString if any search filter options have been used
  if (options.city) {
    queryParams.push(`%${options.city}%`);
    queryString += `
      WHERE city LIKE $${queryParams.length}`;
  }
  if (options.owner_id) {
    const conjunction = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.owner_id);
    queryString += `
      ${conjunction} properties.owner_id = $${queryParams.length}`;
  }
  //price_per_night multiplied by 100 since database stores it as cents
  if (options.minimum_price_per_night) {
    conjunction = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.minimum_price_per_night * 100);
    queryString += `
      ${conjunction} cost_per_night >= $${queryParams.length}`;
  }
  if (options.maximum_price_per_night) {
    conjunction = queryParams.length > 0 ? 'AND' : 'WHERE';
    queryParams.push(options.maximum_price_per_night * 100);
    queryString += `
      ${conjunction} cost_per_night <= $${queryParams.length}`;
  }
  //Group by property 
  queryString += `
    GROUP BY properties.id`;

  //Apply rating condition to grouped properties 
  if (options.minimum_rating) {
    queryParams.push(options.minimum_rating);
    queryString += `
      HAVING AVG(property_reviews.rating) >= $${queryParams.length}`;
  }
  
  queryParams.push(limit);
  queryString += `
    ORDER BY cost_per_night
    LIMIT $${queryParams.length};`;

  return pool
    .query(queryString, queryParams)
    .then((result) => result.rows);
    //bubble up to apiRoutes for error handling
};
exports.getAllProperties = getAllProperties;

/**
 * Add a property to the database
 * @param {{}} property An object containing all of the property details.
 * @return {Promise<{}>} A promise to the property.
 */
const addProperty = function(property) {
  return pool
    .query(`
      INSERT INTO properties (
        title, 
        description, 
        owner_id, 
        cover_photo_url, 
        thumbnail_photo_url, 
        cost_per_night, 
        parking_spaces, 
        number_of_bathrooms, 
        number_of_bedrooms, 
        province, 
        city, 
        country, 
        street, 
        post_code) 
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
    RETURNING *`, [
      property.title,
      property.description,
      property.owner_id,
      property.cover_photo_url,
      property.thumbnail_photo_url,
      property.cost_per_night * 100,
      property.parking_spaces,
      property.number_of_bathrooms,
      property.number_of_bedrooms,
      property.province,
      property.city,
      property.country,
      property.street,
      property.post_code])
    .then((result) => result.rows[0]);
    //bubble up to apiRoutes for error handling
};
exports.addProperty = addProperty;
