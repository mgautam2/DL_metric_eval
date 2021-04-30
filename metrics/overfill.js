const { sigma } = require('../constants');

function overfill(MP_to_GT, GT_to_MP, MPList, GTList) {
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length === 1) {
      const currMP = MPList[list[0]];
      const startDiff = currGT.start - currMP.start;
      const endDiff = currMP.end - currGT.end;
      
      if (startDiff > sigma && startDiff > 0 &&  endDiff > sigma && endDiff > 0 ) {
        console.log("Overfill at ", index, " in GT");
      }
    }
  })
}

module.exports = overfill;
