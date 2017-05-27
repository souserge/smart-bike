const bleno = require('bleno')

const test = require('./characteristics/test')
const light = require('./characteristics/light')
const ids = require('../global/ble').bleIds

const PrimaryService = bleno.PrimaryService

const testCharacteristic = new test.TestCharacteristic()
const lightCharacteristic = new light.LightCharacteristic()

const bikeService = new PrimaryService({
  uuid: ids.get('SERVICE').uuid,
  characteristics: [
    testCharacteristic,
    lightCharacteristic
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
  }
})
