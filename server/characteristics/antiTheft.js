const bleno = require('bleno')

const ids = require('../../global/ble').bleIds
const antiTheftIO = require('./senact/antiTheftIO')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class AntiTheftCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: ids.get('ANTI_THEFT_CH').uuid,
      properties: [ 'read', 'write']
    })
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('AntiTheft - WriteRequest:')
    antiTheftIO.toggle(!!data[0])
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('AntiTheft - ReadRequest:')
    const data = Buffer.from([+antiTheftIO.isOn])
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = new AntiTheftCharacteristic()