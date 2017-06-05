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
      console.log("Turning buzzer ON!!")
      setTimeout(() => {
        console.log("Turning buzzer off")
        this.isSignaling = false
        rpio.write(actuators.BUZZER, rpio.LOW)
      }, 2000)
    }
  },
  
  toggle: (mode) => {
    this.isOn = mode
    console.log('Anti-Theft mode: ' + (mode ? 'on' : 'off'))
    try {
      if (mode) {
        rpio.poll(sensors.VIBRA, (pin) => {
          if (rpio.read(pin)) {
            antiTheftIO.setAlarm()
          }
        })
      } else {
        rpio.poll(sensors.LIGHT, null)
      }
    } catch (e) {
      console.log("Poll error: " + e)
    }
  }
}

module.exports = antiTheftIO