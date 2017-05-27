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
    console.log('Lights Toggled: ' + (value ? 'on' : 'off'))
    this.isOn = value
    rpio.write(actuators.LED, +value)
  },
  
  setModeAutomatic: (mode) => {
    this.isAutomatic = mode
    console.log('Lights Automatic Mode: ' + (mode ? 'on' : 'off'))
    if (mode) {
      const self = this
      rpio.poll(sensors.LIGHT, (pin) => {
        self.set(rpio.read(pin)) // TOGGLE LIGHTS IF READ 1
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


setInterval(() => {
  
}, 42)