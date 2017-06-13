
    const deviceSpeed={
        getLocation:function(){
            let locationOptions = {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 3600000
            }
            navigator.geolocation.watchPosition(
                function (position) {
                    deviceSpeed.onLocation(position)
                },
                function (error) {
                    alert("err")
                },
                locationOptions
            )
        },
        onLocation:function(position){

            let updatedLatitude = position.coords.latitude;
            let updatedLongitude = position.coords.longitude;
            if (this._long && this._lat){
                let distance=deviceFunctions.getDistance(this._lat,this._long,updatedLatitude,updatedLongitude)
                this._prevDistance = this._distance
                this._prevTime = this._time
                deviceFunctions.updateDistance(distance)
                this._distance = distance
                this._time = new Date()

//                $("#latitudeCell").text(updatedLatitude)
//                $("#longitudeCell").text(updatedLongitude)
                
                
                
                
            }
            this._lat = updatedLatitude
            this._long = updatedLongitude
        },
        _long: null,
        _lat: null,
        _distance: 0,
        _prevDistance: 0,
        _time: new Date(),
        _prevTime: new Date()
    }


    let locationTimer = new Timer()
    locationTimer.bind(1000, () => {

        let speed=(Math.abs((deviceSpeed._distance-deviceSpeed._prevDistance)/(deviceSpeed._time-deviceSpeed._prevTime)) * 3600000 ).toFixed(2)
        $("#speedCell").text(speed)

        let canvasId="canvasId";
        let doAnimation=false;
        drawSpeedometer(speed, canvasId, doAnimation);
        
        
    })
    deviceSpeed.getLocation()
    locationTimer.start()
    deviceSpeed._time = new Date()
