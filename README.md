# scottstots

## Project Title: Concerteer

## Project Description

In this project we will be building a responsive website that allows a user to search for an artist and find their upcoming events. The user will be presented with the concert name, venue name, venue location, average ticket price, ticket purchase link and the nearest hotel to the venue. If no artist or event can be found, a popup alert will appear to notify the user. The user can also find their previous search results using the last search button in the header.


## User Story
```
As a music lover I am searching for my favorite artists upcoming shows. 
I then want to see upcoming shows and see hotels in the city where the event is held.
- A PERFORMER or an event of interest
- ex: user enters “Bad Bunny” into the search bar

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

## Wireframes

### Landing
![image](https://user-images.githubusercontent.com/30813052/185257820-b5bff0d5-649b-4dd8-b42a-c38bc7a3ab7f.png)

### Search Results
![image](https://user-images.githubusercontent.com/30813052/185257853-3ea5874b-d558-4da5-aaa9-3b998df66f36.png)

### Saved Search
![image](https://user-images.githubusercontent.com/30813052/185257937-18b74416-7488-471b-8665-50a737f8c15c.png)


## Screenshots
Landing page
![image](https://user-images.githubusercontent.com/105574653/185974516-0f2e012c-4a9e-45de-9be4-050506aa2c36.png)

After search input
![image](https://user-images.githubusercontent.com/105574653/185974564-86309604-dc0f-4fbd-9cee-07c9572f77ef.png)


## Live Link
https://scotttots.github.io/scottstots/


## ScottsTots Contributors
- Annie Nguyễn @mnghinguyen
- Nick Magarian @NickMagarian
- Joselyn Jones @Jossyjo94
- Kathy Kang @KatSKang




