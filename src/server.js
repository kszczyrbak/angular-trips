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

const Comment = mongoose.model('Comment', {
  trip_id: String,
  user_id: String,
  userName: String,
  date: Date,
  rating: Number,
  text: String
})

const User = mongoose.model('User', {
  name: String,
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

app.put('/trips/:trip_id/comments', function (req, res) {
  var patchBody = req.body
  patchBody.trip_id = req.params.trip_id

  Comment.updateOne({
    user_id: patchBody.user_id,
    trip_id: patchBody.trip_id
  }, patchBody, {
    upsert: true
  }).then(
    function (comment) {
      res.status(200).json(comment)
      updateTripRating(patchBody.trip_id)
    }
  )
})

function updateTripRating(_trip_id) {
  Comment.find({
    trip_id: _trip_id
  }, function (err, comments) {
    if (err) throw err;
    console.log(comments)
    let newRating = comments.map(comment => comment.rating).reduce((a, b) => a + b, 0) / comments.length
    Trip.findOneAndUpdate({
      _id: _trip_id
    }, {
      rating: newRating
    }, {
      new: true
    }).then(function (trip) {
      console.log(trip)
    })
  })
}

app.get('/trips/:trip_id/comments', function (req, res) {
  Comment.find({
    trip_id: req.params.trip_id
  }).where('text').ne("").then(function (comments) {
    res.status(200).json(comments);
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
    if (err) {
      res.status(400).json({
        "message": err
      })
    };
    res.status(200).json({
      "message": "OK"
    });
  })
});

// app.delete('/trips/', function (req, res) {
//   Trip.deleteMany({}, function (err) {
//     if (err) throw err;
//   })

//   res.status(200).json({
//     "message": "OK"
//   });
// });

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


app.get('/users/email/:email', function (req, res) {
  User.findOne({
    email: req.params.email
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
    if (err) {
      res.status(400).json({
        "message": err
      })
    };
    res.status(200).json({
      "message": "OK"
    });
  })
});

app.post('/comments', function (req, res) {
  var comment = new Comment(req.body);

  comment.save(function (err) {
    if (err) throw err;
    console.log(comment._id)
    res.status(200).json(comment)
  })
})

app.get('/comments/:id', function (req, res) {
  Comment.findOne({
    _id: req.params.id
  }).then(function (comment) {
    res.status(200).json(comment);
  })
});

app.get('/comments', function (req, res) {
  Comment.find({}).then(function (comments) {
    res.status(200).json(comments);
  })
});

app.get('/comments/trip/:trip_id', function (req, res) {
  Comment.find({
    trip_id: req.params.trip_id
  }).then(function (comments) {
    res.status(200).json(comments);
  })
});

app.delete('/comments/:id', function (req, res) {
  Comment.deleteOne({
    _id: id
  }, function (err) {
    if (err) {
      res.status(400).json({
        "message": err
      })
    };
    res.status(200).json({
      "message": "OK"
    });
  })
});

// app.delete('/users/', function (req, res) {
//   User.deleteMany({}, function (err) {
//     if (err) throw err;
//   })

//   res.status(200).json({
//     "message": "OK"
//   });
// });


app.listen(5000);
