const deviceScanning={

    scan: function(e) {
        
        ble.isEnabled(
            function() {
                deviceFunctions.showDebug("Scanning, bluetooth enabled")
                deviceFunctions.showCurrentState("Scanning...")
                ble.startScan(bleIds.get('SERVICE').uuid,
                              deviceScanning.onDeviceDiscovered,
                              function() { $("#bluetoothScreen").hide()
                                         }
                             )
                setTimeout(ble.stopScan, 5000, deviceScanning.onScanComplete)
            },
            function() {
                ble.enable();
                deviceFunctions.waitToEnable2();
            }
        );
    },

    onDeviceDiscovered: function(device) {
        let listItem, rssi
        deviceFunctions.showCurrentState("Device discovered")
        listItem.dataset.deviceId = device.id
        if (device.rssi) {
            deviceFunctions.showCurrentState("Requesting connection")
            deviceFunctions.showDebug("Discovered")
            ble.connect(device.id, deviceConnecting.onConnect, deviceDisconnecting.onDisconnect);
        }
        else{
            deviceFunctions.showCurrentState("No signal received")
        }
    },

    onScanComplete: function() {
        let state=$("#currentState").text()
        if (state.substring(0,3)=="Sca"){
            showCurrentState("Device not discovered")
        }
    },
}