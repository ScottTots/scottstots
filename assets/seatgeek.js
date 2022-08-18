var searchBtn = document.getElementById('search-btn'); //search button

var seatGKey = '&client_id=Mjg0MDM3MzJ8MTY2MDI2NjExNi40MzgwNDU';

//---------------------------------------------------------------------------------------------------------------------
// This function will check if the input is blank; OR
// If input has more than 1 word, the spaces will be replaced with dashes
//---------------------------------------------------------------------------------------------------------------------
function checkArtist(event) {
    event.preventDefault();
    var searchInput = document.getElementById('artists-search').value; //gets input from the user
    if (searchInput == '') {
        return;
    } else {
        searchInput = searchInput.replace(/\s+/g,'-');
        console.log('Successfully replaced ' + searchInput);
        getPerformerId(searchInput);
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
            console.log('Data OK', perfData);
            if(perfData.performers.length == 0) {  //if no array in performers then return
                console.log('No artist or ID found');
                $('#artist').text('No results found. Search another artist.');
                $('#artist-img').attr('src', '');
                return;
            } else {
                var perfID = perfData.performers[0].id; // gets the performer ID
                console.log('This is the ID '+ perfID);}
                //localStorage.setItem('performerID', perfID);
                var hasEvents = perfData.performers[0].has_upcoming_events; 
                if(hasEvents == false) { //checks if the artist has upcoming shows
                    console.log('No events');
                    $('#event-title').text('No upcoming events');
                    $('#artist').text(perfData.performers[0].name)
                    var imgSrc = perfData.performers[0].image;
                    $('#artist-img').attr('src', imgSrc);
                    return;
                } else {
                    $('#artist').text(perfData.performers[0].name);
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
            console.log('Data OK', eventData);  
            //This should be changed in final code to create the results list using for loop. This is just demo-ing to ensure data is getting pulled properly
            $('#artist').text(eventData.events[0].performers[0].name);
            $('#event-title').text(eventData.events[0].title);
            $('#venue-name').text(eventData.events[0].venue.name);
            $('#venue-city').text(eventData.events[0].venue.city + ', ');
            $('#venue-state').text(eventData.events[0].venue.state);

            var utc = eventData.events[0].datetime_utc;
            var reformatDate = moment(utc).format('dddd, MMMM Do YYYY, h:mm a');

            $('#date').text(reformatDate); 
            $('#price').text('$' + eventData.events[0].stats.average_price);

            var tUrl = eventData.events[0].url;
            $('#ticket-url').attr('href', tUrl);

            var imgSrc = eventData.events[0].performers[0].image;
            $('#artist-img').attr('src', imgSrc);

            var lat = eventData.events[0].venue.location.lat; //VENUE COORDINATES TO USE FOR HOTEL API
            var lon = eventData.events[0].venue.location.lon; //VENUE COORDINATES TO USE FOR HOTEL API
})
}


//---------------------------------------------------------------------------------------------------------------------
//  EVENT LISTENER
//---------------------------------------------------------------------------------------------------------------------
searchBtn.addEventListener('click', checkArtist);
