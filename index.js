const express = require('express');
const { PORT } = require('./util/config')

require('express-group-routes');

app = express()
app.use(express.json())
app.set('view engine', 'ejs')
app.use('/assets', express.static('views/assets'))

const { avgDaily, avgWeekly, avgMonthly, avgYearly } = require('./controller/Weather')

const mongoUtil = require('./util/helper');

// initialization connection for reuseable mongodb connection
mongoUtil.connectToServer(function (err, client) {
    if (err) console.log(err);

    // API
    app.get('/avg-daily', avgDaily)
    app.get('/avg-weekly', avgWeekly)
    app.get('/avg-monthly', avgMonthly)
    app.get('/avg-yearly', avgYearly)
});


// Endpoint View
app.get('/', (req, res) => {
    res.render('index')
})
app.listen(PORT, () => { console.log(`app running on port ${PORT}`) })