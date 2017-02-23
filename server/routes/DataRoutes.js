var express = require('express');
var router = express.Router();
var DataController = require('../controllers/DataController.js');

/*
 * GET
 */
router.get('/', DataController.list);

/*
 * SEARCH
 */
router.get('/search', DataController.search);

/*
 * GET
 */
router.get('/:id', DataController.show);

/*
 * POST
 */
router.post('/', DataController.create);

/*
 * PUT
 */
router.put('/:id', DataController.update);

/*
 * DELETE
 */
router.delete('/:id', DataController.remove);

module.exports = router;
