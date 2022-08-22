# scottstots

## Project Title: Concerteer

## Project Description

In this project we will be building a responsive website that allows you to search for an event, venue, or artist  and will display their most popular songs and their upcoming events. Once an event is selected and a ticket is purchased, the user will be able to see a list of hotels around the venue for their potential stay and book.


## User Story
```
As a music lover I am searching for my favorite artists upcoming shows. 
I then want to see upcoming concerts and see which hotel is closest in the city where the event is held.
I also want to be able to got back to my last search.
- ex: user enters “bad bunny” into the search bar the table will update to display the date, location, ticket price, closest hotel, and a link to get tickets.

```
## Process

1st API (SEATGEEK) gets
- list of performers 
- ex: GET https://api.seatgeek.com/2/performers?q=red+hot&client_id=Mjg0MDM3MzJ8MTY2MDI2NjExNi40MzgwNDU
- Use insomnia to generate the JS code
- get the performer ID from the fetch request
- use the performer ID to get their event info (venue name, address, city, zip, etc)
- ex: GET https://api.seatgeek.com/2/events?performers.id=9052&client_id=Mjg0MDM3MzJ8MTY2MDI2NjExNi40MzgwNDU
- use location info for 2nd API

2nd API (AMADEUS) TAKES the VENUE address/city from 1st API
- find hotels nearby to the venue of the concert

The code works down the two apis to fill information for an event then updates the html before beginning the process again up to 5 times.

## Wireframes

### Landing
![image](https://user-images.githubusercontent.com/30813052/185257820-b5bff0d5-649b-4dd8-b42a-c38bc7a3ab7f.png)

### Search Results
![image](https://user-images.githubusercontent.com/30813052/185257853-3ea5874b-d558-4da5-aaa9-3b998df66f36.png)

### Saved Search
![image](https://user-images.githubusercontent.com/30813052/185257937-18b74416-7488-471b-8665-50a737f8c15c.png)

