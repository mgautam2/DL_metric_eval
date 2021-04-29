
const sigma = 50; // threshold

function createMP_to_GT(MPList, GTList) {
  let map = new Map();
  let i = 0;
  let j = 0;
  
  while(i < MPList.length) {
    const currMP = MPList[i]; // current Model Prediction
    const list = [];
    // console.log("--> MP ", currMP);
    
    while(j < GTList.length) {
      const currGT = GTList[j]; // current Ground Truth
      const startDiff = Math.abs(currMP.start - currGT.start);
      const endDiff = Math.abs(currMP.end - currGT.end);
      // console.log("--> GT " , j , " -> ", currGT);
      
      if(currMP.end + sigma <  currGT.start) {
        // console.log("      ^^^Too much------------------^^^\n")
        break;
      }
      else if(startDiff < sigma || endDiff < sigma) { // intervals boundary are similar
        list.push(j)
      }
      j++;
    }
    
    map.set(i, list);
    // console.log("Map is ",map.get(i))
    i++;
  }
  return map;
}

function createGT_to_MP(GTList, MPList) {
  let map = new Map();
  let i = 0;
  let j = 0;
  
  while(i < GTList.length) {
    const currGT = GTList[i]; // current Ground Truth
    const list = [];
    console.log("--> MP ", currGT);
    
    while(j < MPList.length) {
      const currMP = MPList[j]; // current Model Prediction
      
    // Change conditions later  
      const startDiff = Math.abs(currMP.start - currGT.start);
      const endDiff = Math.abs(currMP.end - currGT.end);
      console.log("--> GT " , j , " -> ", currMP);
      
      if(currGT.end + sigma <  currMP.start) {
        console.log("      ^^^Too much------------------^^^\n")
        break;
      }
      else if(startDiff < sigma || endDiff < sigma) { // intervals boundary are similar
        list.push(j)
      }
      j++;
    }
    
    map.set(i, list);
    console.log("Map is ",map.get(i), "\n");
    i++;
  }
  return map;
}


module.exports = {
  createMP_to_GT,
  createGT_to_MP
};