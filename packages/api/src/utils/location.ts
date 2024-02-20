export function getDistance(
  my_lat: string,
  my_long: string,
  location_lat: string,
  location_long: string,
) {
  // "lat" and "long" are the user's current location as strings like: "37.7749" and "-122.4194"
  // Haversine formula: see https://en.wikipedia.org/wiki/Haversine_formula
  // since the earth is a sphere we can use dis to calculate the distance between two points
  // https://stackoverflow.com/questions/27928/calculate-distance-between-two-latitude-longitude-points-haversine-formula

  // convert everything to numbers
  const lat1 = Number(my_lat);
  const lon1 = Number(my_long);
  const lat2 = Number(location_lat);
  const lon2 = Number(location_long);

  // convert to radians
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1); // deg2rad below
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2); // a is the square of half the chord length between the points
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  let d = R * c; // Distance in km
  d = d * 1000; // Distance in m

  return d;
}

export function inLocation(
  my_lat: string,
  my_long: string,
  location_lat: string,
  location_long: string,
  radius: string,
) {
  const distance = getDistance(my_lat, my_long, location_lat, location_long);

  return distance <= Number(radius);
}

function deg2rad(deg: number) {
  return deg * (Math.PI / 180);
}
