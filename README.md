# RecordmateAngular

Recordmate Angular is a complete MEAN stack rebuild of my original app, located here: https://github.com/adamlucz90/RecordMate.  

Recordmate is an app that allows users to search for albums they are interested in or own by the album title or by a song title.  They are then given information about the album from Last.Fm's API, Youtube video previews related to the album from Youtube's API, and eBay auction results based on the specific format they are looking for from eBay's API.

After creating an account users are then able to add albums they search to either a wishlist, for items they are wanting to get in the future, or to their collection, for items they already own.  They are then able to add other users as friends and compare wishlist's and collection's.

This build is currently unfinished and is stuck on the framework for the user registration and login system.
The search system is operational with the exception of the ebay results.

UPDATE 9/15/16
-Major overhaul of file directory.  Working server, express app, and mongoose connection.
-All angular files are now located in the Angular folder.
-All api files, with the exception of the express app which is located in the main folder as api_app.js, are located in the api folder.
-The http server is located in the bin folder as server.js

Here are screenshots of the search system working:

![Alt text](http://i.imgur.com/moeXZib.jpg "Search Home Page")

![Alt text](http://i.imgur.com/LCy17CY.jpg "Search Result Page")
