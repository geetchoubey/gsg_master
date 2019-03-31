'use strict';
const Cryptr = require('cryptr');
const cryptr = new Cryptr(process.env.ENCRYPTION_STRING);


let helper = {};

helper.str_slug = function (str) {
  str = str.replace(/^\s+|\s+$/g, ""); // trim
  str = str.toLowerCase();

  // remove accents, swap ñ for n, etc
  var from = "åàáãäâèéëêìíïîòóöôùúüûñç·/_,:;";
  var to = "aaaaaaeeeeiiiioooouuuunc------";

  for (var i = 0, l = from.length; i < l; i++) {
    str = str.replace(new RegExp(from.charAt(i), "g"), to.charAt(i));
  }

  str = str
    .replace(/[^a-z0-9 -]/g, "") // remove invalid chars
    .replace(/\s+/g, "-") // collapse whitespace and replace by -
    .replace(/-+/g, "-"); // collapse dashes

  return str;
};

helper.encrypt = function (str) {
  if (!str) return '';
  return cryptr.encrypt(str);
};

helper.decrypt = function (str) {
  if (!str)
    return '';
  return cryptr.decrypt(str);
};

global.logger = function (string) {
  console.log(string);
};

module.exports = helper;
