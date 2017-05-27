const bleno = require('bleno')
const lights = {} // TODO!!

const Characteristic = bleno.Characteristic,
      Descriptor     = bleno.Descriptor

class LightCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: 'd271',
      properties: [ 'read', 'write'],
      descriptors: [
         new Descriptor({
           uuid: '2901',
           value: 'Lights'
         })
      ]
    })
    
    this.isAutomatic = false
    this.isOn = false
  }
  
  checkLights() {
    lights.setAutomatic(this.isAutomatic)
    if (!this.isAutomatic) lights.toggle(this.isOn)
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Light - WriteRequest:')
    this.isAutomatic = !!data[0]
    this.isOn = !!data[1]
    this.checkLights()
    
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Light - ReadRequest:')
    const data = Buffer.from([+this.isAutomatic, +this.isOn])
    console.log('\tValue: ' + data)
    callback(this.RESULT_SUCCESS, data)
  } 
}

module.exports = {
  TestCharacteristic
}
