
let miliToTime = (mili) => {
    const second = Math.floor( (mili / 1000)  % 60 ),
          minute = Math.floor( (mili / 60000) % 60 ),
          hour   = Math.floor( (mili / 3600000)    )
    return (hour < 10 ? "0" : "") + hour + ":"
        + (minute < 10 ? "0" : "") + minute + ":"
        + (second < 10 ? "0" : "") + second
}
let rideTimer = new Timer()
            