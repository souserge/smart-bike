function arrayToArrayBuffer(arr) {
    let uArr = new Uint8Array(arr)
    let arrBuffer = new ArrayBuffer(uArr.length)
    uArr.map(function(i, val){arrBuffer[i] = val})
    return arrBuffer
}

function strReplaceAt(idx, str, repStr) {
  const strLen = str.length
  const repStrLen = repStr.length
  if (idx >= strLen) return str
  
  if (idx < 0) {
    if (repStrLen + idx > 0) {
      return repStr.substr(-idx) + str.substr(repStrLen + idx)
    }
    else return str
  }
  
  if (strLen - (repStrLen + idx) < 0) {
    return str.substr(0, idx) + repStr.substr(0, strLen - idx)
  }
  else {
    return str.substr(0, idx) + repStr + str.substr(idx + repStrLen)
  }
}

// TESTS - delete when you are sure it works
//console.log(strReplaceAt(0, '00', '1'))
//console.log(strReplaceAt(1, '00', '1'))
//console.log(strReplaceAt(2, '00', '1'))
//console.log(strReplaceAt(0, '00', '12'))
//console.log(strReplaceAt(1, '00', '12'))
//console.log(strReplaceAt(-1, '00', '12'))
//console.log(strReplaceAt(-2, '00', '12'))