var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')

app.use(bodyParser.json())

mongoose.connect('mongodb://localhost:27017/test', {
  useNewUrlParser: true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'blad'));
db.once('open', function () {
  console.log('Working')
})

const Trip = mongoose.model('Trip', {
  id: Number,
  name: String,
  country: String,
  rating: Number,
  startDate: Date,
  endDate: Date,
  description: String,
  rating: Number,
  seatsLeft: Number,
  maxSeats: Number,
  photo: String
});

app.post('/trips', function (req, res) {
  var trip = new Trip(req.body);

  trip.save(function (err) {
    if (err) throw err;
    res.json(trip)
  })
})

app.get('/trips', function (req, res) {
  Trip.find({}).then(function (trips) {
    res.json(trips);
  })
});

app.get('/trips/:id', function (req, res) {
  Trip.find({'id': +req.params.id}).then(function (trip){
    res.json(trip);
  })
});
app.listen(5000);
