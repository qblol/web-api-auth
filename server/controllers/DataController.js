var DataModel = require('../models/DataModel.js');

/**
* DataController.js
*
* @description :: Server-side logic for managing Datas.
*/
module.exports = {

  /**
  * DataController.list()
  */
  list: function (req, res) {
    DataModel.find(function (err, Datas) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Data.',
          error: err
        });
      }
      return res.json(Datas);
    });
  },

  /**
  * DataController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    DataModel.findOne({_id: id}, function (err, Data) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Data.',
          error: err
        });
      }
      if (!Data) {
        return res.status(404).json({
          message: 'No such Data'
        });
      }
      return res.json(Data);
    });
  },

  /**
  * DataController.search()
  */
  search: function (req, res) {
    if(req.query.l != '' && req.query.f == '') {
      DataModel.find({letter: req.query.l}, function (err, Datas) {
          return res.json(Datas);
        });
    } else if(req.query.l == '' && req.query.f != '') {
      DataModel.find({frequency: req.query.f}, function (err, Datas) {
          return res.json(Datas);
        });
    } else if(req.query.l != '' && req.query.f != '') {
      DataModel.find({ $and: [ { letter: req.query.l }, { frequency: req.query.f } ] }, function(Datas){
        return res.json(Datas);
      });
    } else {
      DataModel.find(function (err, Datas) {
        if (err) {
          return res.status(500).json({
            message: 'Error when getting Data.',
            error: err
          });
        }
        return res.json(Datas);
      });
    }
  },

  /**
  * DataController.create()
  */
  create: function (req, res) {
    var Data = new DataModel({      letter : req.body.letter,      frequency : req.body.frequency
    });

    Data.save(function (err, Data) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Data',
          error: err
        });
      }
      return res.status(201).json(Data);
    });
  },

  /**
  * DataController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    DataModel.findOne({_id: id}, function (err, Data) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Data',
          error: err
        });
      }
      if (!Data) {
        return res.status(404).json({
          message: 'No such Data'
        });
      }

      Data.letter = req.body.letter ? req.body.letter : Data.letter;      Data.frequency = req.body.frequency ? req.body.frequency : Data.frequency;
      Data.save(function (err, Data) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Data.',
            error: err
          });
        }

        return res.json(Data);
      });
    });
  },

  /**
  * DataController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    DataModel.findByIdAndRemove(id, function (err, Data) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Data.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
