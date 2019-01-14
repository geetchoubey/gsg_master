'use strict';

let fs = require('fs');
let path = require('path');
const Sequelize = require('sequelize');
let sequelize = require('../utils/connection');
let paginate = require('express-paginate');

var db = {};

fs.readdirSync(__dirname)
  .filter((file) => {
    return (file.indexOf('.') !== 0 && (file !== 'index.js') && (file.slice(-3) === '.js'));
  })
  .forEach(file => {
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.paginate = (req, results) => {
  const itemCount = results.count;
  const pageCount = Math.ceil(results.count / req.query.limit);
  return {
    data: results.rows,
    pageCount,
    itemCount,
    pages: paginate.getArrayPages(req)(3, pageCount, req.query.page)
  }
};

module.exports = db;
