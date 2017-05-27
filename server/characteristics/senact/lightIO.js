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
    // TODO: code that toggles lights
  },
  
  setModeAutomatic: (mode) => {
    this.isAutomatic = mode
    if (mode) {
      //TODO: enable mode
    } else {
      //TODO: disable mode
    }
  }
  
  
  
}