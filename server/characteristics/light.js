const bleno = require('bleno')

const ids = require('../../global/ble').bleIds
const lightIO = require('./senact/lightIO')

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class LightCharacteristic extends Characteristic {
  constructor() {
    console.log("create LightCharacteristic")
    super({
      uuid: ids.get('LIGHT_CH').uuid,
      properties: [ 'read', 'write']
    })
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Light - WriteRequest:')
    let strData = data.toString('utf8')
    console.log(strData)
    let isAutomatic = !!+strData[0]
    let isOn = !!+strData[1]
    console.log("IsAuto: " + isAutomatic + "; IsOn: " + isOn)
    
    lightIO.setModeAutomatic(isAutomatic)
    if (!isAutomatic) lightIO.set(isOn)
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Light - ReadRequest:')
    const data = Buffer.from(+lightIO.isAutomatic + '' + +lightIO.isOn, 'utf8')
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = LightCharacteristic
