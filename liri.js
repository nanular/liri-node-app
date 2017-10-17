var keys = require("./keys.js");

var fs = require("fs");
var request = require("request");
var twitter = require("twitter");
var Spotify = require('node-spotify-api');

var firstArgument = process.argv[2];
var secondArgument = process.argv[3];


//Twitter
if (firstArgument === "my-tweets")
{
	var client = new twitter({
	  consumer_key: keys.twitterKeys.consumer_key,
	  consumer_secret: keys.twitterKeys.consumer_secret,
	  access_token_key: keys.twitterKeys.access_token_key,
	  access_token_secret: keys.twitterKeys.access_token_secret
	});
	 
	var params = {screen_name: 'jonmeleckis'};
	client.get('statuses/user_timeline', params, function(error, tweets, response) {
	  if (!error)
	  {
	  	for (h = 0; h < tweets.length; h++)
	  	{
	  		logIt(tweets[h].created_at);
	  		logIt(tweets[h].text);
	  		logIt("");
	  	}

	  }
	});
}


//Spotify
if (firstArgument === "spotify-this-song")
{
  if (secondArgument)
  {
    var song = "";
    for (var i = 3; i < process.argv.length; i++)
    {
      song += " " + process.argv[i];
    }
  } else
  {
  	song = "The Sign";
  }

	var spotify = new Spotify({
		id: keys.spotifyKeys.id,
		secret: keys.spotifyKeys.secret
	});
    
	spotify.search({ type: 'track', query: song }, function(error, data)
	{
		for (var j = 0; j < 10; j++)
		{
      logIt("Artist: " + data.tracks.items[j].artists[0].name);
      logIt("Song: " + data.tracks.items[j].name);
      logIt("Album: " + data.tracks.items[j].album.name);  
      logIt("Preview: " + data.tracks.items[j].preview_url);
      logIt("");		
		}
  });
}


if (firstArgument === "movie-this")
{
	if (secondArgument)
  {
    var movie = "";
    for (var i = 3; i < process.argv.length; i++)
    {
      movie += "+" + process.argv[i];
    }
  } else
  {
  	movie = "Mr.+Nobody";
  }

	var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=" + keys.omdbKey.api_key;
	request(queryUrl, function(error, response, body)
	{
		if (!error && response.statusCode === 200)
		{
			logIt("Movie Title: " + JSON.parse(body).Title);
			logIt("Year: " + JSON.parse(body).Year);

			logIt("IMDb Rating: " + JSON.parse(body).imdbRating);
			var ratings = JSON.parse(body).Ratings
			for (var k = 0; k < ratings.length; k++)
			{
				if (ratings[k].Source === "Rotten Tomatoes")
				{
					logIt("Rotten Tomatoes Rating: " + ratings[k].Value)
					var rottenRatingsPresent = true;
				}
			}

			if (!rottenRatingsPresent)
			{
				logIt("Rotten Tomatoes Rating: N/A");
			}

			logIt("Country: " + JSON.parse(body).Country);
			logIt("Language: " + JSON.parse(body).Language);
			logIt("");
			logIt("Plot: " + JSON.parse(body).Plot);
			logIt("");
			logIt("Actors: " + JSON.parse(body).Actors);
			logIt("");
			logIt("");
			console.log(body);
		}
	});

}


if (firstArgument === "do-what-it-says")
{



}

function logIt(itemToLog)
{
	console.log(itemToLog);
	fs.appendFile("./Log.txt", itemToLog + "\n", function(err)
	{
    if (err)
    {
      console.log(err);
    }
  });
}