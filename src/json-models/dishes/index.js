const barbecue = require("./barbecue/data.json");
const dessert = require("./dessert/data.json");
const fastFood = require("./fast-food/data.json");
const homemade = require("./homemade/data.json");
const pasta = require("./pasta/data.json");
const pizza = require("./pizza/data.json");
const salad = require("./salad/data.json");
const seafood = require("./seafood/data.json");
const japanese = require("./japanese/data.json");

const dishes = [
  ...barbecue,
  ...dessert,
  ...fastFood,
  ...homemade,
  ...pasta,
  ...pizza,
  ...salad,
  ...seafood,
  ...japanese
];

module.exports = dishes;
