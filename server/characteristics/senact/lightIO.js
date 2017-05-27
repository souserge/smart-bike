const rpio = require('rpio')

const sensors = require('./senactGlobals').sensors

module.exports = {
  isOn: false,
  isAutomatic: false,
  
  init: () => {
    rpio.open(sensors.LIGHT, rpio.INPUT)
  },
  
  set: (value) => {
    this.isOn = value
    rpio.read(actuators.LED, value)
  },
  
  setModeAutomatic: (mode) => {
    this.isAutomatic = mode
    conslole.log('Lights Mode: ' + (mode ? 'on' : 'off'))
    if (mode) {
      rpio.poll(sensors.LIGHT, (pin) => { this.set(rpio.read(pin)) }) // TOGGLE LIGHTS IF READ 1
    } else {
      rpio.poll(sensors.LIGHT, null)
    }
  }
}

module.exports.init()
module.exports.set(true)
rpio.sleep(1)
module.exports.set(false)
module.exports.setAutomatic(true)