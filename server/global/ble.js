const bleIds = new Map()

class BleId {
  constructor(name, uuid) {
    this.name = name
    this.uuid = uuid
  }
}

(() => {
  bleIds.set('PI', new BleId('Supaa Bike', '12AB'))
  bleIds.set('SERVICE', new BleId('Bike Service', 'D270'))
  bleIds.set('TEST_CH', new BleId('Test Characteristic', 'D271'))
  bleIds.set('LIGHT_CH', new BleId('Light Characteristic', 'D272'))
  bleIds.set('ANTI_THEFT_CH', new BleId('Anti-Theft Characteristic', 'D273'))
})()

module.exports = {
  bleIds
}

