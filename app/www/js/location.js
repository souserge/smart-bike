const deviceLocation={

    getLocation:function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
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
                deviceLocation.getWeather(locationInfo.latitude,locationInfo.longitude)
            },

            function onError(error) {
                deviceFunctions.showCurrentState("Location error")
            },
            {enableHighAccuracy: true}
        )
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