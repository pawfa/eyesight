var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");
/* GET home page. */
router.post('/:projectId/:version/:name', async function(req, res, next) {

  if(!fs.existsSync(path.join(req.params.projectId, req.params.version))){
    fs.mkdirSync(path.join(req.params.projectId, req.params.version),{ recursive: true });
  }

  fs.writeFile(path.join(req.params.projectId, req.params.version,req.params.name),Buffer.from(req.body, 'base64'),{encoding: null},(err)=> {
    if (!err) {
      res.send(res.ok)
    }
  })
  res.send(res.ok)
});

module.exports = router;
