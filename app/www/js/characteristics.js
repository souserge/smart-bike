const deviceCharacteristics={
    showStats: function(speed) {
        $("#statsScreen").show()
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

    };
}