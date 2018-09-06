const parseDegreeToRadians = (degrees) => degrees * (Math.PI / 180);

const calculateDistanceBetweenTwoCoordinates = (firstCoordinate, secondCoordinate) => {
  const EARTH_RADIUS = 6371;

  const deltaLatitude = parseDegreeToRadians(secondCoordinate.latitude - firstCoordinate.latitude);
  const deltaLongitude = parseDegreeToRadians(secondCoordinate.longitude - firstCoordinate.longitude);

  const haversinesInnerTerm = Math.sin(deltaLatitude / 2) * Math.sin(deltaLatitude / 2) +
    Math.cos(parseDegreeToRadians(firstCoordinate.latitude)) * Math.cos(parseDegreeToRadians(secondCoordinate.longitude)) * 
    Math.sin(deltaLongitude / 2) * Math.sin(deltaLongitude / 2);

  const haversinesOutterTerm = 2 * Math.atan2(Math.sqrt(haversinesInnerTerm), Math.sqrt(1 - haversinesInnerTerm));
  
  const distance = EARTH_RADIUS * haversinesOutterTerm;

  return distance;
};

module.exports = calculateDistanceBetweenTwoCoordinates;
