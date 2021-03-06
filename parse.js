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
  hitsMisses,
  deletion, 
  insertion,
  underfill,
  overfill,
  fragmentation,
  subFragmentation,
  merge
 } 
= require('./metrics');
const { createMP_to_GT, createGT_to_MP } = require('./utils/mapCreation.js');



let MP_to_GT;
let GT_to_MP;
  
async function main() {
  const GTCsv = await loadCSV('faltuAnnotation.csv'); // load GT
  const GTList = processGTList(createGTList(GTCsv)); // Convert Right Object to right
  
  const getTotalFrames = parseInt(Object.keys(predictionJson).slice(-1)[0]);
  convertJsonToCsv(predictionJson)
  const MPCsv = await loadCSV('prediction.csv');
  const MPList = createMPList(MPCsv);
  
  MP_to_GT = createMP_to_GT(MPList, GTList);
  GT_to_MP = createGT_to_MP(GTList, MPList);
  
  // Evalution Metrics
  const {hits: TPFrames, misses: TNFrames} = hitsMisses(GTList, MPList, getTotalFrames);
  const deletionFrames = deletion(MP_to_GT, GT_to_MP, MPList, GTList);
  const insertionFrames = insertion(MP_to_GT, GT_to_MP, MPList, GTList);
  const underfillFrames = underfill(MP_to_GT, GT_to_MP, MPList, GTList);
  const overfillFrames  = overfill(MP_to_GT, GT_to_MP, MPList, GTList);
  const fragmentationFrames = fragmentation(MP_to_GT, GT_to_MP, MPList, GTList);
  // const subFragmentationFrames = subFragmentation(MP_to_GT, GT_to_MP, MPList, GTList);
  const mergeFrames = merge(MP_to_GT, GT_to_MP, MPList, GTList);


  console.log(
   getTotalFrames ,',',  
   TPFrames , ',' ,
   TNFrames, ','  ,
   overfillFrames, ',',
   underfillFrames, ',',
   fragmentationFrames, ',',
   mergeFrames, ',',
   insertionFrames, ',',
   deletionFrames
)

}

main();
