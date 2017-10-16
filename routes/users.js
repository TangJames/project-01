const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const db = require('../models');

//Creates a user and returns new user as a JSON object
function createUser(req, res){
  const newUser = db.User({
    name: req.body.name,
    email: req.body.email,
    passwordHash: req.body.passwordHash,
    playlists: []
  });

  newUser.save(function(err, data){
    if (err){
      console.log('Error creating user.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.status(201).json(data);
    };
  });
};

//Retrieves all users and returns them in a JSON object
function getAllUsers(req, res){
  db.User.find({}, function (err, data){
    if(err){
      console.log('Error retrieving all users.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};

//Retrieves a user and returns them in a JSON object
function getOneUser(req, res){
  db.User.find(req.params.id, function(err,data){
    if(err){
      console.log('Error retrieving this user.', err);
      res.status(500).send('Internal server error.');
    }else{
      res.json(data);
    };
  });
};

//Retrieves an array of user's playlists
function getAllPlaylists(req, res){
  db.User.findById(req.params.id, function(err, data){
    if(err){
      console.log('Error retrieving user\'s playlists', err);
      res.status(500).send('Internal Server Error.');
    }else{
      res.json(data.playlists);
    }
  })
}

module.exports = {
  getAllUsers: getAllUsers,
  getOneUser: getOneUser,
  createUser: createUser,
  getAllPlaylists: getAllPlaylists
};
