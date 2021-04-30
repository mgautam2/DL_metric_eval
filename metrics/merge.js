const { checkListType } = require('../utils/helperFunc');


function subFragmentation(MP_to_GT, GT_to_MP, MPList, GTList) {
  let totalFrames = 0;  
  
  MP_to_GT.forEach((list, index) => {
    const currMP =  MPList[index];
    
    if (list.length > 1) {
      // console.log("--> ", currMP)
      // list.forEach((i) => {
      //   console.log(GTList[i])
      // })
      let coverage = 0;
      const type = checkListType(list, GTList, currMP.getAction());
      
      if (type === 'sameFrag') { // CHnahe here
        const listFrames = list.reduce((acc, eventIndex) => {
          acc += currMP.getOverlap(GTList[eventIndex]);
          return acc;
        }, 0);
        totalFrames += currMP.getFrames() - listFrames;
      }
    }
  })
  console.log("Total", totalFrames)
  return totalFrames;
}

module.exports = subFragmentation;


// GT -> list > 1
// dont botehr MP map tp GT
// get list of MP mapping
// check types of List