const EventDAO = require("../dao/event-dao");
const DishDAO = require("../dao/dish-dao");

const getUserLocation = require("../utils/get-user-location");
const shuffleArray = require("../utils/shuffle-array");

const MAX_ITEMS_PER_SECTION = 10;

const _getInYourCityEvents = async () => {
  const allEvents = await EventDAO.readAll();

  const events = shuffleArray(allEvents).slice(0, MAX_ITEMS_PER_SECTION);

  return events;
};

const _getDishesSectionsData = async () => {
  const dishes = await DishDAO.readAll();
  const dishesShuffled = shuffleArray(dishes);

  const popularDishesShuffled = shuffleArray(dishesShuffled);
  const popularDishes = popularDishesShuffled.slice(0, MAX_ITEMS_PER_SECTION);

  const youMightLikeDishesShuffled = shuffleArray(dishesShuffled);
  const youMightLikeDishes = youMightLikeDishesShuffled.slice(
    0,
    MAX_ITEMS_PER_SECTION
  );

  return {
    youMightLikeDishes,
    popularDishes
  };
};

exports.getHomeData = async (req, res, next) => {
  const { popularDishes, youMightLikeDishes } = await _getDishesSectionsData();
  const inYourCityEvents = await _getInYourCityEvents();
  const userLocation = getUserLocation();

  return res.status(200).json({
    userLocation,
    inYourCityEvents,
    youMightLikeDishes,
    popularDishes
  });
};
