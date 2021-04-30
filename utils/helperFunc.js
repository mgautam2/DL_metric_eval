

function checkIntervalOverlap(I1, I2) {

  if(I1.start > I2.start && I1.end < I2.end) {
    return 'overfill';
  }  
  else if(I1.start < I2.start && I1.end > I2.end) {
    return 'underfill';
  }
  else if ( I1.start > I2.start && I1.start < I2.end) { 
    return 'left';
  }
  else if ( I1.end > I2.start && I1.end < I2.end ) {
    return 'right';
  }  
  else {
    return 'noOverlap'
  }
}

module.exports = {
  checkIntervalOverlap
};