

function deletion(MP_to_GT, GT_to_MP, MPList, GTList) {
  let totalFrames = 0;
  
  GT_to_MP.forEach((list, index) => {
    if (list.length === 0) {
      totalFrames += GTList[index].getFrames();
    }
  });
  // console.log(totalFrames)
  return totalFrames;
}

module.exports = deletion;
