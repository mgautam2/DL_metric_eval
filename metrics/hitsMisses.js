
// const VideoFrameLen = 10320; // change this later 


function creatGTFrameList(GTList, TFrames) {
  const list = new Array(TFrames).fill(0);
  
  for (let i = 0; i < GTList.length; i++) {
    const currGT = GTList[i];
    
    for (let j = currGT.start; j <= currGT.end; j++) {  
      list[j] = 1;
    }
  }
  return list;
}

function creatMPFrameList(MPList, TFrames) {
  const list = new Array(TFrames).fill(0);
  
  for (let i = 0; i < MPList.length; i++) {
    const currMP = MPList[i];
    for (let j = currMP.start; j <= currMP.end; j++) {  
      list[j] = 1;
    }
  }
  return list;
}

function subFragmentation(GTList, MPList, TFrames) {
  const GTFrames = creatGTFrameList(GTList, TFrames);
  const MPFrames =creatMPFrameList(MPList, TFrames);
  let hits = 0;
  let misses = 0;
  
  for (let i = 0; i < GTFrames.length; i++) {
    if (GTFrames[i] === 0 && MPFrames[i] === 0)
      misses++;
    else if (GTFrames[i] === 1 && MPFrames[i] === 1)
      hits++;
  }

  return {hits, misses};
}




module.exports = subFragmentation;
