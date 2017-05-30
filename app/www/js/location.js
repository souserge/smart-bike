

const deviceLocation={
    
    getLocation:function(){
        
        navigator.geolocation.getCurrentPosition(
             deviceLocation.onLocation,

            function onError(error) {
            
                deviceFunctions.showCurrentState("Location error")
                return 0
                
            },
            {enableHighAccuracy: true}
        )

    },
    onLocation:function(position){
                
        let locationInfo={
                    "latitude":position.coords.latitude,
                    "longitude":position.coords.longitude ,
                    "altitude":position.coords.altitude,//null
                    "accuracy":position.coords.accuracy,
                    "altitudeAccuracy":position.coords.altitudeAccuracy,//null
                    "heading":position.coords.heading,//null
                    "speed":position.coords.speed,//null
                    "timestamp":position.timestamp
        }
        let weatherKey="aa928f2867a6ea5b7bd2e4a51dcb7146"
        let queryString =
            'http://api.openweathermap.org/data/2.5/weather?lat='+ locationInfo.latitude + '&lon=' + locationInfo.longitude + '&appid=' + weatherKey + '&units=imperial' //implement protection of max 60 time/minute
        
        $.getJSON(queryString, function (results) {
            
            if (results.weather.length) {
                $.getJSON(queryString, function (results) {
                    
                    if (results.weather.length) {
                       
                        let sunriseDate = new Date(results.sys.sunrise)
                        let sunsetDate = new Date(results.sys.sunset)
                        let weatherInfo={
                            "description":results.name,
                            "temp":Math.round((results.main.temp-32)/1.8),//F a ºC
                            "wind":results.wind.speed,
                            "humidity":results.main.humidity,
                            "visibility":results.weather[0].main,
                            "sunrise":sunriseDate.toLocaleTimeString(),
                            "sunset":sunsetDate.toLocaleTimeString()
                        }
                        
                    }
                });
              
            }
        }).fail(function () {
            deviceFunctions.showCurrentState('code: ' + error.code + ',' +
                                             'message: ' + error.message)
        });   
         
        let mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map
        (document.getElementById("map-canvas"), mapOptions);


        let latLong = new google.maps.LatLng(locationInfo.latitude, locationInfo.longitude);

        let marker = new google.maps.Marker({
            position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    },

    getWeather:function(latitude, longitude){

        let queryString =
            'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=' + weatherKey + '&units=imperial';

        $.getJSON(queryString, function (results) {
            if (results.weather.length) {
                $.getJSON(queryString, function (results) {
                    if (results.weather.length) {
                        let sunriseDate = new Date(results.sys.sunrise)
                        let sunsetDate = new Date(results.sys.sunset)
                        let weatherInfo={
                            "description":results.name,
                            "temp":results.main.temp,
                            "wind":results.wind.speed,
                            "humidity":results.main.humidity,
                            "visibility":results.weather[0].main,
                            "sunrise":sunriseDate.toLocaleTimeString(),
                            "sunset":sunsetDate.toLocaleTimeString()
                        }
                        getMap(latitude,longitude)
                    }
                });
            }
        }).fail(function () {
            deviceFunctions.showCurrentState('code: ' + error.code + ',' +
                                             'message: ' + error.message)
        });
    },

    getMap:function(latitude, longitude){

        let mapOptions = {
            center: new google.maps.LatLng(0, 0),
            zoom: 1,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };

        map = new google.maps.Map
        (document.getElementById("mapScreen"), mapOptions);


        let latLong = new google.maps.LatLng(latitude, longitude);

        let marker = new google.maps.Marker({
            position: latLong
        });

        marker.setMap(map);
        map.setZoom(15);
        map.setCenter(marker.getPosition());
    },



    watchMapPosition:function(){

        return navigator.geolocation.watchPosition
        (
            function(){let updatedLatitude = position.coords.latitude;
                       let updatedLongitude = position.coords.longitude;

                       if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

                           Latitude = updatedLatitude;
                           Longitude = updatedLongitude;

                           getMap(updatedLatitude, updatedLongitude);
                       }}, function(){deviceFunctions.showCurrentState('code: ' + error.code + ',' +
                                                                       'message: ' + error.message)}, { enableHighAccuracy: true,timeout: 30000 });
    },

    stopWatchingLocation:function(watchID){
        navigator.geolocation.clearWatch(watchID);

    }


}