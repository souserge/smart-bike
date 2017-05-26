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
    console.log('Test - WriteRequest:')
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Test - ReadRequest:')
    const data = 'world!'
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, convertData.strToBuff(data))
  } 
}

module.exports = {
  TestCharacteristic
}
