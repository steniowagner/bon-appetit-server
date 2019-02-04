const RestaurantDAO = require("../dao/restaurant-dao");
const ReviewDAO = require("../dao/review-dao");
const DishesDAO = require("../dao/dish-dao");

const calculateDistanceCoordinates = require("../utils/calculate-distance-coordinates");
const shuffleArray = require("../utils/shuffle-array");

const MAX_NEARBY_RESTAURANTS = 10;
const MAX_DISHES_MENU = 10;

const _getRandomNumber = (minValue, maxValue) => {
  const randomNumber =
    Math.floor(Math.random() * (maxValue - minValue + 1)) + minValue;

  return randomNumber;
};

const _getDishReviews = allReviews => {
  const numberOfReviews = _getRandomNumber(1, allReviews.length);
  const shuffledReviews = shuffleArray(allReviews);

  return shuffledReviews.slice(0, numberOfReviews);
};

const _getMenuDishes = (allReviews, allDishes, dishType) => {
  const dishesFilteredByType = allDishes.filter(
    dishe => dishe.type === dishType
  );
  const shuffledDishes = shuffleArray(dishesFilteredByType);
  const dishes = shuffledDishes.slice(0, MAX_DISHES_MENU);

  const menu = dishes.map(dish => {
    const userReviews = _getDishReviews(allReviews);
    return {
      ...dish,
      userReviews
    };
  });

  return menu;
};

const _getRestaurantMenu = async dishesTypes => {
  const dishes = await DishesDAO.readBasedDishesType(dishesTypes);
  const allReviews = await ReviewDAO.readAll();

  const menu = [];

  dishesTypes.forEach(dishType => {
    const menuDishes = _getMenuDishes(allReviews, dishes, dishType);

    menu.push({
      type: dishType,
      dishes: menuDishes
    });
  });

  return menu;
};

const _filterRestaurantsBasedDistance = (
  restaurants,
  maxDistance,
  userLocation
) => {
  const nearRestaurants = restaurants.filter(restaurant => {
    const { coordinates } = restaurant.location;

    const distanceBetweenCoordinates = calculateDistanceCoordinates(
      userLocation,
      {
        latitude: coordinates[0],
        longitude: coordinates[1]
      }
    );

    const isInsideSearchRadius = distanceBetweenCoordinates <= maxDistance;

    return isInsideSearchRadius;
  });

  return nearRestaurants;
};

const _getAllNearestRestaurants = async (maxDistance, userLocation) => {
  const allRestaurants = await RestaurantDAO.readAll();

  const restaurants = _filterRestaurantsBasedDistance(
    allRestaurants,
    maxDistance,
    userLocation
  );

  return restaurants;
};

const _filteredRestaurantsBasedDishType = async (
  dishesTypes,
  maxDistance,
  userLocation
) => {
  const dishes = Array.isArray(dishesTypes) ? dishesTypes : [dishesTypes];

  const restaurantsFilteredByDishesTypes = await RestaurantDAO.filterBasedDishesTypes(
    dishes
  );

  const restaurantsParsed = restaurantsFilteredByDishesTypes.map(item => ({
    ...item.restaurants[0],
    id: item.restaurants[0]._id
  }));

  const restaurants = _filterRestaurantsBasedDistance(
    restaurantsParsed,
    maxDistance,
    userLocation
  );

  return restaurants;
};

const _handleDistanceBetweenUserAndRestaurant = (
  rawUserLocation,
  restaurant
) => {
  const { userlatitude, userlongitude } = rawUserLocation;

  const userLocation = {
    latitude: parseFloat(userlatitude),
    longitude: parseFloat(userlongitude)
  };

  const restaurantLocation = {
    latitude: restaurant.location.coordinates[0],
    longitude: restaurant.location.coordinates[1]
  };

  const distance = calculateDistanceCoordinates(
    userLocation,
    restaurantLocation
  );

  return distance.toFixed(1);
};

exports.create = async (req, res, next) => {
  try {
    const { id } = await RestaurantDAO.create(req.body);

    return res.status(201).json({
      message: "Restaurant created with Success!",
      id
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.createInBatch = async (req, res, next) => {
  try {
    await RestaurantDAO.createInBatch(req.body);

    return res.status(201).json({
      message: "Restaurant created with Success!"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.readAll = async (req, res, next) => {
  try {
    const restaurants = await RestaurantDAO.readAll();

    return res.status(200).json({
      restaurants
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.readById = async (req, res, next) => {
  try {
    const { headers, params } = req;
    const { id } = params;

    if (!headers.userlatitude || !headers.userlongitude) {
      return res.status(400).json({
        message: "User Location is required."
      });
    }

    const restaurantFromDB = await RestaurantDAO.readById(id);
    const distanceBetweenCoordinates = _handleDistanceBetweenUserAndRestaurant(
      headers,
      restaurantFromDB
    );

    const menu = await _getRestaurantMenu(restaurantFromDB.dishesTypes);
    const isOpen = _getRandomNumber(1, 2) % 2 === 0;

    return res.status(200).json({
      restaurant: {
        ...restaurantFromDB._doc,
        id: restaurantFromDB._doc._id,
        distance: distanceBetweenCoordinates,
        isOpen
      },
      menu
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.update = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        message: `The field 'id' mandatory.`
      });
    }

    const restaurant = await RestaurantDAO.update(id, { ...req.body });

    if (restaurant) {
      return res.status(200).json({
        restaurant
      });
    }

    return res.status(404).json({
      message: "Restaurant Not Found"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { id } = req.params;

    const restaurantDeleted = await RestaurantDAO.delete(id);

    if (restaurantDeleted) {
      return res.status(200).json({
        message: "Restaurant Deleted with Success!"
      });
    }

    return res.send(404).json({
      message: "Restaurant Not Found"
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.getNearbyRestaurants = async (req, res, next) => {
  try {
    const { headers, query } = req;
    const { dishesType } = query;

    if (!headers.userlatitude || !headers.userlongitude) {
      return res.status(400).json({
        message: "User Location is required."
      });
    }

    const restaurantsFilteredByDishTypes = await RestaurantDAO.filterBasedDishesTypes(
      [dishesType]
    );

    const restaurants = restaurantsFilteredByDishTypes
      .map(item => ({
        ...item.restaurants[0],
        id: item.restaurants[0]._id,
        location: {
          latitude: item.restaurants[0].location.coordinates[0],
          longitude: item.restaurants[0].location.coordinates[1]
        },
        distance: _handleDistanceBetweenUserAndRestaurant(
          headers,
          item.restaurants[0]
        ),
        isOpen: _getRandomNumber(1, 2) % 2 === 0
      }))
      .sort((first, second) => {
        return first.distance - second.distance;
      });

    return res.status(200).json({
      restaurants: restaurants.slice(0, MAX_NEARBY_RESTAURANTS)
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};

exports.filter = async (req, res, next) => {
  try {
    const { query, headers } = req;
    const { dishesTypes, maxDistance } = query;
    const { userlatitude, userlongitude } = headers;

    if (!dishesTypes) {
      return res.status(400).json({
        message: "Dishes Types is required."
      });
    }

    if (!maxDistance) {
      return res.status(400).json({
        message: "Max Distance is required."
      });
    }

    if (!userlatitude || !userlongitude) {
      return res.status(400).json({
        message: "User Location is required."
      });
    }

    const userLocation = {
      latitude: parseFloat(userlatitude),
      longitude: parseFloat(userlongitude)
    };

    const restaurants =
      dishesTypes === "all"
        ? await _getAllNearestRestaurants(maxDistance, userLocation)
        : await _filteredRestaurantsBasedDishType(
            dishesTypes,
            maxDistance,
            userLocation
          );

    return res.status(200).json({
      restaurants
    });
  } catch (error) {
    return res.status(500).json({
      error
    });
  }
};
