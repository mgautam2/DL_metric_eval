const predictionJson = require('./csv/prediction.json');
const { 
  loadCSV,
  convertJsonToCsv,
  createGTList,
  createMPList ,
  processGTList
} 
= require('./utils/CsvToJson.js');
const { 
  deletion, 
  insertion,
  underfill,
  overfill,
  fragmentation
 } 
= require('./metrics');
const { createMP_to_GT, createGT_to_MP } = require('./utils/mapCreation.js');



let MP_to_GT;
let GT_to_MP;
  
async function main() {
  const GTCsv = await loadCSV('faltuAnnotation.csv'); // load GT
  const GTList = processGTList(createGTList(GTCsv)); // Convert Right Object to right
  
  convertJsonToCsv(predictionJson)
  const MPCsv = await loadCSV('faltuPrediction.csv');
  const MPList = createMPList(MPCsv);
  
  console.log(MPList)
  console.log(GTList)
  console.log("\n----------------------\n\n")
  MP_to_GT = createMP_to_GT(MPList, GTList);
  GT_to_MP = createGT_to_MP(GTList, MPList);

  console.log("\n")
  console.log(MP_to_GT)
  console.log(GT_to_MP)

  
  
  // Evalution Metrics
  // deletion(MP_to_GT, GT_to_MP, MPList, GTList);
  // insertion(MP_to_GT, GT_to_MP, MPList, GTList);
  // underfill(MP_to_GT, GT_to_MP, MPList, GTList);
  // overfill(MP_to_GT, GT_to_MP, MPList, GTList);
  // fragmentation(MP_to_GT, GT_to_MP, MPList, GTList);
}

main();
