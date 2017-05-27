//bleIds:Map
//bleIds.get('LIGHT_CH').uuid
//SERVICE
//TEST
const SERVICE_UUID = 'D270';
const MESSAGE_UUID = 'D271';


let app = {
    initialize: function() {
        this.bindEvents();
    },

    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.forms[0].addEventListener('submit', this.submit, false);
        document.addEventListener('pause', app.disconnect(), false);
    },

    onDeviceReady: function() {//add here all the buttons 
        ble.isEnabled(
            function() {
                app.enableBluetooth();
            },
            function() {
                showCurrentState("Please enable Bluetooth")
                bluetoothButton.ontouchstart = app.enableBluetooth;
            }
        );
    },
    enableBluetooth: function(){
        ble.isEnabled(
            function() {
                bluetoothButton.ontouchstart ="";
                 keepgoing=true
                $("#bluetoothScreen").hide();
                $("#toggleScreen").show();    
                $('select').slider();
                app.onDeviceWaiting();
            },
            function() {
                ble.enable();
                waitToEnable1();
            }
        ); 
    },
    onDeviceWaiting: function(){
        showCurrentState("Tap to connect")
        $("#toggleServer").change(function() {
            ble.isEnabled(
                function() {
                    state = $("#toggleServer").val();
                    if(state.toString()=="off")
                        app.disconnect()
                    else if(state.toString()=="on")
                        app.scan()
                },
                function() {
                    $("#toggleScreen").hide();
                    $("#bluetoothScreen").show();
                    app.onDeviceReady();
                }
            );

        });
    },
    scan: function(e) {
        ble.isEnabled(
            function() {
                showCurrentState("Scanning...")
                ble.startScan([SERVICE_UUID],app.onDeviceDiscovered,function() { $("#bluetoothScreen").hide()});
                setTimeout(ble.stopScan, 5000, app.onScanComplete);//stop scan after 5 seconds
            },
            function() {
                ble.enable();
                waitToEnable2();
            }
        );
    },

    onDeviceDiscovered: function(device) {
        showCurrentState("Device discovered")
        let listItem, rssi;
        console.log(JSON.stringify(device));
        listItem = document.createElement('li');
        listItem.dataset.deviceId = device.id;
        if (device.rssi) {
            showCurrentState("Requesting connection")
            ble.connect(device.id, app.onConnect, app.onDisconnect);
        }
        else{
            showCurrentState("No signal received")
        }
    },

    onScanComplete: function() {
        let state=$("#currentState").text()
        if (state.substring(0,3)=="Sca"){
            showCurrentState("Device not discovered")
            //$("#toggleServer").val("off");
        }
    },



    onConnect: function(peripheral) {
        showCurrentState("Connected")
        $("#bluetoothScreen").hide()
        app.connectedPeripheral = peripheral;
        let targetSpeed="";
        let message="Hello world";
        navigator.geolocation.getCurrentPosition(
            function(position) {
                alert('Latitude: '          + position.coords.latitude          + '\n' +
                      'Longitude: '         + position.coords.longitude         + '\n' +
                      'Altitude: '          + position.coords.altitude          + '\n' +
                      'Accuracy: '          + position.coords.accuracy          + '\n' +
                      'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
                      'Heading: '           + position.coords.heading           + '\n' +
                      'Speed: '             + position.coords.speed             + '\n' +
                      'Timestamp: '         + position.timestamp                + '\n');
            },

            function onError(error) {
                alert('code: '    + error.code    + '\n' +
                      'message: ' + error.message + '\n');
            },
            {enableHighAccuracy: true});
        ble.write(app.connectedPeripheral.id,SERVICE_UUID,MESSAGE_UUID,stringToArrayBuffer(message));
        ble.read(app.connectedPeripheral.id, SERVICE_UUID, MESSAGE_UUID, (valueArrBuf) => {
            targetSpeed = bytesToString(valueArrBuf)
            app.showStats(targetSpeed)
        })

        //ble.notify(app.connectedPeripheral.id, SERVICE_UUID, MESSAGE_UUID, app.onData);

    },

    onDisconnect: function(reason) {
        $("#bluetoothScreen").show()
        $("#toggleScreen").hide()
        $("#statsScreen").hide()
        showCurrentState("Disconnected ")
        app.onDeviceReady()
    },

    disconnect: function (e) {
        if (e) {
            e.preventDefault();
        }
        showCurrentState("Disconnecting")
        ble.disconnect(app.connectedPeripheral,
                           function() {
                            setTimeout(app.onDisconnect(), 800)
        }
                      )
        
    },

    onData: function(buffer) {
        let message = bytesToString(buffer);
        app.setStatus(message);

    },
    submit: function(e) {
        let code = e.target.code.value;
        e.preventDefault(); // don't submit the form

        if (code === "") { return; } // don't send empty data
        app.showProgressIndicator();

        function success() {
            e.target.code.value = ""; //  clear the input
        }

        function failure (reason) {
            alert("Error sending code " + reason);
        }

        ble.write(app.connectedPeripheral.id,SERVICE_UUID,UNLOCK_UUID,stringToArrayBuffer(code),success, failure);

    },

    showStats: function(speed) {
        $("#statsScreen").show()
        let avgspeed=12;
        let distance=12;
        $("#speedCell").text(speed+" km/h")
        $("#avgspeedCell").text(avgspeed+" km/h")
        $("#distanceCell").text(distance+" km")
        $("#speedLabel").text("Speed")
        $("#avgspeedLabel").text("Avg speed")
        $("#distanceLabel").text("Distance")

        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(speed, canvasId, doAnimation);

    }
};

app.initialize();
