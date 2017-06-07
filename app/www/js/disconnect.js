const deviceDisconnecting={

    disconnect: function (e) {
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
        isConnected=false
        deviceFunctions.showButton()
        deviceFunctions.showCurrentState("Disconnected ")
        deviceWaiting.waitingForBluetooth()
    }
}