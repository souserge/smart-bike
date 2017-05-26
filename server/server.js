const bleno = require('bleno')

const PI_NAME = 'SmartBike'

function stringToArrayBuffer(str) {
    // assuming 8 bit bytes
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
}

function bytesToString(buffer) {
  return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

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
class LightCharacteristic extends Characteristic {
  constructor() {
    super({
      uuid: 'd271',
      properties: [ 'read', 'write'],
      descriptors: [
         new Descriptor({
           uuid: '2901',
           value: 'Light'
         })
      ]
    }) 
  }
  
  onWriteRequest(data, offset, withoutResponse, callback) {
    console.log('Write request: Light')
    console.log('Data sent: ' + data)
    callback(this.RESULT_SUCCESS)
  }

  onReadRequest(offset, callback) {
    console.log('Read request: Light')
    const result = Characteristic.RESULT_SUCCESS
    const data = Buffer.from("42.42", 'utf8');
    
    console.log(data.toString('utf8'))
    callback(result, data);
  } 
}

const lightCharacteristic = new LightCharacteristic();

const bikeService = new PrimaryService({
  uuid: 'd270',
  characteristics: [
    lightCharacteristic
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