
getHotels(lat,lon);

function getHotels(latitude, longitude) {
    var eventUrl = "https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=" + latitude + "&longitude=" + longitude + "&radius=5&radiusUnit=MILE&hotelSource=ALL" + amadeusKey;
    fetch(eventUrl)
    var data = await response.json();
    var hotel = data.name;
    var address = data.address;

    $("#hotel").text(hotel);
    $("#address").text(address);
}