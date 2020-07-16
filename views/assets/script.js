// connect ke socket io di port 3000
const socket = io('http://localhost:3000');

function getData(url) {
    return new Promise((resolve, reject) => {
        $.ajax({
            type: "GET",
            url: url,
            dataType: "json",
            contentType: "application/json; charset=utf-8",
            success: function (res) {
                resolve(res)
            },
            error: function (res) {
                reject(res)
            }
        })
    })
}

$(document).ready(function (){
    const liveReport = document.getElementById('live-report')
    const liveIspu = document.getElementById('live-ispu')
    const liveRec = document.getElementById('live-recomendation')

    // status
    const rataHarian = document.getElementById("status-harian")
    const rataMingguan = document.getElementById("status-mingguan")
    const rataBulanan = document.getElementById("status-bulanan")
    const rataTahunan = document.getElementById("status-tahunan")

    // ispu
    const ispuHarian = document.getElementById("ispu-harian")
    const ispuMingguan = document.getElementById("ispu-mingguan")
    const ispuBulanan = document.getElementById("ispu-bulanan")
    const ispuTahunan = document.getElementById("ispu-tahunan")

    // listen ke channel livedencsity
    socket.on('livedenscity', data=> {
        console.log(data)
        liveReport.innerHTML = data.text
        liveIspu.innerHTML = `ISPU ${Math.round(data.ispu * 100) / 100}`
        liveRec.innerHTML = `Rekomendasi Tindakan: ${data.recome}`
    })

    setInterval(async () => {
        // http://localhost/avg-daily
        const daily = await getData('/avg-daily')
        const weekly = await getData('/avg-weekly')
        const monthly = await getData('/avg-monthly')
        const yearly = await getData('/avg-yearly')

        rataHarian.innerHTML = `${daily.data.recomendation}`
        ispuHarian.innerHTML = `${daily.data.ispu}`

        rataMingguan.innerHTML = `${weekly.data.recomendation}`
        ispuMingguan.innerHTML = `${weekly.data.ispu}`

        rataBulanan.innerHTML = `${monthly.data.recomendation}`
        ispuBulanan.innerHTML = `${monthly.data.ispu}`

        rataTahunan.innerHTML = `${yearly.data.recomendation}`
        ispuTahunan.innerHTML = `${yearly.data.ispu}`
    }, 5000);
});