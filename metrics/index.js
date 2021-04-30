const hitsMisses = require('./hitsMisses');
const deletion = require('./deletion');
const insertion = require('./insertion');
const underfill = require('./underfill');
const overfill = require('./overfill');
const fragmentation = require('./fragmentation');
const subFragmentation = require('./subFragmentation');
const merge = require('./merge');


module.exports = {
  hitsMisses,
  deletion,
  insertion,
  underfill,
  overfill,
  fragmentation,
  subFragmentation,
  merge
};
