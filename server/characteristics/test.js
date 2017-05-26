const bleno = require('bleno')

const convertData = require('../convertData')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class TestCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: 'd271',
      properties: [ 'read', 'write'],
      descriptors: [
         new Descriptor({
           uuid: '2901',
           value: 'Test'
         })
      ]
    }) 
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Write request: Test')
    console.log('Data sent: ' + data)
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Read request: Test')
    const data = convertData.strToBuff('42.42')
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = {
  TestCharacteristic
}
