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
            //alert(device.id)
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
       // alert("connected")
        deviceFunctions.showCurrentState("Connected")
        deviceConnecting.connectedPeripheral = peripheral;
        deviceFunctions.showEverything()
        
    }

}