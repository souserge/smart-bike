const rpio = require('rpio')

const VIBRA = 11, LED = 12, LIGHT = 13

rpio.open(LED, rpio.OUTPUT, rpio.LOW)
rpio.open(VIBRA, rpio.INPUT)
rpio.open(VIBRA, rpio.INPUT)

function main() {
  rpio.write(LED, rpio.read(VIBRA))
  if ( rpio.read(VIBRA)) rpio.sleep(1)
  console.log("Light: " + rpio.read(LIGHT))
  //RCtime()
}

setInterval(main, 42)


function RCtime() {
  let reading = 0
  rpio.write(LIGHT, rpio.LOW)
  rpio.close(LIGHT)
  rpio.msleep(100)
  while(rpio.read(LIGHT) == rpio.LOW) {
    reading++
  }
  return reading
}