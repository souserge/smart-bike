const rpio = require('rpio')

const sensors = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

class LightIO {
  constructor() {
    console.log("create LigthtIO")
    this.isOn = false
    this.isAutomatic = false
    rpio.open(sensors.LIGHT, rpio.INPUT)
    rpio.open(actuators.LIGHT_REAR, rpio.OUTPUT)
	this.toggle()
	this.toggle()
  }
  
  toggle() {
    console.log("toggling")
	rpio.write(actuators.LIGHT_REAR, rpio.HIGH)
	rpio.msleep(10)
	rpio.write(actuators.LIGHT_REAR, rpio.LOW)
	rpio.msleep(10)
  }
  
  switchLights() {
    if (this.isOn) {
	  this.toggle()
	  this.toggle()
	} else {
	  this.toggle()
	}
	this.isOn = !this.isOn
    console.log("Mode: " + this.isOn)
  }
  
  set(value) {
    console.log('Lights Toggled: ' + (value ? 'on' : 'off'))
    if(this.isOn != value) {
      this.switchLights()
    }   
  }
  
  setModeAutomatic (mode) {
    console.log('Lights Automatic Mode: ' + (mode ? 'on' : 'off'))
    try {
      if (mode && !this.isAutomatic) {
        const self = this
        rpio.poll(sensors.LIGHT, (pin) => {
          self.set(rpio.read(pin)) // TOGGLE LIGHTS IF READ 1
        })
      } else if (this.isAutomatic) { // TODO: fix it gracefully
        rpio.poll(sensors.LIGHT, null)
      }
    } catch (e) {
      console.log("Poll error: " + e)
    }
    this.isAutomatic = mode
  }
}

module.exports = new LightIO()
