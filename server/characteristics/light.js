const bleno = require('bleno')
const lights = require('./senact/lightIO').lights

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class LightCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: 'd272',
      properties: [ 'read', 'write'],
      descriptors: [
         new Descriptor({
           uuid: '2902',
           value: 'Light'
         })
      ]
    })
  
  
  writeLights(isAutomatic, isOn) {
    lights.setModeAutomatic(isAutomatic)
    if (!isAutomatic) lights.set(isOn)
  }
  
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Light - WriteRequest:')
    this.writeLights(!!data[0], !!data[1])
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Light - ReadRequest:')
    const data = Buffer.from([+lights.isAutomatic, +lights.isOn])
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = {
  TestCharacteristic
}
