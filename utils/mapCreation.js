
const { sigma } = require('../constants');

// event { start: 3000, end: 3390, action: 'left' },
// 
// 
// event { start: 3003, end: 3131, action: 'left' },
// event { start: 3154, end: 3400, action: 'left' }

function checkIntervalOverlap(I1, I2) {
   console.log("\n\n")
   console.log(I1)
   console.log(I2)
  if(I1.start > I2.start && I1.end < I2.end) {
    console.log('overfill interval')
    return 'overfill';
  }  
  else if(I1.start < I2.start && I1.end > I2.end) {
    console.log('underfill interval')
    return 'underfill';
  }
  else if ( I1.start > I2.start && I1.start < I2.end) { 
    console.log('left interval')  
    return 'left';
  }
  else if ( I1.end > I2.start && I1.end < I2.end ) {
    console.log('right Intervalk')
    return 'right';
  }
  
  else {
    console.log('noOverlap')
    return 'noOverlap'
  }
}


function createMP_to_GT(MPList, GTList) {
  let map = new Map();
  let i = 0;
  let j = 0;
  
  while(i < MPList.length) {
    const currMP = MPList[i]; // current Model Prediction
    const list = [];
    // console.log(i , "--> MP ", currMP);
    
    while(j < GTList.length) {
      const currGT = GTList[j]; // current Ground Truth
      // console.log("--> GT " , j , " -> ", currGT);
      let overlapResult = checkIntervalOverlap(currMP, currGT);
      
      if(currMP.end + sigma <  currGT.start) {
        // console.log("      ^^^Too much------------------^^^\n")
        break;
      }
      else if(overlapResult !== 'noOverlap') { 
        list.push(j)
      }
      
      if(overlapResult === 'right' || overlapResult === 'overfill') {
        console.log("Not incremeninging")
        break;
      }
      else {
        j++;
      }
    }
    
    map.set(i, list);
    // console.log("Map is ",map.get(i))
    i++;
  }
  return map;
}

function createGT_to_MP(GTList, MPList) {
  console.log("\n\n")
  let map = new Map();
  let i = 0;
  let j = 0;
  
  while(i < GTList.length) {
    const currGT = GTList[i]; // current Ground Truth
    const list = [];
    // console.log("--> MP ", currGT);    

    while(j < MPList.length) {
      const currMP = MPList[j]; // current Model Prediction
      // console.log("--> GT " , j , " -> ", currMP);
      let overlapResult = checkIntervalOverlap(currGT, currMP);
      
      if(currGT.end + sigma <  currMP.start) {
        // console.log("      ^^^Too much------------------^^^\n")
        break;
      }
      else if(overlapResult !== 'noOverlap') { 
        list.push(j)
      }
      
      if(overlapResult === 'right' || overlapResult === 'overfill') {
        console.log("Not incremeninging")
        break;
      }
      else {
        j++;
      }
    }
    map.set(i, list);
    // console.log("Map is ",map.get(i), "\n");
    i++;
  }
  return map;
}

module.exports = {
  createMP_to_GT,
  createGT_to_MP
};