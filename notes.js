var fs = require("fs");

fs.writeFile("textfile.txt", "item01, item02, item03", function(err)
{
		if (err)
		{
			return console.log(err);
		}

		console.log("file successfully updated.");
});









var firstArgument = process.argv[2];







//from otherjsfile.js
someObject = 
{
	itemOne: someStuff,
	itemTwo: moreStuff
}
module.exports = someObject;

//in new js file
var objectName = require(./otherjsfile.js);












var fs = require("fs");

fs.readFile("movies.txt", "utf8", function(error, data)
{
  if (error)
  {
    return console.log(error);
  }

  console.log(data);
  var dataArr = data.split(", ");
  console.log(dataArr);
});











var fs = require("fs");
fs.appendFile("./textfile.txt", "add this text" + someVariable);












var request = require("request");
request("http://www.google.com", function(error, response, body)
{
	if (!error && response.statusCode === 200)
	{
		console.log(body);
	}
});








