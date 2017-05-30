//bleIds.get("SERVICE").uuid
const bleIds = new Map()
class BleId {
    constructor(name, uuid) {
        this.name = name
        this.uuid = uuid
    }
}

bleIds.set('PI', new BleId('Supaa Bike', '12AB'))
bleIds.set('SERVICE', new BleId('Bike Service', 'D270'))
bleIds.set('TEST_CH', new BleId('Test', 'D271'))
bleIds.set('LIGHT_CH', new BleId('Light', 'D272'))
