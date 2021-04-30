const { sigma } = require('../utils/constants');


function underfill(MP_to_GT, GT_to_MP, MPList, GTList) {
  let totalFrames = 0;
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length === 1) {
      const MPIndex = list[0];
      
      if(MP_to_GT.get(MPIndex).length === 1 && MP_to_GT.get(MPIndex)[0] === index) {
        const currMP = MPList[MPIndex];
        const startDiff = currMP.start - currGT.start;
        const endDiff = currGT.end - currMP.end;
        
        if (startDiff > sigma && startDiff > 0  &&  endDiff > sigma && endDiff > 0 ) { // refine conditions
          totalFrames += (currGT.getFrames() - currGT.getOverlap(currMP));
        }
      }
    }
  })
  // console.log(totalFrames);
  return totalFrames;       
}

module.exports = underfill;
