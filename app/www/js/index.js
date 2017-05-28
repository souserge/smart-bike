
let app = {
    initialize: function() {
        deviceWaiting.bindEvents()
        deviceFunctions.showButton()
    },   
}
const isConnected=false
try {
    app.initialize()

} catch(e) {
    alert("Error: " + e);
}
