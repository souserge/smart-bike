const rpio = require('rpio')

const sensors = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

module.exports = {
  isOn: false,
  isAutomatic: false,
  
  init: () => {
    rpio.open(sensors.LIGHT, rpio.INPUT)
  },
  
  set: (value) => {
    this.isOn = value
    rpio.write(actuators.LED, +value)
    console.log('Lights Toggled: ' + (mode ? 'on' : 'off'))
  },
  
  setModeAutomatic: (mode) => {
    this.isAutomatic = mode
    
    if (mode) {
      rpio.poll(sensors.LIGHT, (pin) => { 
        console.log('Lights Automatic Mode: ' + (mode ? 'on' : 'off'))
        this.set(rpio.read(pin)) // TOGGLE LIGHTS IF READ 1
      })
    } else {
      rpio.poll(sensors.LIGHT, null)
    }
  }
}

module.exports.init()
module.exports.set(true)
rpio.sleep(1)
module.exports.set(false)
module.exports.setModeAutomatic(true)