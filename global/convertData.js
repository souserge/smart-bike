function arrayToArrayBuffer(arr) {
    let uArr = new Uint8Array(arr)
    let arrBuffer = new ArrayBuffer(uArr.length);
    uArr.map(function(i, val){arrBuffer[i] = val});
    return arrBuffer
}