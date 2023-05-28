const TIMER = document.getElementById("timer");
const NEXTRESPAWN1 = document.getElementById("nextRespawn1") ;
const NEXTRESPAWN2 = document.getElementById("nextRespawn2") ;
const NEXTRESPAWN3 = document.getElementById("nextRespawn3") ;

setInterval(UpdateStats, 1000)

async function UpdateStats () {
    const chrono = 1800 - (this.getCurrentTime() - this.getStartTime()) / 1000;
    index = RESPAWN.indexOf(getNextRespawn(chrono))
    if(RESPAWN[index] < 49)    {
        TIMER.innerHTML = "0"
        NEXTRESPAWN1.innerHTML = "End"
        return
    }
    TIMER.innerHTML = (chrono - RESPAWN[index])
    if(RESPAWN[index]%60 < 10) pad = "0"
    else pad = ""
    NEXTRESPAWN1.innerHTML = (RESPAWN[index] - RESPAWN[index]%60)/60 + ":" + pad + RESPAWN[index]%60
    if(RESPAWN[index+1] < 49)    {
        NEXTRESPAWN2.innerHTML = "End"
        return
    }
    if(RESPAWN[index+1]%60 < 10) pad = "0"
    else pad = ""
    NEXTRESPAWN2.innerHTML = (RESPAWN[index+1] - RESPAWN[index+1]%60)/60 + ":" + pad + RESPAWN[index+1]%60
    if(RESPAWN[index+2] < 49)    {
        NEXTRESPAWN3.innerHTML = "End"
        return
    }
    if(RESPAWN[index+2]%60 < 10) pad = "0"
    else pad = ""
    NEXTRESPAWN3.innerHTML = (RESPAWN[index+2] - RESPAWN[index+2]%60)/60 + ":" + pad + RESPAWN[index+2]%60
}

getStartTime = () => {
    const time = new Date();
    time.setMinutes(time.getMinutes() - time.getMinutes() % 30);
    time.setSeconds(0);
    time.setMilliseconds(0);

    return time;
}

getCurrentTime = () => {
    const time = new Date();
    time.setMilliseconds(0);

    return time;
}

getNextRespawn = (chrono) => {
    return RESPAWN.find((respawn) => chrono > respawn);
}

const RESPAWN = [
    1780,   // 29:40
    1760,   // 29:20
    1740,   // 29:00
    1720,   // 28:40
    1700,   // 28:20
    1680,   // 28:00
    1660,   // 27:40
    1640,   // 27:20
    1620,   // 27:00
    1600,   // 26:40
    1580,   // 26:20
    1560,   // 26:00
    1540,   // 25:40
    1520,   // 25:20

    1492,   // 24:52
    1464,   // 24:24
    1436,   // 23:56
    1408,   // 23:28
    1380,   // 23:00
    1352,   // 22:32
    1324,   // 22:04
    1296,   // 21:36
    1268,   // 21:08
    1240,   // 20:40
    1212,   // 20:12

    1183,   // 19:43
    1147,   // 19:07
    1111,   // 18:31
    1075,   // 17:55
    1039,   // 17:19
    1003,   // 16:43
    967,    // 16:07
    931,    // 15:31
    895,    // 14:55
    859,    // 14:19

    815,    // 13:35
    771,    // 12:51
    727,    // 12:07
    683,    // 11:23
    639,    // 10:39
    595,    // 09:55
    551,    // 09:11

    499,    // 08:19
    447,    // 07:27
    395,    // 06:35
    343,    // 05:43

    290,    // 04:50
    230,    // 03:50
    170,    // 02:50
    110,    // 01:50
    50,     // 00:50
    0,      // 00:00
    0,      // 00:00
    0,      // 00:00
]