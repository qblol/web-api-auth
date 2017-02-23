var UserModel = require('../models/UserModel.js');
const bcrypt = require('bcrypt');
const saltRounds = 5;
const jwt = require('jsonwebtoken');

/**
* UserController.js
*
* @description :: Server-side logic for managing Users.
*/
module.exports = {

  /**
  * UserController.list()
  */
  list: function (req, res) {
    UserModel.find(function (err, Users) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }
      return res.json(Users);
    });
  },

  /**
  * UserController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    UserModel.findOne({_id: id}, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User.',
          error: err
        });
      }
      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }
      return res.json(User);
    });
  },

  /**
  * UserController.create()
  */
  create: (req,res) => {
    UserModel.findOne({username: req.body.username})
    .then((data) => {
      if(data != null) res.send('Username is already taken')
      else{
        let newUser = new UserModel({
          username: req.body.username,
          password: bcrypt.hashSync(req.body.password, saltRounds)
        })
        newUser.save()
        .then((data) => {
          res.json(data)
        })
      }
    })
  },

  /**
  * UserController.update()
  */
  update: function (req, res) {
    var username = req.params.username;
    UserModel.findOne({username: username}, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting User',
          error: err
        });
      }
      if (!User) {
        return res.status(404).json({
          message: 'No such User'
        });
      }

      User.username = req.body.username ? req.body.username : User.username;      User.password = req.body.password ? req.body.password : User.password;
      User.save(function (err, User) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating User.',
            error: err
          });
        }

        return res.json(User);
      });
    });
  },

  /**
  * UserController.remove()
  */
  remove: function (req, res) {
    var username = req.params.username;
    UserModel.findByIdAndRemove(username, function (err, User) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the User.',
          error: err
        });
      }
      return res.status(204).json();
    });
  },

  login: function (req, res) {
    var username = req.body.username;
    UserModel.findOne({username: username}, function (err, User) {
      if(User != null) {
        let verification = bcrypt.compareSync(req.body.password, User.password)
        if(bcrypt.compareSync(req.body.password, User.password)) {
          let token = jwt.sign({username: User.username}, 'qblol', {expiresIn: 600*600})
          return res.send(token)
        }else{
          res.send('Unauthorized')
        }
      }else{
        res.send('Unauthorized')
      }
    })
  }
};
