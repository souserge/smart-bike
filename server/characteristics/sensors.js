const lightIO = require('./senact/lightIO')
const antiTheftIO = require('./senact/antiTheftIO')

const rpio = require('rpio')


antiTheftIO.init()
lightIO.init()

antiTheftIO.toggle(true)
lightIO.set(true)
setTimeout( () => {lightIO.setModeAutomatic(true)}, 1000 )



const LIGHT = 15
let mode = true

function init() {
    rpio.open(LIGHT, rpio.OUTPUT)
    toggle()
    toggle()
    mode = false
}

function toggle() {
    rpio.write(LIGHT, rpio.HIGH)
    rpio.msleep(10)
    rpio.write(LIGHT, rpio.LOW)
    rpio.msleep(10)
}

function switchL() {
    console.log("Mode: " + mode)
    if (mode) {
        toggle()
        toggle()
    } else {
        toggle()
    }
    mode = !mode
}


init()
for (let i = 0; i < 4; i++) {
    switchL()
    rpio.sleep(2)
    switchL()
    rpio.sleep(2)
}