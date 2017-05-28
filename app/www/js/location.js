const deviceLocation{

    getLocation:function() {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                return{
                    "latitude":position.coords.latitude,
                    "longitude":position.coords.longitude ,
                    "altitude":position.coords.altitude,
                    "accuracy":position.coords.accuracy,
                    "altitude accuracy":position.coords.altitudeAccuracy,
                    "heading":position.coords.heading,
                    "speed":position.coords.speed,
                    "timestamp":position.timestamp
                }
            },

            function onError(error) {
                deviceFunctions.showCurrentState("Location error")
            },
            {enableHighAccuracy: true}
        )
    },

        getWeather:function(latitude, longitude){

            var queryString =
                'http://api.openweathermap.org/data/2.5/weather?lat='+ latitude + '&lon=' + longitude + '&appid=' + weatherKey + '&units=imperial';

            $.getJSON(queryString, function (results) {
                if (results.weather.length) {
                    $.getJSON(queryString, function (results) {
                        if (results.weather.length) {
                            let sunriseDate = new Date(results.sys.sunrise)
                            let sunsetDate = new Date(results.sys.sunset)
                            return{

                                "description":results.name,
                                "temp":results.main.temp,
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
                deficeFunctions.showCurrentState("Weather error")
            });
        },
            // Get geo coordinates

            getMapLocation:function() {

                navigator.geolocation.getCurrentPosition
                (onMapSuccess, onMapError, { enableHighAccuracy: true });
            },

                // Success callback for get geo coordinates

                var onMapSuccess = function (position) {

                    Latitude = position.coords.latitude;
                    Longitude = position.coords.longitude;

                    getMap(Latitude, Longitude);

                }

                // Get map by using coordinates

                function getMap(latitude, longitude) {

                    var mapOptions = {
                        center: new google.maps.LatLng(0, 0),
                        zoom: 1,
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    };

                    map = new google.maps.Map
                    (document.getElementById("map"), mapOptions);


                    var latLong = new google.maps.LatLng(latitude, longitude);

                    var marker = new google.maps.Marker({
                        position: latLong
                    });

                    marker.setMap(map);
                    map.setZoom(15);
                    map.setCenter(marker.getPosition());
                },

                    // Success callback for watching your changing position

                    var onMapWatchSuccess = function (position) {

                        var updatedLatitude = position.coords.latitude;
                        var updatedLongitude = position.coords.longitude;

                        if (updatedLatitude != Latitude && updatedLongitude != Longitude) {

                            Latitude = updatedLatitude;
                            Longitude = updatedLongitude;

                            getMap(updatedLatitude, updatedLongitude);
                        }
                    }

                    // Error callback

                    function onMapError(error) {
                        console.log('code: ' + error.code + '\n' +
                                    'message: ' + error.message + '\n');
                    }

    // Watch your changing position

    function watchMapPosition() {

        return navigator.geolocation.watchPosition
        (onMapWatchSuccess, onMapError, { enableHighAccuracy: true });
    }
}