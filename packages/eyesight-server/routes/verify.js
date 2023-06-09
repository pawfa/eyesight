var express = require('express');
var router = express.Router();
const pixelmatch = require('pixelmatch');
const PNG = require('pngjs').PNG;
const fs = require('fs');

router.get('/:projectId/:version', function(req, res, next) {
  const img1 = PNG.sync.read(fs.readFileSync(`${req.params.id}.png`));
  const img2 = PNG.sync.read(fs.readFileSync('example2.png'));
  const {width, height} = img1;
  const diff = new PNG({width, height});

  pixelmatch(img1.data, img2.data, diff.data, width, height, {threshold: 0.1});

  fs.writeFileSync('diff.png', PNG.sync.write(diff));
  res.send('respond with a resource');
});

module.exports = router;
