const deviceFunctions={
    checkBluetooth: function(){
        ble.isEnabled("",
                      function(){
            deviceFunctions.showButton()
            deviceWaiting.waitingForBluetooth()
        })
    },
    stringToArrayBuffer:function(str) {
        let ret = new Uint8Array(str.length)
        for (let i = 0; i < str.length; i++) {
            ret[i] = str.charCodeAt(i)
        }
        return ret.buffer
    },
    showDebug:function(text) {
        $("#debug").text(text)
    },
    showCurrentState:function(text) {
        $("#currentState").text(text)
    },

    bytesToString:function(buffer) {
        return String.fromCharCode.apply(null, new Uint8Array(buffer))
    },
    showButton:function(){
        $("#bluetoothScreen").show()
        $("#toggleScreen").hide() 
        $("#statsScreen").hide()
        $("#acelScreen").hide()
        $("#speechScreen").hide()
        $("#lightScreen").hide()
    },
    showToggle:function(){
        $("#bluetoothScreen").hide()
        $("#toggleServer").val("off").slider("refresh")
        $("#toggleScreen").show()
        $("#statsScreen").hide()
        $("#acelScreen").hide()
        $("#speechScreen").hide()
        $("#lightScreen").hide()

    },

    showEverything: function() {
        $("#bluetoothScreen").hide()
        $("#toggleScreen").hide()
        $("#statsScreen").show()
        $("#lightScreen").show()
        $("#speechScreen").show()
        $("#acelScreen").show()

        const lightUuid =  bleIds.get('LIGHT_CH').uuid
        $("#lightToggler").change(() => {
            const data = new Uint32Array([0, 1])
            //// data[0] = 0
            // data[1] = ($("#lightToggler").val() == "on" ? 1 : 0)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, data.buffer)
        })

        let targetSpeed="50";
        let message="Hello world";

//        //getLocation:[latitude,longitude,altitude,accuracy,altitudeAccuracy, heading,speed,timestamp]
//        var currentPosition = deviceLocation.getLocation()
//        //getWeather:[description,temp,wind,humidity,visibility,sunrise,sunset]
//        
//        let currentWeather = deviceLocation.getWeather(currentPosition.latitude,currentPosition.longitude)
//        deviceLocation.getMap(currentPosition.latitude,currentPosition.longitude)
//        let watchID=deviceLocation.watchMapPosition()
//        deviceLocation.stopWatchingLocation(watchID)

        //        ble.write(deviceConnecting.connectedPeripheral.id,bleIds.get('SERVICE').uuid,bleIds.get('TEST_CH').uuid,deviceFunctions.stringToArrayBuffer(message));
        //
        //        ble.read(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('TEST_CH').uuid, (valueArrBuf) => {
        //            targetSpeed = deviceFunctions.bytesToString(valueArrBuf)
        //        });
        //ble.notify(app.connectedPeripheral.id, bleIds.get('SERVICE').uuid, bleIds.get('SERVICE').uuid, app.onData);

        let avgspeed=12;
        let distance=12;
        $("#speedCell").text(targetSpeed+" km/h")
        $("#avgspeedCell").text(avgspeed+" km/h")
        $("#distanceCell").text(distance+" km")
        $("#speedLabel").text("Speed")
        $("#avgspeedLabel").text("Avg speed")
        $("#distanceLabel").text("Distance")



        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(targetSpeed, canvasId, doAnimation);




    }
}


