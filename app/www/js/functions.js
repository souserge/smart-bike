function waitToEnable2(){
    ble.isEnabled(
        function() {
            app.scan();
        },
        function() {
            waitToEnable();
            showCurrentState("Please, enable Bluetooth")
        }
    );
}
function stringToArrayBuffer(str) {
    // assuming 8 bit bytes
    let ret = new Uint8Array(str.length);
    for (let i = 0; i < str.length; i++) {
        ret[i] = str.charCodeAt(i);
    }
    return ret.buffer;
}

function waitToEnable1(){
    ble.isEnabled(
        function() {
            app.enableBluetooth();
        },
        function() {
            showCurrentState("Please, enable Bluetooth")
            waitToEnable1();
        }
    );
}

function showDebug(text) {
    $("#debug").text(text)
}
function showCurrentState(text) {
    $("#currentState").text(text)
}

function bytesToString(buffer) {
    return String.fromCharCode.apply(null, new Uint8Array(buffer));
}

