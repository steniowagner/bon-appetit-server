const locations = [{
  latitude: -3.723481,
  longitude: -38.519582,
}, {
  latitude: -3.747423,
  longitude: -38.463484,
}, {
  latitude: -3.768328,
  longitude: -38.551830,
}, {
  latitude: -3.785387,
  longitude: -38.573802,
}, {
  latitude: -3.817512,
  longitude: -38.574977,
}, {
  latitude: -3.820337,
  longitude: -38.481324,
}, {
  latitude: -3.823885,
  longitude: -38.547935,
}, {
  latitude: -3.741800,
  longitude: -38.566323,
}, {
  latitude: -3.712222,
  longitude: -38.572331,
}, {
  latitude: -3.802650,
  longitude: -38.507777
}, {
  latitude: -3.748046,
  longitude: -38.502184,
}, {
  latitude: -3.732947,
  longitude: -38.497029
}, {
  latitude: -3.765245,
  longitude: -38.487598,
}, {
  latitude: -3.744699,
  longitude: -38.495637,
}, {
  latitude: -3.732436,
  longitude: -38.509978,
}, {
  latitude: -3.728820,
  longitude: -38.521255,
}, {
  latitude: -3.747471,
  longitude: -38.516713,
}];

const getUserLocation = () => {
  const MIN = 0;
  const MAX = locations.length - 1;

  const randomIndex = Math.floor(Math.random() * (MAX - MIN + 1)) + MIN;

  return locations[randomIndex];
};

module.exports = getUserLocation;
