const bleno = require('bleno')

const PI_NAME = 'SmartBike'

bleno.on('stateChange', (state) => {
    console.log('State change: ' + state);
    if (state === 'poweredOn') {
        bleno.startAdvertising(PI_NAME, ['12ab']);
    } else {
        bleno.stopAdvertising();
    }
});

var PrimaryService = bleno.PrimaryService;
var Characteristic = bleno.Characteristic;
var Descriptor = bleno.Descriptor;


// Write the secret to this Characteristic to unlock
class UnlockCharacteristic extends Characteristic {
  constructor() {
    
    super({
      uuid: 'd271',
      properties: ['write'],
      descriptors: [
         new Descriptor({
           uuid: '2901',
           value: 'Unlock'
         })
      ]
    })
    
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    let status

    // reset lock and lights after 4 seconds
    setTimeout(this.reset.bind(this), 4000);

    console.log('unlock: ' + data);
    console.log('status: ' + status);

    callback(this.RESULT_SUCCESS);

    this.emit('status', status);
  }
  
  // close the lock and reset the lights
  reset() {
    this.emit('status', 'locked');
  }
  
}


// Current status of the lock
class StatusCharacteristic extends Characteristic {
  
  constructor() {
    super({
      uuid: 'd272',
      properties: ['notify'],
      descriptors: [
         new Descriptor({
           uuid: '2901',
           value: 'Status Message'
         })
      ]      
    });

    unlockCharacteristic.on('status', this.onUnlockStatusChange.bind(this));
  }
  
  onUnlockStatusChange(status) {
    if (this.updateValueCallback) {
      this.updateValueCallback(new Buffer(status));
    }
  }
  
}


const unlockCharacteristic = new UnlockCharacteristic();
const statusCharacteristic = new StatusCharacteristic(unlockCharacteristic);

const bikeService = new PrimaryService({
  uuid: 'd270',
  characteristics: [
    unlockCharacteristic, 
    statusCharacteristic
  ]
});

bleno.on('stateChange', function(state) {
  console.log('on -> stateChange: ' + state);

  if (state === 'poweredOn') {
    bleno.startAdvertising('RPi Lock', [bikeService.uuid]);
  } else {
    bleno.stopAdvertising();
  }
});

bleno.on('advertisingStart', function(error) {
  console.log('on -> advertisingStart: ' + (error ? 'error ' + error : 'success'));

  if (!error) {
    bleno.setServices([bikeService]);
  }
});


// cleanup GPIO on exit
function exit() {
  process.exit();
}
process.on('SIGINT', exit);