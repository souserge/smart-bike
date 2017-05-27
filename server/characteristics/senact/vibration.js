const rpio = require('rpio')

const sensors   = require('./senactGlobals').sensors
const actuators = require('./senactGlobals').actuators

rpio.open(actuators.LED, rpio.OUTPUT, rpio.LOW)
rpio.open(sensors.VIBRA, rpio.INPUT)


function main() {
  rpio.write(actuators.LED, rpio.read(sensors.VIBRA))
  if ( rpio.read(sensors.VIBRA)) rpio.sleep(1)
}

setInterval(main, 42)