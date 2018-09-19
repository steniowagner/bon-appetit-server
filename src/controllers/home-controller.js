const EventDAO = require('../dao/event-dao');
const DishesDAO = require('../dao/dishes-dao');

const getUserLocation = require('../utils/get-user-location');
const shuffleArray = require('../utils/shuffle-array');

const MAX_ITEMS = 12;

const _getInYourCityEvents = async () => {
  const allEvents = await EventDAO.readAll();

  const eventsShuffled = shuffleArray(allEvents).slice(0, MAX_ITEMS / 2);

  const events = eventsShuffled.map(event => ({
    restaurantsParticipating: event.restaurantsParticipating,
    description: event.description,
    dishesTypes: event.dishesTypes,
    imageURL: event.imageURL,
    title: event.title,
    id: event._id,
  }));

  return events;
};

const _getYouMightLikeDishes = (allDishes) => {
  const randomDistance = Math.floor(Math.random() * (10 - 1 + 1)) + 1;

  const dishes = [];

  for (let i = 0; i < allDishes.length; i++) {
    dishes.push({
      price: allDishes[i].price.toFixed(2),
      imageURL: allDishes[i].imageURL,
      reviews: allDishes[i].reviews,
      title: allDishes[i].title,
      stars: allDishes[i].stars,
      id: allDishes[i]._id,
      distance: randomDistance,
    });
  }

  return dishes;
};

const _getPopularDishes = (allDishes) => {
  const dishes = [];

  for (let i = 0; i < allDishes.length; i++) {
    dishes.push({
      imageURL: allDishes[i].imageURL,
      price: allDishes[i].price.toFixed(2),
      title: allDishes[i].title,
      stars: allDishes[i].stars,
      id: allDishes[i]._id,
    });
  }

  return dishes;
};

const _getDishesSectionsData = async () => {
  const dishes = await DishesDAO.readAll();

  const dishesShuffled = shuffleArray(dishes);

  const youMightLikeDishes = _getYouMightLikeDishes(shuffleArray(dishesShuffled));
  const popularDishes = _getPopularDishes(shuffleArray(dishesShuffled));

  return {
    youMightLikeDishes,
    popularDishes,
  };
};

exports.getUserDashboard = async (req, res, next) => {
  const userLocation = getUserLocation();

  const inYourCityEvents = await _getInYourCityEvents();

  const { popularDishes, youMightLikeDishes } = await _getDishesSectionsData();

  return res.status(200).json({
    userLocation,
    inYourCityEvents,
    youMightLikeDishes,
    popularDishes,
  });
};
