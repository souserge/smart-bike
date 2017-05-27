const bleno = require('bleno')

const ids = require('../../global/ble').bleIds
const convertData = require('../convertData')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class TestCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: ids.get('TEST_CH').uuid,
      properties: ['read', 'write']
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
    callback(this.RESULT_SUCCESS, Buffer.from(data, 'utf8'))
  } 
}

module.exports = TestCharacteristic
