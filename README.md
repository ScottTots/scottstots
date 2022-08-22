# scottstots

## Project Title: Concerteer
URL: https://scotttots.github.io/scottstots/

## Project Description

In this project we will be building a responsive website that allows you to search for an event, venue, or artist  and will display their most popular songs and their upcoming events. Once an event is selected and a ticket is purchased, the user will be able to see a list of hotels around the venue for their potential stay and book.


## User Story
```
As a music lover I am searching for my favorite artists upcoming shows. 
I then want to see upcoming shows and see hotels in the city where the event is held.
- A PERFORMER or an event of interest
- ex: user enters “Bad Bunny” into the search bar
I then want to see upcoming concerts and see which hotel is closest in the city where the event is held.
I also want to be able to got back to my last search.
- ex: user enters “bad bunny” into the search bar the table will update to:
1. display the date, 
2. location, 
3. ticket price, 
4. closest hotel, 
5. and a link to get tickets.

```
## Process

1st API (SEATGEEK) gets
- list of performers 
- Use insomnia to generate the JS code
- get the performer ID from the fetch request
- use the performer ID to get their event info (venue name, address, city, zip, etc)
- use location info for 2nd API


2nd API (AMADEUS) TAKES the VENUE geolocation coordinates from 1st API
- find hotels nearby
- save recent searches using local storage
- limited amount of results shown on page to 5

2nd API (AMADEUS) TAKES the VENUE address/city from 1st API
- find hotels nearby to the venue of the concert

The code works down the two apis to fill information for an event then updates the html before beginning the process again up to 5 times.


## Screenshots

![Concerteer Bad Bunny Search](https://user-images.githubusercontent.com/30813052/185979379-b6085ad0-6c78-46a6-bcb7-c49a38766609.png)
![Concerteer No input](https://user-images.githubusercontent.com/30813052/185979386-86d19788-df9c-4d08-bf06-4b654f572165.png)


## Wireframes

### Landing
![image](https://user-images.githubusercontent.com/30813052/185257820-b5bff0d5-649b-4dd8-b42a-c38bc7a3ab7f.png)

### Search Results
![image](https://user-images.githubusercontent.com/30813052/185257853-3ea5874b-d558-4da5-aaa9-3b998df66f36.png)

### Saved Search
![image](https://user-images.githubusercontent.com/30813052/185257937-18b74416-7488-471b-8665-50a737f8c15c.png)


## Bugs and Next Steps

1. Additional row in 2nd search result
```
Steps to replicate issue:
1. Search for artist
2. Hit Enter
3. Search for another artist
4. Hit Enter
```
2. Results seems random, not in order.

<img width="1285" alt="Screen Shot 2022-08-22 at 12 28 49 PM" src="https://user-images.githubusercontent.com/30813052/185980337-b2e5c14a-f2c3-4d23-929f-83675e2a6426.png">

