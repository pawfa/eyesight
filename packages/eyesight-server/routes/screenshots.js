var express = require('express');
var router = express.Router();
const fs = require('fs');
const path = require("path");


router.get('/:projectId/:version', async function (req, res, next) {
  const dir = path.join(req.params.projectId, req.params.version)
  if (!fs.existsSync(dir)) {
    return res.send([])
  }

  const files = await fs.promises.readdir(dir);

  res.send(  files.map((file)=> ({
    name: file,
    content: fs.readFileSync(path.join(dir,file), {encoding: 'base64'})
  })))
});

module.exports = router;
