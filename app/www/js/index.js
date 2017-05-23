var SERVICE_UUID = 'D270';
var UNLOCK_UUID = 'D271';
var MESSAGE_UUID = 'D272';

function stringToArrayBuffer(str) {
    // assuming 8 bit bytes
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
        console.log(ret[i]);
    }
    return ret.buffer;
}

function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

var app = {
    initialize: function() {
        statsScreen.hidden = true;
        hideScreen.hidden = true;
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        bluetoothButton.ontouchstart = app.scan;
    },
    scan: function(e) {
        ble.startScan([SERVICE_UUID],
            app.onDeviceDiscovered,
            function() { alert("Listing Bluetooth Device Failed"); }
        );

        // stop scan after 5 seconds
        setTimeout(ble.stopScan, 5000, app.onScanComplete);

    },
    onDeviceDiscovered: function(device) {
        var deviceName, rssi;
        var device = e.target.dataset.deviceId;
        console.log(JSON.stringify(device));

        if (device.rssi) {  //Add the condition to connect to the bluetooth server
            ble.connect(device, app.onConnect, app.onDisconnect);
        }
  
    },
    onScanComplete: function() {       
        var device = e.target.dataset.deviceId;

        if (device) {
            app.showstats();
        }
        else{
            app.setStatus("Device not discovered.");
        }
    },

    onConnect: function(peripheral) {
        app.connectedPeripheral = peripheral;
        ble.notify(peripheral.id, SERVICE_UUID, MESSAGE_UUID, app.onData);
        app.setStatus("Connected to the device.");
    },
    onDisconnect: function(reason) {
        if (!reason) {
            reason = "Connection Lost";
        }
        app.hideProgressIndicator();
        app.showDeviceListScreen();
        app.setStatus(reason);
    },
    disconnect: function (e) {
        if (e) {
            e.preventDefault();
        }

        app.setStatus("Disconnecting...");
        ble.disconnect(app.connectedPeripheral.id, function() {
            app.setStatus("Disconnected");
            setTimeout(app.scan, 800);
        });
    },
    onData: function(buffer) {
        var message = bytesToString(buffer);
        app.setStatus(message);
    },

    showStats: function() {
        statsScreen.hidden = false;
    },
    setStatus: function(message){
        console.log(message);
        statusDiv.innerHTML = message;
    }
};

app.initialize();
