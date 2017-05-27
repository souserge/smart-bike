const rpio = require('rpio')

const LIGHT = 13

console.log("Light: " + rpio.read(LIGHT))

module.exports = {
  isOn: false,
  isAutomatic: false,
  
  init: () => {
    rpio.open(LIGHT, rpio.INPUT)
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