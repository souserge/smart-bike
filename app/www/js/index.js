var SERVICE_UUID = 'D270';
var UNLOCK_UUID = 'D271';
var MESSAGE_UUID = 'D272';
function getRandomNumber(){
    
    return "a";
}

function stringToArrayBuffer(str) {
    // assuming 8 bit bytes
    var ret = new Uint8Array(str.length);
    for (var i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
        console.log(ret[i]);
    }
    return ret.buffer;
}
var Counter=5;
function startCountdown(){
    if((Counter - 1) > -1){
        Counter = Counter - 1;
        setTimeout('startCountdown()',1000);
        if(Counter>=1)
            bluetoothState.append(" "+Counter);
    }
}
function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

var app = {
    initialize: function() {
        statsScreen.hidden = true;//Only show it when connected
        this.bindEvents();
        hideScreen.hidden = true;//Just to hide the initial transition
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },

    onDeviceReady: function() {//add here all the buttons
        bluetoothButton.ontouchstart = app.scan;
    },

    scan: function(e) {
        bluetoothButton.ontouchstart = "";//prevent from touching it again

        Counter=5;
        startCountdown();

        bluetoothState.innerHTML="Scanning...";
        ble.startScan([SERVICE_UUID],
                      app.onDeviceDiscovered,
                      function() {bluetoothState.innerHTML="Device not found";}
                     );
        setTimeout(ble.stopScan, 5000, app.onScanComplete);//stop scan after 5 seconds
    },

    onDeviceDiscovered: function(device) {
        console.log(JSON.stringify(device));
        if (device.rssi) {  //Add the condition to connect to the bluetooth server
            app.connect();//try to connect if it's detected
        }
    },

    onScanComplete: function() {
        bluetoothButton.ontouchstart = app.scan;
        app.showStats(); //JUST FOR DEBUGGING!!
        bluetoothState.innerHTML="Device not discovered";
    },

    connect: function (e) {
        var device = e.target.dataset.deviceId;
        bluetoothState.innerHTML="Requesting connection";
        ble.connect(device, app.onConnect, app.onDisconnect);
    },

    onConnect: function(peripheral) {
        bluetoothState.innerHTML="Connected";
        app.showStats();
        app.connectedPeripheral = peripheral;
        ble.notify(peripheral.id, SERVICE_UUID, MESSAGE_UUID, app.onData);
        bluetoothScreen.hidden=true;
    },

    onDisconnect: function(reason) {
        if (!reason) {
            reason = "Connection Lost";
        }
        bluetoothScreen.hidden=false;
        statsScreen.hidden=true;
        bluetoothState.innerHTML=reason;
    },

    disconnect: function (e) {
        if (e) {
            e.preventDefault();
        }

        bluetoothState.innerHTML="Disconnecting...";
        ble.disconnect(app.connectedPeripheral.id, function() {
            bluetoothState.innerHTML="Disconnected";
            setTimeout(app.scan, 800);
        });
    },

    onData: function(buffer) {
        var message = bytesToString(buffer);
        bluetoothState.innerHTML=message;
    },

    showStats: function() {
        statsScreen.hidden = false;
        //        speedNumber=parseFloat(Math.round(Math.random() * 10000) / 100).toFixed(2);
        //        avgspeedNumber=parseFloat(Math.round(Math.random() * 10000) / 100).toFixed(2);
        //        distanceNumber=parseFloat(Math.round(Math.random() * 10000) / 100).toFixed(2);
        //        speedCell.innerHTML=speedNumber+" km/h";
        //        avgspeedCell.innerHTML=avgspeedNumber+" km/h";
        //        distanceCell.innerHTML=distanceNumber+" km";
    }
};

app.initialize();
