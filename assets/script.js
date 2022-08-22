var searchBtn = document.getElementById('search-btn'); //search button
var recentBtn = document.getElementById('recent-Search'); // Recent search button
var results = document.querySelector('.results');
var seatGKey = '&client_id=Mjg0MDM3MzJ8MTY2MDI2NjExNi40MzgwNDU';
var lastSearch = localStorage.getItem("lastSearch");

//---------------------------------------------------------------------------------------------------------------------
// This function will check if the input is blank; OR
// If input has more than 1 word, the spaces will be replaced with dashes
//---------------------------------------------------------------------------------------------------------------------
function checkArtist(event) {
    event.preventDefault();
    clearShows();
    var searchInput = document.getElementById('artists-search').value; //gets input from the user
    if (searchInput == '') {
        return;
    } else {
        searchInput = searchInput.replace(/\s+/g,'-');
        localStorage.setItem("lastSearch", searchInput); 
        console.log('Successfully replaced ' + searchInput);
        console.log(lastSearch)
        clearShows();
        getPerformerId(searchInput);
    }
}

// Returns user to their last searched artist upcoming concerts
function recentSearch() {
    if (lastSearch == '') {
        return;
    } else {
        lastSearch = lastSearch.replace(/\s+/g,'-');
        localStorage.setItem("lastSearch", lastSearch); 
        console.log('Successfully replaced ' + lastSearch);
        console.log(lastSearch)
        clearShows();
        getPerformerId(lastSearch);
    }

}

//---------------------------------------------------------------------------------------------------------------------
//  1st call will get the performers ID
//---------------------------------------------------------------------------------------------------------------------
function getPerformerId(artist) {
    var perfUrl = 'https://api.seatgeek.com/2/performers?slug='+ artist +seatGKey;

    fetch(perfUrl)
        .then(function (response) {
        if(!response.ok){  
            throw response.json();
        } else {
            return response.json();
        }
        })
        .then(function (perfData) {
            console.log('PerfData OK', perfData);
            if(perfData.performers.length == 0) {  //if no array in performers then return
                console.log('No artist or ID found');
                $('##event-title').text('No artist found! Try searching another artist.')
                return;
            } else {
                var perfID = perfData.performers[0].id; // gets the performer ID
                console.log('The perf ID is '+ perfID);}
                var hasEvents = perfData.performers[0].has_upcoming_events; 
                if(hasEvents == false) { //checks if the artist has upcoming shows
                    console.log('No events');
                    $('#event-title').text('No upcoming shows');
                    $('#artist').text('for ' + perfData.performers[0].name)
                    return;
                } else {
                    $('#artist').text('for ' + perfData.performers[0].name);
                    getEventInfo(perfID);
                }
        })
}

//---------------------------------------------------------------------------------------------------------------------
//  2nd call uses performer ID to search for events
//---------------------------------------------------------------------------------------------------------------------
function getEventInfo(ID) {
    var eventUrl = 'https://api.seatgeek.com/2/events?performers.id='+ID+seatGKey;
    fetch(eventUrl)
    .then(function (response) {
        if(!response.ok){  
            throw response.json();
        } else {
            return response.json();
        }
        })
        .then(function (eventData) {
            console.log('EventData OK', eventData);  
            for(var i = 0; i < 5; i++) {
                var block = i;
                var artist = eventData.events[i].performers[0].name;
                var eventTitle = eventData.events[i].title;
                var venueName = eventData.events[i].venue.name;
                var venueCity = eventData.events[i].venue.city;
                var venueState = eventData.events[i].venue.state;
                var price = eventData.events[i].stats.average_price;
                var utc = eventData.events[i].datetime_utc;
                var reformatDate = moment(utc).format('dddd, MMMM Do YYYY, h:mm a');
                var tUrl = eventData.events[i].url;
                var lat = eventData.events[i].venue.location.lat; //VENUE COORDINATES TO USE FOR HOTEL API
                var lon = eventData.events[i].venue.location.lon; //VENUE COORDINATES TO USE FOR HOTEL API
                getHotels(block, lat, lon, artist, eventTitle, venueName, venueCity, venueState, price, reformatDate, tUrl);
            }
        })
}


//uses amadeus api to pull hotels by latitude and longitude using location data from the getInfoID method and modifys text block to display hotel's name and distance from venue
 function getHotels(block, latitude, longitude, artist, eventTitle, venueName,venueCity,venueState,price,reformatDate,tUrl) {
    var tempKey = "";
    const options = {
        method: 'POST',
        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        body: new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: 'ytPwFK6RBADmgdzCcjDKnyCUuDSMBpsS',
          client_secret: 'I01l7AoppjGOv3Pw'
        })
      };
     
      fetch('https://api.amadeus.com/v1/security/oauth2/token', options)
        .then(response => response.json())
        .then(response => {
            tempKey = response.access_token
            const options1 = {method: 'GET', headers: {Authorization: 'Bearer '+ tempKey}}; 
            var eventUrl = "https://api.amadeus.com/v1/reference-data/locations/hotels/by-geocode?latitude=${i}&longitude=${i}" + longitude[i] + "&radius=5&radiusUnit=MILE&hotelSource=ALL";
            fetch(eventUrl,options1)
            .then(amadeus => amadeus.json())
            .then(function (data) {
                    var resultsHTML = results.innerHTML;
                    var hotel = data.data[0].name; 
                    console.log(hotel);
                 
                resultsHTML += `
                <tr class="bg-indigo-100 border-b">
                    <th scope="row" class="py-4 px-6 font-bold text-indigo-900 whitespace-nowrap">
                        <span class="text-m text-indigo-900" id="event-title">${eventTitle}</span>
                    </th>
                    <td class="py-4 px-6 text-indigo-900">
                        <span class="text-m text-indigo-900" id="venue-name">${venueName}</span> <br>
                        <span class="text-m text-indigo-900" id="venue-city">${venueCity}</span>
                        <span class="text-m text-indigo-900" id="venue-state">, ${venueState}</span>
                    </td>
                    <td class="py-4 px-6 text-indigo-900">
                        <span class="text-m text-indigo-900" id="date">${reformatDate}</span>
                    </td>
                    <td class="py-4 px-6 text-indigo-900">
                        <span class="text-m text-indigo-900" id="price">${price}</span>
                    </td>
                    <td class="py-4 px-6 text-indigo-900">
                        <span class="text-m text-indigo-900" id="hotelName">${hotel}</span> 
                    </td> 
                    <td class="py-4 px-6">
                        <a href="${tUrl}" target="_blank" id="ticket-url" class="font-medium text-blue-600 dark:text-blue-500 hover:underline">Get Tickets</a><br>
                    </td>
                    
                </tr>
                `
                results.innerHTML = resultsHTML;
            }
            )
        }
        )
        .catch(err => console.error(err));
    }
     
//clears search results
function clearShows() {
    while (results.children.length > 1) {
        results.removeChild(results.lastChild);
    }
    $('#artist').text('');$('#event-title').text('');$('#venue-name').text(''); $('#venue-city').text(''); $('#venue-state').text(''); $('#date').text(''); $('#price').text(''); $('#ticket-url').text('');$('#hotelName').text('');$('#hotelDistance').text('');
}

//---------------------------------------------------------------------------------------------------------------------
//  EVENT LISTENER
//---------------------------------------------------------------------------------------------------------------------
searchBtn.addEventListener('click', checkArtist);
recentBtn.addEventListener('click', recentSearch);