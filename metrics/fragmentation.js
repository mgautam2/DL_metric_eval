

function fragmentation(MP_to_GT, GT_to_MP, MPList, GTList) {
  
  console.log(MPList[9])
  console.log(MPList[10])
  console.log(MPList[11], "\n")
  
  
  GT_to_MP.forEach((list, index) => {
    const currGT =  GTList[index];
    
    if (list.length > 1) {
      console.log(currGT)
      console.log(list)
    }
  })
}

module.exports = fragmentation;


// GT -> list > 1
// dont botehr MP map tp GT
// get list of MP mapping
// check types of List