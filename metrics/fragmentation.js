const { checkListType } = require('../utils/helperFunc');


function fragmentation(MP_to_GT, GT_to_MP, MPList, GTList) {
  let totalFrames = 0;  
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length > 1) {
      // console.log("--> ", currGT)
      // list.forEach((i) => {
      //   console.log(MPList[i])
      // })
      let coverage = 0;
      const type = checkListType(list, MPList, currGT.getAction());
  
      if (type !== 'error') {
        const listFrames = list.reduce((acc, eventIndex) => {
          acc += currGT.getOverlap(MPList[eventIndex]);
          return acc;
        }, 0);
        totalFrames += currGT.getFrames() - listFrames;
      }
    }
  })
  // console.log("Total", totalFrames)
  return totalFrames;
}

module.exports = fragmentation;


// GT -> list > 1
// dont botehr MP map tp GT
// get list of MP mapping
// check types of List