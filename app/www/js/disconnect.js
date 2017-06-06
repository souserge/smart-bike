const deviceDisconnecting={

    disconnect: function (e) {
        alert("disconnect")
        if (e) {
            e.preventDefault();
        }
        deviceFunctions.showCurrentState("Disconnecting")
        ble.disconnect(deviceConnecting.connectedPeripheral.id,
                       function() {
            setTimeout(deviceDisconnecting.onDisconnect, 800)
        }
                      )

    },
    onDisconnect: function() {
        alert("disconnected")
        isConnected=false
        deviceFunctions.showButton()
        deficeFunctions.showCurrentState("Disconnected ")
        deviceWaiting.waitingForBluetooth()
    }
}