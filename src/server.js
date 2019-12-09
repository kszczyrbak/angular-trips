var express = require('express');
var app = express();
var mongoose = require('mongoose')
var bodyParser = require('body-parser')
var cors = require('cors')

app.use(bodyParser.json())
app.use(cors())

var connectionString = "mongodb+srv://thuleq:<password>@tripstest-2osto.mongodb.net/test?retryWrites=true&w=majority"

mongoose.connect(connectionString, {
  useNewUrlParser: true,
  user: 'thuleq',
  pass: 'Ezkatka6'
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'blad'));
db.once('open', function () {
  console.log('Working')
})

const Trip = mongoose.model('Trip', {
  name: String,
  country: String,
  rating: Number,
  startDate: Date,
  endDate: Date,
  description: String,
  price: Number,
  seatsLeft: Number,
  maxSeats: Number,
  photo: String
});

const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  role: {
    type: String,
    enum: ['USER', 'ADMIN']
  }
})

app.post('/trips', function (req, res) {
  var trip = new Trip(req.body);

  trip.save(function (err) {
    if (err) throw err;
    res.status(200).json(trip)
  })
})

app.get('/trips', function (req, res) {
  Trip.find({}).then(function (trips) {
    res.status(200).json(trips);
  })
});

app.get('/trips/:id', function (req, res) {
  Trip.findOne({
    _id: req.params.id
  }).then(function (trip) {
    res.status(200).json(trip);
  })
});

app.put('/trips/:id', function (req, res) {
  var patchBody = req.body;

  Trip.updateOne({
    _id: req.params.id
  }, patchBody).then(function (trip) {
    res.status(200).json(trip);
  })
});

app.delete('/trips/:id', function (req, res) {
  Trip.deleteOne({
    _id: req.params.id
  }, function (err) {
    if (err) throw err;
  })

  res.status(200).json({
    "message": "OK"
  });
});

app.delete('/trips/', function (req, res) {
  Trip.deleteMany({}, function (err) {
    if (err) throw err;
  })

  res.status(200).json({
    "message": "OK"
  });
});

app.post('/users', function (req, res) {
  var user = new User(req.body);

  user.save(function (err) {
    if (err) throw err;
    console.log(user._id)
    res.status(200).json(user)
  })
})

app.get('/users', function (req, res) {
  User.find({}).then(function (users) {
    res.status(200).json(users);
  })
});

app.get('/users/:id', function (req, res) {
  User.findOne({
    _id: req.params.id
  }).then(function (user) {
    res.status(200).json(user);
  })
});

app.get('/users/role/:email', function (req, res) {
  User.findOne({
    email: req.params.email
  }).then(function (user) {
    res.status(200).json(user.role);
  })
});

app.put('/users/:id', function (req, res) {
  var patchBody = req.body;

  User.updateOne({
    _id: req.params.id
  }, patchBody).then(function (user) {
    res.status(200).json(user);
  })
});

app.delete('/users/:id', function (req, res) {
  User.deleteOne({
    _id: id
  }, function (err) {
    if (err) throw err;
  })

  res.status(200).json({
    "message": "OK"
  });
});

app.delete('/users/', function (req, res) {
  User.deleteMany({}, function (err) {
    if (err) throw err;
  })

  res.status(200).json({
    "message": "OK"
  });
});


app.listen(5000);
