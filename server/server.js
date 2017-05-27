const bleno = require('bleno')

const test = require('./characteristics/test')
const globals = require('./globals')

const PrimaryService = bleno.PrimaryService

const testCharacteristic = new test.TestCharacteristic()

const bikeService = new PrimaryService({
  uuid: globals.BIKE_SERVICE_UUID,
  characteristics: [
    testCharacteristic
  ]
});

bleno.on('stateChange', function(state) {
  console.log('State changed to: ' + state)

  if (state === 'poweredOn') {
    bleno.startAdvertising(globals.PI_NAME, [globals.PI_UUID])
    bleno.startAdvertising(globals.BIKE_SERVICE_NAME, [bikeService.uuid])
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
