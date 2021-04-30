

function checkIntervalOverlap(I1, I2) {

  if(I1.start > I2.start && I1.end < I2.end) {
    return 'overfill';
  }  
  else if(I1.start < I2.start && I1.end > I2.end) {
    return 'underfill';
  }
  else if ( I1.start > I2.start && I1.start < I2.end) { 
    return 'left';
  }
  else if ( I1.end > I2.start && I1.end < I2.end ) {
    return 'right';
  }  
  else {
    return 'noOverlap'
  }
}


function checkListType(list, MPList, action) {
  let sameAction = true;
  const firstIndex = list[0];
  const lastIndex = list.slice(-1);
  
  for (let i = 0; i < list.length; i++) {
    if(MPList[list[i]].getAction() !== action) {
      sameAction = false;
      break;
    }
  }
  
  if(sameAction) {
    return 'sameFrag';
  }
  
  if(MPList[lastIndex].getAction() === action && MPList[firstIndex].getAction() === action)
    return 'subFrag';
  else 
    return 'error';  
}



module.exports = {
  checkIntervalOverlap,
  checkListType
};