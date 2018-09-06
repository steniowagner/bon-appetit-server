const locations = [{
  latitude: 1,
  longitude: 2,
}];

const getUserLocation = () => {
  const MIN = 0;
  const MAX = locations.length - 1;

  const locationIndex = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

  return locations[locationIndex];
};

module.exports = getUserLocation;
