// Create web server
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var fs = require('fs');

// Create comments.json file if it doesn't exist
var comments = [];
if (!fs.existsSync('comments.json')) {
    fs.writeFileSync('comments.json', JSON.stringify(comments));
} else {
    comments = JSON.parse(fs.readFileSync('comments.json'));
}

// Use body-parser middleware
app.use(bodyParser.json());

// GET /comments
app.get('/comments', function(req, res) {
    res.json(comments);
});

// POST /comments
app.post('/comments', function(req, res) {
    var newComment = req.body;
    comments.push(newComment);
    fs.writeFileSync('comments.json', JSON.stringify(comments));
    res.json(newComment);
});

// Start the server
app.listen(3000);
console.log('Server is running at http://localhost:3000');