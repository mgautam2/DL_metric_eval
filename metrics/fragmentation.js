const { sigma } = require('../constants');



function checkInInterval(I1, I2) {
  
  if ((I1.start - sigma) < I2.start && (I1.end + sigma) > I2.start) {
    return true;
  }
  else {
    return false;
  }
}


function fragmentation(MP_to_GT, GT_to_MP, MPList, GTList) {
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length === 1) {
      
    }
  })
}

module.exports = fragmentation;


// GT -> list > 1
// dont botehr MP map tp GT
// get list of MP mapping
// check types of List