var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var app = express();
var articleOne = {
    title: 'articleone Devi',
    heading:'Articleone',
    data: 'aug 21 2017',
    content: `<p>
                this is the html page article twolinking to the server.js file
                 this is the html page linking to the server.js file
            </p>
             <p>
                this is the html page article twolinking to the server.js file
                 this is the html page linking to the server.js file
            </p>
             <p>
                this is the html page article twolinking to the server.js file
                 this is the html page linking to the server.js file
            </p>`
};
function createTemplate(data){
    var title = data.title;
    var date = data.date;
    var heading = data.heading;
    var content = data.content;
    var htmltemplate = `<html>
    <head>
        <title>
            $title
        </title>
         <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <h2>
        $heading
        </h2>
        <div>
        $date
        </div>
        <div class="container">
            <a href="/">Home</a>
        
        <div>
            $content
        </div>
        </div>
    </body>
</html>`;
}
app.use(morgan('combined'));
var config = {
    user: 'rdevi',
    database: 'rdevi',
    host: 'db.imad.hasura-app.io',
    password: 'db-rdevi-82907'
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});
var pool = new Pool(config);
app.get('/test-db', function (req, res) {
    pool.query('SELECT * FROM article', function (err, result){
        if (err){
            res.status(500).send(err.toString());
        }
        else{
            res.send(JSON.stringify(result));
        }
    });
});
app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/xml-doc', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'xmldoc1.xml'));
});

app.get('/xml-class', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'xmlclass.xml'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


// Do not change port, otherwise your app won't run on IMAD servers
// Use 8080 only for local development if you already have apache running on 80

var port = 80;
app.listen(port, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
