var bodyParser = require('body-parser');
var mongoose = require('mongoose');

//connect to the database
//mongoose.connect('mongodb+srv://test:test@cluster0-vrst1.mongodb.net/test?retryWrites=true&w=majority');

var MongoClient = require('mongodb').MongoClient;
var uri = "mongodb+srv://test:test@cluster0-vrst1.mongodb.net/test?retryWrites=true&w=majority";
var client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  var collection = client.db("test").collection("devices");
  // perform actions on the collection object
  client.close();
});


//create a schema - this is like a blueprint
var todoSchema = new mongoose.Schema({
    item: String
});

var Todo = mongoose.model('Todo', todoSchema);
var itemOne = Todo({item: 'buy flowers'}).save(function(err) {
    if (err) throw err;
    console.log('item saved');
    
});

var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];

var urlencodedParser = bodyParser.urlencoded({extended: false});

module.exports = function (app) {
    
    app.get('/todo', function (req, res) {
        res.render('todo', {todos: data});
    });

    app.post('/todo',urlencodedParser, function(req, res) {
       data.push(req.body);
       console.log("on server ", data);
       res.json(data); 
    });

    app.delete('/todo/:item', function(req, res) {
        
        
        data = data.filter(function (todo) {
            return todo.item.replace(/ /g,'-') !== req.params.item;
        });
        res.json(data);
    });

};