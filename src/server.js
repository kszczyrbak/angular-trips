var express = require('express');
var app = express();
var mongoose = require('mongoose')

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

  console.log(trip)
  trip.save(function (err) {
    if (err) throw err;
    console.log('trip saved')
  })

})

app.get('/trips', function (req, res) {
  console.log('trips')
});

app.get('/trips/:id', function (req, res) {
  console.log('trips', +req.params.id)
});
app.listen(5000);
