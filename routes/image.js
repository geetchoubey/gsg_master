const express = require('express');
const router = express.Router();

const path = require('path');

const fs = require('fs');

let dir = path.join(__dirname, '../uploads');

let mime = {
  html: 'text/html',
  txt: 'text/plain',
  css: 'text/css',
  gif: 'image/gif',
  jpg: 'image/jpeg',
  png: 'image/png',
  svg: 'image/svg+xml',
  js: 'application/javascript'
};

router.get('/:imageName', (req, res, next) => {
  let file = path.join(dir, req.path.replace(/\/$/, 'index.html'));
  if (file.indexOf(dir + path.sep) !== 0) {
    return res.status(403).end('Forbidden');
  }

  let type = mime[path.extname(file).slice(1)] || 'text/plain';
  let s = fs.createReadStream(file);
  s.on('open', () => {
    res.set('Content-Type', type);
    s.pipe(res);
  });
  s.on('error', () => {
    res.set('Content-Type', 'text/plain');
    res.status(404).end('Not found');
  });
});

module.exports = router;
