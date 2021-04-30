const { sigma } = require('../constants');

function underfill(MP_to_GT, GT_to_MP, MPList, GTList) {
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length === 1) {
      const currMP = MPList[list[0]];
      const startDiff = currMP.start - currGT.start;
      const endDiff = currGT.end - currMP.end;
      
      if (startDiff > sigma && startDiff > 0  &&  endDiff > sigma && endDiff > 0 ) { // refine conditions
        console.log("underfill at ", index, " in GT");
      }
    }
  })
}

module.exports = underfill;
