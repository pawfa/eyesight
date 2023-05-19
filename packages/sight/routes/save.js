var express = require('express');
var router = express.Router();
const fs = require('fs');

/* GET home page. */
router.post('/:id', function(req, res, next) {
  fs.writeFile(req.params.id, JSON.stringify(req.body),(err)=> {
    if (!err) {
      res.send(res.ok)
    }
  })
});

module.exports = router;
