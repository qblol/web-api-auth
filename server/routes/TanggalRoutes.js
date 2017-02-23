var express = require('express');
var router = express.Router();
var TanggalController = require('../controllers/TanggalController.js');

/*
 * GET
 */
router.get('/', TanggalController.list);

/*
 * SEARCH
 */
router.get('/search', TanggalController.search);

/*
 * GET
 */
router.get('/:id', TanggalController.show);

/*
 * POST
 */
router.post('/', TanggalController.create);

/*
 * PUT
 */
router.put('/:id', TanggalController.update);

/*
 * DELETE
 */
router.delete('/:id', TanggalController.remove);

module.exports = router;
