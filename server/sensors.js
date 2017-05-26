const rpio = require('rpio')

const VIBRA = 11, LED = 12, LIGHT = 13

rpio.open(LED, rpio.OUTPUT, rpio.LOW)
rpio.open(VIBRA, rpio.INPUT)
rpio.open(LIGHT, rpio.INPUT)

function main() {
  rpio.write(LED, rpio.read(VIBRA))
  if ( rpio.read(VIBRA)) rpio.sleep(1)
  console.log("Light: " + rpio.read(LIGHT))
}

setInterval(main, 42)