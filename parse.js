const predictionJson = require('./csv/prediction.json');
const { 
  loadCSV,
  convertJsonToCsv,
  createGTList,
  createMPList 
} = require('./utils');

const sigma = 50; // threshold
let P_to_G;


function createP_to_G(MPList, GTList) {
  // MPList = MPList.slice(0, 5);
  // GTList = GTList.slice(0, 5);

  let map = new Map();
  let i = 0;
  let j = 0;
  
  while(i < MPList.length) {
    const currMP = MPList[i]; // current Model Prediction
    const list = [];
    console.log("--> MP ", currMP);
    
    
    while(j < GTList.length) {
      // console.log("First Inner loop")
      const currGT = GTList[j]; // current Ground Truth
      const startDiff = Math.abs(currMP.start - currGT.start);
      const endDiff = Math.abs(currMP.end - currGT.end);
      console.log("--> GT " , j , " -> ", currGT);
      
      if(currMP.end + sigma <  currGT.end) {
        console.log("      ^^^Too much------------------^^^\n")
        break;
      }
      else if(startDiff < sigma || endDiff < sigma) { // intervals boundary are similar
        list.push(j)
      }
      j++;
    }
    
    map.set(i, list);
    console.log("Map is")
    console.log(map.get(i))
    
    i++;
  }
  
}

  
async function main() {
  const GTCsv = await loadCSV('faltuAnnotations.csv'); // load GT
  const GTList = createGTList(GTCsv);
  
  
  convertJsonToCsv(predictionJson)
  const MPCsv = await loadCSV('faltuPrediction.csv');
  const MPList = createMPList(MPCsv);
  P_to_G = createP_to_G(MPList, GTList);
  
}

main();
