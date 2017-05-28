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
        $("#light").hide()
    },
    showToggle:function(){
        $("#bluetoothScreen").hide()
        $("#toggleServer").val("off").slider("refresh")
        $("#toggleScreen").show()
        $("#statsScreen").hide()
        $("#light").hide()

    },
    showStats: function(speed) {
        $("#bluetoothScreen").hide()
        $("#toggleScreen").hide()
        $("#statsScreen").show()
        $("#light").show()

        const lightUuid =  bleIds.get('LIGHT_CH').uuid
        $("#lightToggler").change(() => {

            const data = new Uint32Array([0, 1])
            //// data[0] = 0
            // data[1] = ($("#lightToggler").val() == "on" ? 1 : 0)
            ble.write(deviceConnecting.connectedPeripheral.id, bleIds.get('SERVICE').uuid, lightUuid, data.buffer)
        })
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
    

}

