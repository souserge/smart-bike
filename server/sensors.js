const rpio = require('rpio')

const VIBRA = 11, LED = 12

rpio.open(LED, rpio.OUTPUT, rpio.LOW)
rpio.open(VIBRA, rpio.INPUT)


function main() {
  rpio.write(LED, rpio.read(VIBRA))
  if ( rpio.read(VIBRA)) rpio.sleep(1)
}

setInterval(main, 42)