const rpio = require('rpio')

const sensors   = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

const antiTheftIO = {
  isOn: false,
  isSignaling: false,
  
  
  init: () => {
    rpio.open(sensors.VIBRA, rpio.INPUT)
    rpio.open(actuators.BUZZER, rpio.OUTPUT, rpio.LOW)
  },
  
  setAlarm: () => {
    console.log('THIEF!!')
    
    if(!this.isSignaling) {
      rpio.write(actuators.BUZZER, rpio.HIGH)
      this.isSignaling = true
      setTimeout(() => {
        antiTheftIO.isSignaling = false
        rpio.write(actuators.BUZZER, rpio.LOW)
      }, 500)
    }
  },
  
  toggle: (mode) => {
    this.isOn = mode
    console.log('Anti-Theft mode: ' + (mode ? 'on' : 'off'))
    if (mode) {
      rpio.poll(sensors.VIBRA, (pin) => {
        if (rpio.read(pin)) {
          antiTheftIO.setAlarm()
        }
      })
    } else {
      rpio.poll(sensors.LIGHT, null)
    }
  }
}

module.exports = antiTheftIO