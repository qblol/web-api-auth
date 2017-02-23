var TanggalModel = require('../models/TanggalModel.js');

/**
* TanggalController.js
*
* @description :: Server-side logic for managing Tanggals.
*/
module.exports = {

  /**
  * TanggalController.list()
  */
  list: function (req, res) {
    TanggalModel.find(function (err, Tanggals) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Tanggal.',
          error: err
        });
      }
      return res.json(Tanggals);
    });
  },

  search: function (req, res) {
    if(req.query.t != '' && req.query.f == '') {
      DataModel.find({tanggal: req.query.t}, function (err, Datas) {
          return res.json(Datas);
        });
    } else if(req.query.t == '' && req.query.f != '') {
      DataModel.find({frequency: req.query.f}, function (err, Datas) {
          return res.json(Datas);
        });
    } else if(req.query.t != '' && req.query.f != '') {
      DataModel.find({ $and: [ { tanggal: req.query.t }, { frequency: req.query.f } ] }, function(Datas){
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
  * TanggalController.show()
  */
  show: function (req, res) {
    var id = req.params.id;
    TanggalModel.findOne({_id: id}, function (err, Tanggal) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Tanggal.',
          error: err
        });
      }
      if (!Tanggal) {
        return res.status(404).json({
          message: 'No such Tanggal'
        });
      }
      return res.json(Tanggal);
    });
  },

  /**
  * TanggalController.create()
  */
  create: function (req, res) {
    var Tanggal = new TanggalModel({      tanggal : req.body.tanggal,      frequency : req.body.frequency
    });

    Tanggal.save(function (err, Tanggal) {
      if (err) {
        return res.status(500).json({
          message: 'Error when creating Tanggal',
          error: err
        });
      }
      return res.status(201).json(Tanggal);
    });
  },

  /**
  * TanggalController.update()
  */
  update: function (req, res) {
    var id = req.params.id;
    TanggalModel.findOne({_id: id}, function (err, Tanggal) {
      if (err) {
        return res.status(500).json({
          message: 'Error when getting Tanggal',
          error: err
        });
      }
      if (!Tanggal) {
        return res.status(404).json({
          message: 'No such Tanggal'
        });
      }

      Tanggal.tanggal = req.body.tanggal ? req.body.tanggal : Tanggal.tanggal;      Tanggal.frequency = req.body.frequency ? req.body.frequency : Tanggal.frequency;
      Tanggal.save(function (err, Tanggal) {
        if (err) {
          return res.status(500).json({
            message: 'Error when updating Tanggal.',
            error: err
          });
        }

        return res.json(Tanggal);
      });
    });
  },

  /**
  * TanggalController.remove()
  */
  remove: function (req, res) {
    var id = req.params.id;
    TanggalModel.findByIdAndRemove(id, function (err, Tanggal) {
      if (err) {
        return res.status(500).json({
          message: 'Error when deleting the Tanggal.',
          error: err
        });
      }
      return res.status(204).json();
    });
  }
};
