
const VideoFrameLen = 10320; // change this later 


function creatGTFrameList(GTList) {
  const list = new Array(VideoFrameLen).fill(0);
  
  for (let i = 0; i < GTList.length; i++) {
    const currGT = GTList[i];
    
    for (let j = currGT.start; j <= currGT.end; j++) {  
      list[j] = 1;
    }
  }
}

function creatMPFrameList(MPList) {
  const list = new Array(VideoFrameLen).fill(0);
  
  for (let i = 0; i < MPList.length; i++) {
    const currMP = GTList[i];
    
    for (let j = MPList.start; j <= MPList.end; j++) {  
      list[j] = 1;
    }
  }
}

function subFragmentation(GTList, MPList) {
  const GTFrames = creatGTFrameList(GTList);
  const MPFrames =creatMPFrameList(MPList);
  // do soemthing with them
}




module.exports = subFragmentation;
