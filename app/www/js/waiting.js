const deviceWaiting = {
    bindEvents: function() {
        document.addEventListener('deviceready', deviceWaiting.waitingForBluetooth, false)
    },
    waitingForBluetooth: function() {
        ble.isEnabled(deviceWaiting.onDeviceReady)

        deviceFunctions.showCurrentState("Please, enable Bluetooth")
        bluetoothButton.ontouchstart=deviceWaiting.onDeviceReady
    },
    onDeviceReady: function() {
        ble.isEnabled(
            function() {
                bluetoothButton.ontouchstart =""
                deviceFunctions.showToggle()
                deviceWaiting.onDeviceWaiting()
            },
            function() {
                bluetoothButton.ontouchstart = ble.enable(deviceWaiting.onDeviceReady,deviceWaiting.waitingForBluetooth)
            }
        );
    },

    onDeviceWaiting: function(){
        deviceFunctions.showCurrentState("Tap to connect")
        $("#toggleServer").change(function() {
            deviceFunctions.checkBluetooth()
            state = $("#toggleServer").val()
            if(state.toString()=="off"){
                if(isConnected==true)
                    deviceDisconnecting.disconnect()
                else{
                    ble.stopScan()
                    deviceFunctions.showCurrentState("Tap to connect")
                }
            }
            else if(state.toString()=="on")
                deviceConnecting.scan()
        }

                                 )
    }
}