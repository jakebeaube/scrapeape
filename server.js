//dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var exphbs = require("express-handlebars");
//Models
var Comments = require("./models/Comments.js");
var Article = require("./models/Article.js");
//scraping
var request = require("request");
var cheerio = require("cheerio");
// set mongoose to leverage built in JavaScript ES6 promises
mongoose.Promise = Promise;

var app = express();

//use morgan and body-parser with express
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: false}));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json"}));


//make public a static dir
app.use(express.static("public"));

//database config with mongoose
mongoose.connect("mongodb://localhost/scrapeape");
var db = mongoose.connection;
//shows errors
db.on("error", function(error){
	console.log("Mongoose Error: ", error);
});

//successful login to mongoose message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

app.engine('handlebars', exphbs({
    defaultLayout: 'main'
}));

app.set('view engine', 'handlebars');

require("./controllers/routes.js")(app);


app.listen(3000, function() {
  console.log("App running on port 3000!");
});