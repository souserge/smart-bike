const bleno = require('bleno')

const ids = require('../global/ble').bleIds
const lightIO = require('./senact/lightIO')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class LightCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: ids.get('LIGHT_CH').uuid,
      properties: [ 'read', 'write']
    })
  
  
  writeLightIO(isAutomatic, isOn) {
    lightIO.setModeAutomatic(isAutomatic)
    if (!isAutomatic) lightIO.set(isOn)
  }
  
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Light - WriteRequest:')
    this.writeLightIO(!!data[0], !!data[1])
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Light - ReadRequest:')
    const data = Buffer.from([+lightIO.isAutomatic, +lightIO.isOn])
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = {
  TestCharacteristic
}
