const express = require('express');
const router = express.Router();
const raconteCtrl = require('../controllers/raconte');

router.get('/:id', raconteCtrl.getOneRaconte);
router.put('/:id', raconteCtrl.modifyRaconte);
router.get('/', raconteCtrl.getAllRaconte);

module.exports = router;