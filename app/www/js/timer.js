
                let miliToTime = (mili) => {
                    const second = Math.floor( (mili / 1000)  % 60 ),
                          minute = Math.floor( (mili / 60000) % 60 ),
                          hour   = Math.floor( (mili / 3600000)    )
                    return (hour < 10 ? "0" : "") + hour + ":"
                        + (minute < 10 ? "0" : "") + minute + ":"
                        + (second < 10 ? "0" : "") + second
                }
                let startDate = new Date()
                let rideTimer = new Timer()
                rideTimer.bind(1000, () => {
                    const mili = Math.abs(new Date - startDate)
                    const time = miliToTime(mili)
                    $("#timeCell").text(time)
                    //        let speed = $("#speedCell").text((currentDistance-previousDistance)/mili)

                })
                rideTimer.start()
                deviceLocation._prevTime = startDate
            