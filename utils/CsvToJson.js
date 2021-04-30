const csv = require('csv-parser');
const { Parser } = require('json2csv');
const fs = require('fs');
const path = require('path');
const event = require('./event');


const FRAME_SIZE = 30;

async function loadCSV(file) {
  let results = [];
  const fd = fs.createReadStream(path.join(__dirname,`../csv/${file}`));
    
  await new Promise(function(resolve, reject) {
      fd.pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve();
      });
  });
  return results;
}

convertJsonToCsv = (data) => {
  const rowData = Object.entries(data).map( entry => {
    return {frame: entry[0], action: entry[1].action, confd: entry[1].confd, location: entry[1].location };
  })
  const fields = ['frame', 'action', 'confd', 'location'];
  const opts = { fields };
  try {
    const parser = new Parser(opts);
    const csv = parser.parse(rowData);
    fs.writeFileSync(path.join(__dirname, '../csv/prediction.csv'), csv);
  } catch (err) {
      console.log(err)
      throw new Error(err);
  }
}
  
function createGTList(GTCsv) {
  const results = [];
  
  GTCsv.forEach((item) => {
    const { Start_Frame, Stop_Frame, Behaviour} = item;
    if (Behaviour!== 'Begin Trial') {
      results.push(new event(parseInt(Start_Frame), parseInt(Stop_Frame), Behaviour));
    }
  });
  return results;
}

function createMPList(MPCsv) {
  const results = [];
  let prevLocation = 'null';
  let start = 0;
  
  for (let i = 0; i < MPCsv.length; i++) {
    const currFrame = MPCsv[i]; 
    
    if (currFrame['action'] === 'investigate') {
      if (currFrame['location'] !== prevLocation) {
          if (prevLocation === 'null' || prevLocation === '' ) { // starting out
            start = currFrame['frame'] - FRAME_SIZE;
            prevLocation = currFrame['location'];
          }
          else { // investigate action is changed
            results.push(new event(start, currFrame['frame'] - FRAME_SIZE, prevLocation));
            start = currFrame['frame'] - FRAME_SIZE;
            prevLocation = currFrame['location'];
          }
      }
    }
    else {
      if (prevLocation === 'left' || prevLocation === 'right') {
        results.push(new event(start, currFrame['frame'] - FRAME_SIZE, prevLocation));
        prevLocation = '';
      }
    }
  }
  
  if (prevLocation === 'left' || prevLocation === 'right' ) { // if there is anything left
    results.push(new event(start, MPCsv.slice(-1)[0]['frame'], prevLocation));
  }
  return results;
}  

function processGTList(List) {
  
  for (let i = 0; i < List.length; i++) {
    if (List[i].action === 'Left Object')
      List[i].action = 'left';
    else if (List[i].action === 'Right Object')
      List[i].action = 'right';
  }
  return List;
}



module.exports = {
  loadCSV,
  convertJsonToCsv,
  createGTList,
  createMPList,
  processGTList
};
