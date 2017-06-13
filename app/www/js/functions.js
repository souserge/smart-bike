
const deviceFunctions={
    toggleLocation:function() {
        var x = document.getElementById('locationInfo');
        if (x.style.display === 'none') {
            x.style.display = 'block';
            deviceLocation.getMap();
        } else {
            x.style.display = 'none';
        }
    },

    toggleWeather:function() {
        var y = document.getElementById('weatherInfo');
        if (y.style.display === 'none') {
            y.style.display = 'block';
            deviceLocation.getWeather();
        } else {
            y.style.display = 'none';
        }


    },
    getDistance:function(lat1, lon1, lat2, lon2) {
        var R = 6371; // Radius of the earth in km
        var dLat = (lat2 - lat1) * Math.PI / 180;  // deg2rad below
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var a = 
            0.5 - Math.cos(dLat)/2 + 
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
            (1 - Math.cos(dLon))/2;

        return R * 2 * Math.asin(Math.sqrt(a));
    },
    updateDistance:function(newDistance) {
        let string=$("#distanceCell").text()
        let distance=Number(string.substr(0,string.length-3))
        let totalDistance=distance+newDistance
        $("#distanceCell").text(totalDistance.toFixed(3)+" km")
    },
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
    //    showDebug:function(text) {
    //        $("#debug").text(text)
    //    },
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
        $("#lightScreen").hide()
        $("#autoScreen").hide()
        $("#locationScreen").hide()
        $("#locationInfo").hide()
        $("#weatherScreen").hide()
        $("#weatherInfo").hide()
        $("#alarmScreen").hide()
        $("#startButton").hide()

    },
    showToggle:function(){
        $("#bluetoothScreen").hide()
        $("#toggleServer").val("off").slider("refresh")
        $("#toggleScreen").show()
        $("#statsScreen").hide()
        $("#acelScreen").hide()
        $("#lightScreen").hide()
        $("#autoScreen").hide()
        $("#locationScreen").hide()
        $("#locationInfo").hide()
        $("#weatherScreen").hide()
        $("#weatherInfo").hide()
        $("#alarmScreen").hide()
        $("#startButton").hide()
    },


    startRide: function() {
        $("#bluetoothScreen").hide()
        $("#statsScreen").show()
        $("#lightScreen").show()
        $("#autoScreen").show()
        $("#acelScreen").show()
        $("#locationScreen").show()
        $("#locationInfo").hide()
        $("#weatherScreen").show()
        $("#weatherInfo").hide()
        $("#startButton").show()
        $("#alarmScreen").show()


        const lightUuid =  bleIds.get('LIGHT_CH').uuid
        let data = "00"
        $("#lightToggler").change(() => {


            const val = ($("#lightToggler").val() == "on" ? "1" : "0")
            data=strReplaceAt(1,data,val)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, deviceFunctions.stringToArrayBuffer(data))



        })
        $("#autoToggler").change(() => {

            const val = ($("#autoToggler").val() == "on" ? "1" : "0")
            data = strReplaceAt(0,data,val)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, deviceFunctions.stringToArrayBuffer(data))

        })



        let dataThief = "0"
        const thiefUuid =  bleIds.get('ANTI_THEFT_CH').uuid

        $("#alarmToggler").change(() => {
            const val = ($("#alarmToggler").val() == "on" ? "1" : "0")
            dataThief = strReplaceAt(0,data,val)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, thiefUuid, deviceFunctions.stringToArrayBuffer(dataThief)) 
        })



        let targetSpeed="24.5";

        let message="Hello world";


        $("#distanceCell").text(0+" km")
        //deviceLocation.getLocation()
        //deviceLocation.getWeather()
        //deviceLocation.getMap()
        //let watchID=deviceLocation.watchPosition()


        //$("#speedCell").text(targetSpeed+" km/h")
        //$("#avgspeedCell").text(avgspeed+" km/h")

        $("#speedLabel").text("Speed")
        $("#avgspeedLabel").text("Avg speed")
        $("#distanceLabel").text("Distance")
        $("#timeLabel").text("Time")

        $("#startButton").text("Stop ride")
        startButton.ontouchstart=deviceFunctions.stopRide


    },

    stopRide:function(){
        $("#bluetoothScreen").hide()
        $("#statsScreen").hide()
        $("#lightScreen").hide()
        $("#autoScreen").hide()
        $("#acelScreen").hide()
        $("#locationScreen").hide()
        $("#locationInfo").hide()
        $("#weatherScreen").hide()
        $("#weatherInfo").hide()
        $("#alarmScreen").hide()

        locationTimer.stop()
        rideTimer.stop()
        

        $("#startButton").text("Start ride")
        $("#startButton").show()
        startButton.ontouchstart=deviceFunctions.resetData
    },

    resetData:function(){
        $("#speedCell").text(0)
        const time = miliToTime(0)
        $("#timeCell").text(time)
        let startDate = new Date()
        rideTimer.bind(1000, () => {
            const mili = Math.abs(new Date() - startDate)
            const time = miliToTime(mili)
            $("#timeCell").text(time)
            //        let speed = $("#speedCell").text((currentDistance-previousDistance)/mili)

        })
        rideTimer.start()
        
        deviceLocation._prevTime = startDate
        locationTimer.start()
        locationTimer.bind(1000, () => {

        let speed=(Math.abs((deviceSpeed._distance-deviceSpeed._prevDistance)/(deviceSpeed._time-deviceSpeed._prevTime)) * 3600000 ).toFixed(2)
        $("#speedCell").text(speed)

        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(speed, canvasId, doAnimation);
        
        
    })
        deviceFunctions.startRide()
    }
}

