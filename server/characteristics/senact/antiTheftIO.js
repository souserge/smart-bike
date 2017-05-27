const rpio = require('rpio')

const sensors   = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

const antiTheftIO = {
  isOn: false,
  
  init: () => {
    rpio.open(sensors.VIBRA, rpio.INPUT)
    rpio.open(actuators.BUZZER, rpio.OUTPUT, rpio.LOW)
  },
  
  setAlarm: (value) => {
    if (value)console.log('THIEF!!!!')
    this.isOn = value
    rpio.write(actuators.BUZZER, +value)
  },
  
  toggle: (mode) => {
    this.isOn = mode
    console.log('Anti-Theft mode: ' + (mode ? 'on' : 'off'))
    if (mode) {
      rpio.poll(sensors.VIBRA, (pin) => {
        antiTheftIO.setAlarm(rpio.read(pin))
      })
    } else {
      rpio.poll(sensors.LIGHT, null)
    }
  }
}


antiTheftIO.init()
antiTheftIO.toggle(true)

module.exports = antiTheftIO