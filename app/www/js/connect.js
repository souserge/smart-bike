const deviceConnecting={
    scan: function(e) {
        ble.isEnabled(
            function() {
                deviceFunctions.showCurrentState("Scanning...")
                ble.startScan([bleIds.get('SERVICE').uuid], deviceConnecting.onDeviceDiscovered);
                setTimeout(ble.stopScan, 5000, deviceConnecting.onScanComplete);//stop scan after 5 seconds
            },
            function() {
                ble.enable();
            }
        );
    },

    onDeviceDiscovered: function(device) {
        deviceFunctions.showCurrentState("Device discovered")
        let rssi
        if (device.rssi) {
            deviceFunctions.showCurrentState("Requesting connection")
            ble.connect(device.id, deviceConnecting.onConnect, deviceDisconnecting.onDisconnect);
        }
        else{
            deviceFunctions.showCurrentState("No signal received")
        }
    },

    onScanComplete: function() {
        let state=$("#currentState").text()
        if (state.substring(0,3)=="Sca"){
            deviceFunctions.showCurrentState("Device not discovered")
        }
    },

    onConnect: function(peripheral) {
        isConnected=true
        deviceFunctions.showCurrentState("Connected")
        deviceConnecting.connectedPeripheral = peripheral;
        let targetSpeed="";
        let message="Hello world";
        let currentPosition = deviceLocation.getLocation()
        let currentWeather = deviceLocation.getWeather(currentPosition['latitude'],currentPosition['longitude'])

        


        ble.write(deviceConnecting.connectedPeripheral.id,bleIds.get('SERVICE').uuid,bleIds.get('TEST_CH').uuid,deviceFunctions.stringToArrayBuffer(message));

        ble.read(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('TEST_CH').uuid, (valueArrBuf) => {
            targetSpeed = deviceFunctions.bytesToString(valueArrBuf)
            deviceFunctions.showStats(targetSpeed)
        })

        //ble.notify(app.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('SERVICE').uuid, app.onData);

    }


}