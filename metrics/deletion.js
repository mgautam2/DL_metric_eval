

function deletion(MP_to_GT, GT_to_MP, MPList, GTList) {
  
  GT_to_MP.forEach((list, index) => {
    if (list.length === 0) {
      console.log("deletion at ", index, " in GT");
    }
  })
}

module.exports = deletion;
