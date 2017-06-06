String.prototype.replaceAt=function(index, replacement) {
    return this.substr(0, index) + replacement+ this.substr(index + replacement.length);}

const deviceFunctions={
    toggleLocation:function() {
        var x = document.getElementById('locationInfo');
        if (x.style.display === 'none') {
            x.style.display = 'block';
        } else {
            x.style.display = 'none';
        }
    },

    toggleWeather:function() {
        var y = document.getElementById('weatherInfo');
        if (y.style.display === 'none') {
            y.style.display = 'block';
        } else {
            y.style.display = 'none';
        }
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
    },


    showEverything: function() {
        $("#bluetoothScreen").hide()
        $("#statsScreen").show()
        $("#lightScreen").show()
        $("#autoScreen").show()
        $("#acelScreen").show()
        $("#locationScreen").show()
        $("#locationInfo").hide()
        $("#weatherScreen").show()
        $("#weatherInfo").hide()
        $("#alarmScreen").show()


        const lightUuid =  bleIds.get('LIGHT_CH').uuid
        let data = "00"
        $("#lightToggler").change(() => {

            try{
                const val = ($("#lightToggler").val() == "on" ? "1" : "0")
                data=strReplaceAt(1,data,val)
                ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, deviceFunctions.stringToArrayBuffer(data))


            }catch(e){alert(e)}
        })
        $("#autoToggler").change(() => {

            const val = ($("#autoToggler").val() == "on" ? "1" : "0")
            data = strReplaceAt(0,data,val)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, deviceFunctions.stringToArrayBuffer(data))

        })

        let targetSpeed="24.5";
        let avgspeed="15";
        let distance="45";
        let message="Hello world";


        deviceLocation.getLocation()
        deviceLocation.getWeather()
        deviceLocation.getMap()
        watchID=deviceLocation.watchPosition()


        $("#speedCell").text(targetSpeed+" km/h")
        $("#avgspeedCell").text(avgspeed+" km/h")
        $("#distanceCell").text(distance+" km")
        $("#speedLabel").text("Speed")
        $("#avgspeedLabel").text("Avg speed")
        $("#distanceLabel").text("Distance")



        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(targetSpeed, canvasId, doAnimation);

    },
    alarmMode: function() {
        alert("THIEF!!!!!!!!!")
    }
}


