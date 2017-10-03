const lightIO = require('./lightIO')
const antiTheftIO = require('./antiTheftIO')

const rpio = require('rpio')


antiTheftIO.toggle(true)
lightIO.set(true)
setTimeout( () => {lightIO.setModeAutomatic(true)}, 1000 )
