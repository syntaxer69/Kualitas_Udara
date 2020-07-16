const io = require('socket.io-client');
// connect ke server sesuai ip dan port yg di tentukan oleh server
var socket = io.connect('http://localhost:3000');
// const SerialPort = require('serialport');
// const Readline = require('@serialport/parser-readline');
// const port = new SerialPort('COM3', { baudRate: 115200 });
// const parser = port.pipe(new Readline({ delimiter: '\n' }));

const pm10 = {
    "baik" : {
        mu: 0,
        isTrue: false,
    },
    "sedang" : {
        mu: 0,
        isTrue: false,
    },
    "tidak sehat": {
        mu: 0,
        isTrue: false,
    },
    "sangat tidak sehat": {
        mu: 0,
        isTrue: false,
    },
    "berbahaya": {
        mu: 0,
        isTrue: false,
    },
}


const co = {
    "baik" : {
        mu: 0,
        isTrue: false,
    },
    "sedang" : {
        mu: 0,
        isTrue: false,
    },
    "tidak sehat": {
        mu: 0,
        isTrue: false,
    },
    "sangat tidak sehat": {
        mu: 0,
        isTrue: false,
    },
    "berbahaya": {
        mu: 0,
        isTrue: false,
    },
}

const rumumsIspu = {
    baik: {
        baik: "baik",
        sedang: "baik",
        "tidak sehat": "baik",
        "sangat tidak sehat": "sedang",
        "berbahaya": "tidak sehat",
    },
    sedang: {
        baik: "baik",
        sedang: "sedang",
        "tidak sehat": "sedang",
        "sangat tidak sehat": "tidak sehat",
        "berbahaya": "sangat tidak sehat",
    },
    "tidak sehat": {
        baik: "baik",
        sedang: "sedang",
        "tidak sehat": "tidak sehat",
        "sangat tidak sehat": "sangat tidak sehat",
        "berbahaya": "berbahaya",
    },
    "sangat tidak sehat": {
        baik: "sedang",
        sedang: "tidak sehat",
        "tidak sehat": "sangat tidak sehat",
        "sangat tidak sehat": "sangat tidak sehat",
        "berbahaya": "berbahaya",
    },
    "berbahaya": {
        "baik": "tidak sehat",
        "sedang": "sangat tidak sehat",
        "tidak sehat": "berbahaya",
        "sangat tidak sehat": "berbahaya",
        "berbahaya": "berbahaya"
    }
}

function baik(number) {
    if(50 <= number && number <= 150){
        let mu = (150 - number) / (150 - 50)
        pm10['baik']['mu'] = mu
        pm10['baik']['isTrue'] = true
    } else if (number <= 50){
        let mu = 1
        pm10['baik']['mu'] = mu
        pm10['baik']['isTrue'] = true
    }
}

function sedang(number) {
    if(50 < number && number <= 150){
        let mu = (number - 50) / (150 - 50)
        pm10['sedang']['mu'] = mu
        pm10['sedang']['isTrue'] = true
    } else if(150 <= number && number <= 300){
        let mu = (300 - number) / (300 - 50)
        pm10['sedang']['mu'] = mu
        pm10['sedang']['isTrue'] = true
    }
}

function tidakSehat(number) {
    if(150 < number && number <= 300){
        let mu = (number - 150) / (300 - 150)
        pm10['tidak sehat']['mu'] = mu
        pm10['tidak sehat']['isTrue'] = true
    } else if(300 <= number && number <= 420){
        let mu = (420 - number) / (420 - 150)
        pm10['tidak sehat']['mu'] = mu
        pm10['tidak sehat']['isTrue'] = true
    }
}

function sangetTidakSehat(number) {
    if(300 < number && number <= 420){
        let mu = (number - 300) / (420 - 300)
        pm10['sangat tidak sehat']['mu'] = mu
        pm10['sangat tidak sehat']['isTrue'] = true
    } else if(420 <= number && number < 500){
        let mu = (500 - number) / (500 - 300)
        pm10['sangat tidak sehat']['mu'] = mu
        pm10['sangat tidak sehat']['isTrue'] = true
    }
}

function berbahaya(number) {
    if(number >= 500){
        pm10['berbahaya']['mu'] = 1
        pm10['berbahaya']['isTrue'] = true
    } else if (420 < number && number < 500){
        pm10['berbahaya']['mu'] = (number -420) / (500 - 420)
        pm10['berbahaya']['isTrue'] = true
    }
}

function baikCo(number) {
    if(5 <= number && number <= 10){
        let mu = (10 - number) / (10 - 5)
        co['baik']['mu'] = mu
        co['baik']['isTrue'] = true
    } else if (number < 5){
        let mu = 1
        co['baik']['mu'] = mu
        co['baik']['isTrue'] = true
    }
}

function sedangCo(number) {
    if(5 < number && number <= 10){
        let mu = (number - 5) / (10 - 5)
        co['sedang']['mu'] = mu
        co['sedang']['isTrue'] = true
    } else if(10 <= number && number < 17){
        let mu = (17 - number) / (17 - 5)
        co['sedang']['mu'] = mu
        co['sedang']['isTrue'] = true
    }
}

function tidakSehatCo(number) {
    if(10 < number && number <= 17){
        let mu = (number - 10) / (17 - 10)
        co['tidak sehat']['mu'] = mu
        co['tidak sehat']['isTrue'] = true
    } else if(17 <= number && number < 34){
        let mu = (34 - number) / (34 - 10)
        co['tidak sehat']['mu'] = mu
        co['tidak sehat']['isTrue'] = true
    }
}

function sangetTidakSehatCo(number) {
    if(17 < number && number <= 34){
        let mu = (number - 17) / (34 - 17)
        co['sangat tidak sehat']['mu'] = mu
        co['sangat tidak sehat']['isTrue'] = true
    } else if(34 <= number && number < 40){
        let mu = (40 - number) / (40 - 17)
        co['sangat tidak sehat']['mu'] = mu
        co['sangat tidak sehat']['isTrue'] = true
    }
}

function berbahayaCo(number) {
    if(number >= 40){
        co['berbahaya']['mu'] = 1
        co['berbahaya']['isTrue'] = true
    } else if (34 < number && number < 40){
        co['berbahaya']['mu'] = (number - 34) / (40 - 34)
        co['berbahaya']['isTrue'] = true
    }
}

function hitungIspu(a, rule){
    let alpha;
    if(rule == 'baik') {
        alpha = 100 - (a * 50)
    } else if (rule == "sedang") {
        alpha = 50 + (a * 50)
    } else if (rule == "tidak sehat") {
        alpha = 100 + (a * 100)
    } else if (rule == "sangat tidak sehat") {
        alpha = 100 + (a * 100)
    } else if (rule == "berbahaya") {
        alpha = 300 + (a * 100)
    }
    return alpha
}

function fuzzyfikasi(valuePm10, valueCo) {
    // Pm10 Rule
    baik(valuePm10)
    sedang(valuePm10)
    tidakSehat(valuePm10)
    sangetTidakSehat(valuePm10)
    berbahaya(valuePm10)

    // co rule
    baikCo(valueCo)
    sedangCo(valueCo)
    tidakSehatCo(valueCo)
    sangetTidakSehatCo(valueCo)
    berbahayaCo(valueCo)
}

function inferensi(pm10, co) {
    let filteredPm10 = {}
    let filteredCo = {}
    let alpha = []
    let y = []

    for(let d in pm10){
        if(pm10[d]["isTrue"]) {
            filteredPm10[d] = pm10[d]
        }
    }

    for(let d in co){
        if(co[d]["isTrue"]) {
            filteredCo[d] = co[d]
        }
    }
    for(let d in filteredPm10){
        for(let e in filteredCo){
            if(filteredPm10[d]['mu'] < filteredCo[e]['mu']){
                y.push(hitungIspu(filteredPm10[d]['mu'], rumumsIspu[e][d]))
                alpha.push(filteredPm10[d]['mu'])
            } else if (filteredPm10[d]['mu'] == filteredCo[e]['mu']){
                y.push(hitungIspu(1, rumumsIspu[e][d]))
                alpha.push(1)
            } else {
                y.push(hitungIspu(filteredCo[e]['mu'], rumumsIspu[e][d]))
                alpha.push(filteredCo[e]['mu'])
            }
        }
    }
    return {
        alpha,
        y
    }
}

function zToText(number) {
    if(number <= 50) {
        return "Baik"
    } else if(number <= 100) {
        return "Sedang"
    } else if(number <= 199) {
        return "Tidak Sehat"
    } else if(number <= 299) {
        return "Sangat Tidak Sehat"
    } else {
        return "Berbahaya"
    }
}

function defuzzyfikasi(alpha, y) {
    let sumZ = 0
    let sumA = 0
    for(var i = 0; i < y.length; i++){
        sumZ += y[i] * alpha[i]
        sumA += alpha[i]
    }
    let fracAZ = sumZ/sumA
    let z = zToText(fracAZ)
    return {
        zToText: z,
        ispu: fracAZ
    }
}

function recomendation(text) {
    if(text == "Baik") {
        return "-"
    } else if (text == "Sedang") {
        return "-"
    } else if(text == "Tidak Sehat") {
        return "Sensitif Gunakan Masker"
    } else if(text == "Sangat Tidak Sehat") {
        return "Gunakan Masker"
    } else if(text == "Berbahaya") {
        return "Gunakan Masker Khusus"
    } else {
        return "Terjadi Kesalahan"
    }
}

function manualDoStuff() {
    let coVal = 11
    let pm10Val = 47
    fuzzyfikasi(pm10Val, coVal)
    let zVal = inferensi(pm10, co)
    let defuzzyfikasis = defuzzyfikasi(zVal.alpha, zVal.y)
    let recome = recomendation(defuzzyfikasis.zToText) 
    let obj = {
        ispu: defuzzyfikasis.ispu,
        text: defuzzyfikasis.zToText,
        recome
    }
    console.log(`pm10: ${pm10Val}, co: ${coVal}`)
    console.log(obj)
    socket.emit("denscity", obj);
}

// function doStuff(){
//     // Read the port data
//     port.on("open", () => {
//         console.log('serial port open');
//     });
//     // parsing data byte yg di baca dari usb ke dalam bentuk text
//     parser.on('data', data =>{
//         let dataParser = data.split(",")
//         // bentuk data pm10: value, co: value/r
//         // split jadi ["pm10: value","co: value/r"]
//         // split co ["co", "value/r"]
//         let coVal = dataParser[1].replace(/(\r\n|\n|\r)/gm, "").split(": ")[1]
//         let pm10Val = (dataParser[0].split(": ")[1] * 100)
//         fuzzyfikasi(pm10Val, coVal)
//         let zVal = inferensi(pm10, co)
//         let defuzzyfikasis = defuzzyfikasi(zVal.alpha, zVal.y)
//         let recome = recomendation(defuzzyfikasis.zToText) 
//         let obj = {
//             ispu: defuzzyfikasis.ispu,
//             text: defuzzyfikasis.zToText,
//             recome
//         }
//         console.log(`pm10: ${pm10Val}, co: ${coVal}`)
//         console.log(obj)
//         // transimi data ke channel denscity
//         socket.emit("denscity", obj);
//     });
// }

manualDoStuff();
// doStuff();