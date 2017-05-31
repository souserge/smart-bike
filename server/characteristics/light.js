const bleno = require('bleno')

const ids = require('../../global/ble').bleIds
const lightIO = require('./senact/lightIO')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class LightCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: ids.get('LIGHT_CH').uuid,
      properties: [ 'read', 'write']
    })
    lightIO.init()
  }
  
  writeLightIO(isAutomatic, isOn) {
    lightIO.setModeAutomatic(isAutomatic)
    if (!isAutomatic) lightIO.set(isOn)
  }
  
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Light - WriteRequest:')
    let isAutomatic = data.readUInt8(0)
    let isOn = data.readUInt8(1)
    console.log("IsAuto: " + isAutomatic + "; IsOn: " + isOn)
    this.writeLightIO(!!isAutomatic, !!isOn)
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Light - ReadRequest:')
    let data = Buffer.allocUnsafe(2) 
    data.writeUInt8(+lightIO.isAutomatic, 0)
    data.writeUInt8(+lightIO.isOn, 1)
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = LightCharacteristic
