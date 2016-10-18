# RecordmateAngular

# About RecordMate
Recordmate Angular is a complete MEAN stack rebuild of my original app, located here: https://github.com/adamlucz90/RecordMate.  

Recordmate is an app that allows users to search for albums they are interested in or own by the album title or by a song title.  They are then given information about the album from Last.Fm's API, Youtube video previews related to the album from Youtube's API, and eBay auction results based on the specific format they are looking for from eBay's API.

After creating an account users are then able to add albums they search to either a wishlist, for items they are wanting to get in the future, or to their collection, for items they already own.  They are then able to add other users as friends and compare wishlist's and collection's and favorite bands. 

# How To Install For Dev
* User should be familiar with how to operate a NodeJS server and have MongoDB set up locally.
* After pulling the repo to your machine in the master directory "npm-install" and "bower-install" will be required to install the necessary components.
* Once the node and bower components are installed the server is located in the bin directory.  From the bin directory run "node server.js" to start the server that will be available at localhost:8000 by default.

# Technologies Used
* This is a full MEAN stack app so MongoDB, more specifically Mongoose, is used for the database, ExpressJS is used for the back-end, Node is used for the server, and AngularJS is used for the front-end.
* Bootstrap is used to make the front end look nice and pretty.
* ng-notifications-bar is used for the user notifications.
* Passport is used for user authentication on the back-end.
* Serve-favicon is used to serve up that neat little record on the header.
* Angular-gravatar is used to support Gravatar images for the user profiles.

##Api's Used

### Last.fm
Last.fm's API's are the primary way this app get's information on artists, albums, and genre's.

You can find out more about Last.fm's API's here: http://www.last.fm/api/webauth
* album.getInfo is used to get all the album information that fills in the /albumInfo page and subsequently stored in the database when a user adds the album to their wishlist or collection.
* track.getInfo is used to retrieve info on a specific song searched by the user.
* artist.getTopAlbums is used to return the top albums of an artist when searched.
* tag.getTopAlbums is used to return the top albums of a specific genre when searched.

### YouTube
You can find out more about the YouTube search API here: https://developers.google.com/youtube/v3/docs/search/list#parameters
* YouTube's search API is used to return the url's of videos related to the queried album.

### eBay
You can find out out more about the eBay FindingService here: http://developer.ebay.com/DevZone/finding/CallRef/index.html
* eBay's FindingService Api is used to return information on live eBay auctions related to the queried album.

# Features

## Album And Artist Searches
The primary features are the ability to search for an album based on the title or the song and be returned a host of useful information about it.

### Album Title Search
Enter the name of the artist and album title you wish to look up.  The format buttons are optional but will help optimize your eBay search returns.

![Alt text](http://i.imgur.com/9WLHoVa.jpg "Search By Album Title")

You are then returned info on the album, YouTube videos, and eBay Results.

![Alt text](http://i.imgur.com/IRgZQGv.jpg "Search Result Page")
![Alt text](http://i.imgur.com/kg9aAWa.jpg "Search Result Page")

### Search By Song
Enter the name of the artist and the song you are looking for.  Again the format buttons are optional.

![Alt text](http://i.imgur.com/IbHRpPo.jpg "Search By Song")

You will then be returned the album that the particular song is on.

![Alt text](http://i.imgur.com/z838uFK.jpg "Search Result Page")

### Search By Artist
Enter the name of the artist you are looking for.  You will then be returned the artist's top albums as ranked by Last.fm.

![Alt text](http://i.imgur.com/vAwzdmX.jpg "Artist Search")
![Alt text](http://i.imgur.com/WKV0qyt.jpg "Search Result Page")

The same interface is used when a user clicks on a genre tag on the albumInfo page to return the top albums in a certain genre.

![Alt text](http://i.imgur.com/ivIGA9W.jpg "Search Result Page")

## User Features
User's can create accounts that allow them to save albums to a wishlist or collection.  They can also create a profile to link up with other users.

### Registration and Log In
Standard Registration and Log In forms are used to give the user access to an account.

![Alt text](http://i.imgur.com/vLLS0Fu.jpg "Registration")
![Alt text](http://i.imgur.com/XrPX2av.jpg "Log In")

### Wishlist And Collection
User's are given the opporotunity almost anytime they search or see an album througout the site to add it to their wishlist or collection

#### Wishlist
The wishlist gives user's the ability to keep track of albums they are looking for in the future.

![Alt text](http://i.imgur.com/kYTA2cy.jpg "Wishlist")

#### Collection
The collection allows user's to store albums they already own in a organized and public way.

![Alt text](http://i.imgur.com/MgMEX0P.jpg "Collection")

### User Profile
The user is given a profile in which they are able to edit a bio, add their favorite bands which then become links to that bands top albums, add friends, and add a profile image via Gravatar.

![Alt text](http://i.imgur.com/HpVgak7.jpg "User Profile")

Other users can be searched via the search bar on the right of the navbar.  From there a user can see other user's wishlist's and collection's.  They can also add the user as a friend.

![Alt text](http://i.imgur.com/EXa9WQO.jpg "Other User's Profile")
