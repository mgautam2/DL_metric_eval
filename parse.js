const predictionJson = require('./csv/prediction.json');
const { 
  loadCSV,
  convertJsonToCsv,
  createGTList,
  createMPList 
} = require('./utils/CsvToJson.js');
const { createMP_to_GT, createGT_to_MP } = require('./utils/mapCreation.js');


let MP_to_GT;
let GT_to_MP;
  
async function main() {
  const GTCsv = await loadCSV('faltuAnnotations.csv'); // load GT
  const GTList = createGTList(GTCsv);
  
  convertJsonToCsv(predictionJson)
  const MPCsv = await loadCSV('faltuPrediction.csv');
  const MPList = createMPList(MPCsv);
  
  MP_to_GT = createMP_to_GT(MPList, GTList);
  GT_to_MP = createGT_to_MP(GTList, MPList);
  // console.log(MP_to_GT)
  // console.log(GT_to_MP)
}

main();
