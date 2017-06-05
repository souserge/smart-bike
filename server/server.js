const bleno = require('bleno')

const testCharacteristic = require('./characteristics/test')
const lightCharacteristic = new require('./characteristics/light')
const antiTheftCharacteristic = require('./characteristics/antiTheft')

const ids = require('../global/ble').bleIds

const PrimaryService = bleno.PrimaryService

const bikeService = new PrimaryService({
  uuid: ids.get('SERVICE').uuid,
  characteristics: [
    testCharacteristic,
    lightCharacteristic,
    antiTheftCharacteristic
  ]
});

bleno.on('stateChange', function(state) {
  console.log('State changed to: ' + state)

  if (state === 'poweredOn') {
    bleno.startAdvertising(ids.get('PI').name, [ids.get('PI').uuid])
    bleno.startAdvertising(ids.get('SERVICE').name, [bikeService.uuid])
  } else {
    bleno.stopAdvertising()
  }
})

bleno.on('advertisingStart', function(error) {
  console.log('Advertising started: ' + (error ? 'error ' + error : 'success'))
  if (!error) {
    bleno.setServices([bikeService])
    console.log('Advertising ' + ids.get('SERVICE').name + ' with UUID ' + bikeService.uuid)
  }
})

process.on('SIGTERM', function () {
  
})