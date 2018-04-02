
// REQUIREMENTS

// ### Overview
// In this assignment, you will make LIRI. LIRI is like iPhone's 
//  However, while SIRI is a Speech Interpretation and Recognition 
// Interface, LIRI is a _Language_ Interpretation and Recognition
// Interface. LIRI will be a command line node app that takes in 
// parameters and gives you back data.

//LIRI will display your latest tweets. As we do not want to 
//display your personal account, or its keys, please make an 
//alias account and add a few tweets to it!

// Make it so liri.js can take in one of the following commands:
//     * `my-tweets`
//     * `spotify-this-song`
//     * `movie-this`
//     * `do-what-it-says`
// ### What Each Command Should Do
// 1. `node liri.js my-tweets`
//    * This will show your last 20 tweets and when they were created 
//      at in your terminal/bash window.
// 2. `node liri.js spotify-this-song '<song name here>'`
//    * This will show the following information about the song 
//      in your terminal/bash window   
//      * Artist(s)  
//      * The song's name
//      * A preview link of the song from Spotify
//      * The album that the song is from
//    * If no song is provided then your program will default to "The Sign" 
// by Ace of Base.
//    * You will utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) 
//          package in order to retrieve song information from the Spotify API.

//PSEUDOCODE
//----------------------------------------------------------------------
//Before coding liri.js

//NPM package installs:
//Twitter
//Node-spotify-API
//Request
//DotEnv
//Initialize package.json with npm init -y
//Create .gitignore file with the following lines:
//node_module
//.DS_Store
//.env
//Create keys.js file containing:
//exports.twitter keys &secrets
//exports.spotify id & secret
//Create .env file containing:
//spotify and Twitter API keys
//Create random.txt file containing:
//spotify-this-song, "I Want it That Way"


//Coding liri.js
        //take in arguments from the command line
        // if statements to determine which function to call
        //to display output

        //functions needed
                //call api & display tweets
                        //loads Twitter module
                        // creates variable with keys and secrets from .env file
                        // creates object
                        //twitter function call and handle response    
                //call api & display songs
                        //loads Spotify module
                        //creates new object to access id and secret
                        //calls spotify function and handles response
                //call api & display movies
                        //parse string from server into an object
                        //use text from random.txt file
                //loads fs module
                        //reads the random.txt file and handles data


//MAIN PROCESS
//---------------------------------------------------------------------------

//Read and set any environment variables within dotenv package

require("dotenv").config();

//takes in arguements from command line
var nodeArg = process.argv;


//respond to input from user of: node liri.js my-tweets
if ((nodeArg[2]) == ('my-tweets')) {
        //show last 20 tweets in command window
        // console.log('my-tweets was input');
        displayTweets();
        debugger;
}

//respond to input from user of: node liri.js spotify-this-song '<song name here>'
if (((nodeArg[2]) == ("spotify-this-song")) && ((nodeArg[3]) != (null))) {
        nodeArgSong = nodeArg[3];
        // console.log("spotify-this-song", "'" + nodeArgSong + "' is valid song input");
        displaySongInfo(nodeArgSong);
        debugger;
}

//if no song is provided, default to "The Sign" by Ace of Base
if (((nodeArg[2]) == ("spotify-this-song")) && ((nodeArg[3]) == (null))) {
        var nodeArgSong = "The Sign"
        displaySongInfo();
        console.log("No song provided-defaulting to:");

        debugger;
}

//respond to input of:  node liri.js movie-this '<movie name here>'
if (((nodeArg[2]) == ('movie-this')) && ((nodeArg[3]) != (null))) {
        var movieTitle = (nodeArg[3]);
        // console.log(movieTitle + " is a valid movie input");
        displayMovieInfo(movieTitle);

}

//if no movie is provided, default to "Mr. Nobody" title
if (((nodeArg[2]) == ('movie-this')) && ((nodeArg[3]) == (null))) {
        movieTitle = "Mr. Nobody";
        console.log("no movie was entered-defaulting to Mr. Nobody");
        displayMovieInfo(movieTitle);

}

//respond to input of:  node liri.js do-what-it-says 
if (nodeArg[2] == ('do-what-it-says')) {
        // console.log("valid input of do-what-it-says");
        displayTextFromRandomTxtFile();
}

function displayTweets() {
        //loads Twitter module
        var Twitter = require('twitter');
        // creates variable with keys and secrets from .env file
        var client = new Twitter({
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
                access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        // creates object
        var params = { screen_name: 'DevDon17' };
        //twitter function call and handle response
        client.get('statuses/user_timeline', params, function (error, tweets, response) {
                if (!error) {
                        for (i = 0; i < 20; i++) {
                                console.log(tweets[i].text + '\r');
                                console.log("Created at:  " + tweets[i].created_at + '\n');
                        }
                }
        });

};

function displaySongInfo() {
        //loads Spotify module
        var Spotify = require('node-spotify-api');
        //creates new object to access id and secret
        var spotify = new Spotify({
                id: process.env.SPOTIFY_ID,
                secret: process.env.SPOTIFY_SECRET
        });
        //calls spotify function and handles response
        spotify.search({ type: 'track', query: nodeArgSong }, function (err, data) {
                if (err) {
                        console.log('Error occurred: ' + err);
                }
                //Testing:
                // console.log (data.tracks.items[1].name + ' by '+ data.tracks.items[1].artists[0].name + ' on the album: ' + '"' + data.tracks.items[1].album.name + '".  Preview at:  '+ data.tracks.items[1].preview_url + '\n');
                // console.log (data.tracks.items[3].name);
                // console.log (data.tracks.items[1].artists.name)
                // console.log (data.tracks.items);
                // console.log (data.tracks.items[1].artists[0].name);
                // console.log (data.tracks.items[0].album.name);

                if (nodeArgSong == "The Sign") {
                        console.log('Song:  ' + data.tracks.items[5].name + '\r');
                        console.log('Artist(s):  ' + data.tracks.items[5].artists[0].name + '\r');
                        console.log('Album:  ' + data.tracks.items[5].album.name + '\r');
                        if ((data.tracks.items[5].preview_url) == (null)) {
                                console.log('Preview URL is not available' + '\n');
                        }
                        else console.log('Preview at:  ' + data.tracks.items[5].preview_url + '\n');
                }

                else {
                        ('Your search for "' + nodeArgSong + '" produced the following songs: ' + '\n');
                        for (i = 0; i < 20; i++) {

                                console.log('Song:  ' + data.tracks.items[i].name + '\r');
                                console.log('Artist(s):  ' + data.tracks.items[i].artists[0].name + '\r');
                                console.log('Album:  ' + data.tracks.items[i].album.name + '\r');
                                if ((data.tracks.items[i].preview_url) == (null)) {
                                        console.log('Preview URL is not available' + '\n');
                                }
                                else console.log('Preview at:  ' + data.tracks.items[i].preview_url + '\n');
                        }
                }
                debugger;
        })
};


function displayMovieInfo() {
        //loads request module
        var request = require('request');
        //calls api and handles response
        request('http://www.omdbapi.com/?apikey=trilogy&t=' + movieTitle, function (error, response, body) {

                //parse string from server into an object
                var movieObject = JSON.parse(body);

                console.log("Title:  " + movieObject.Title);
                console.log("Year released:  " + movieObject.Year);
                console.log("IMDB rating:  " + movieObject.imdbRating);
                console.log("Rotten Tomatoes rating:  " + movieObject.Ratings[1].Value);
                console.log("Produced in:  " + movieObject.Country);
                console.log("Language:  " + movieObject.Language);
                console.log("Plot:  " + movieObject.Plot);
                console.log("Actors:  " + movieObject.Actors);
        });

}

function displayTextFromRandomTxtFile() {
        //loads fs module
        var fs = require("fs");
        //reads the random.txt file and handles data
        fs.readFile("random.txt", "utf8", function (error, data) {
                // If the code experiences any errors it will log the error to the console.
                if (error) {
                        return console.log(error);
                }

                // We will then print the contents of data
                // console.log(data);

                // Then split it by commas (to make it more readable)
                var dataArr = data.split(",");

                var action = dataArr[0];
                nodeArgSong = dataArr[1];

                if ((action) == ("spotify-this-song")) {
                        // console.log (value);
                        // value = nodeArgSong;
                        // console.log (nodeArgSong);
                        displaySongInfo(nodeArgSong);
                }

        });

};
