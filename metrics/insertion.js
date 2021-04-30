

function insertion(MP_to_GT, GT_to_MP, MPList, GTList) {
  let totalFrames = 0;
  
  MP_to_GT.forEach((list, index) => {
    if (list.length === 0) {
      totalFrames += MPList[index].getFrames();
    }
  })
  // console.log(totalFrames)
  return totalFrames;
}

module.exports = insertion;
