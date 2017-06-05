const rpio = require('rpio')

const sensors   = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

class antiTheftIO {
  constructor() {
    this.isOn = false
    this.isSignaling = false
    rpio.open(sensors.VIBRA, rpio.INPUT)
    rpio.open(actuators.BUZZER, rpio.OUTPUT, rpio.LOW)
    rpio.write(actuators.BUZZER, rpio.HIGH)
    setTimeout(() => {
        rpio.write(actuators.BUZZER, rpio.LOW)
      }, 500)
  }
  
  setAlarm() {
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
  }
  
  toggle: (mode) => {
    this.isOn = mode
    console.log('Anti-Theft mode: ' + (mode ? 'on' : 'off'))
    try {
      if (mode) {
        let self = this
        rpio.poll(sensors.VIBRA, (pin) => {
          if (rpio.read(pin)) {
            self.setAlarm()
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

module.exports = new antiTheftIO()