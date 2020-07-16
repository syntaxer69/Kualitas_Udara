const mongoUtil = require("../util/helper");
const moment = require("moment")
const { avarageData, zToText } = require('../util/helper')

exports.avgDaily = async (req, res) => {
    var db = mongoUtil.getDb();
    let startOfDay = Math.floor(moment().startOf('day').toDate() / 1000)
    let endOfDay = Math.floor(moment().endOf('day').toDate() / 1000)
    let listToday = await db.collection('ispu').find({created_at: {$lte: endOfDay, $gte: startOfDay}}).toArray()
    let ispu = avarageData(listToday, listToday.length)
    let recomendation = zToText(ispu)
    res.status(200).json({
        message: 'success',
        data: {
            ispu,
            recomendation
        }
    })
}

exports.avgWeekly = async (req, res) => {
    var db = mongoUtil.getDb();
    let startOfWeek = Math.floor(moment().startOf('week').toDate() / 1000)
    let endOfWeek = Math.floor(moment().endOf('week').toDate() / 1000)
    let listToday = await db.collection('ispu').find({created_at: {$lte: endOfWeek, $gte: startOfWeek}}).toArray()
    let ispu = avarageData(listToday, listToday.length)
    let recomendation = zToText(ispu)
    res.status(200).json({
        message: 'success',
        data: {
            ispu,
            recomendation
        }
    })
}

exports.avgMonthly = async (req, res) => {
    var db = mongoUtil.getDb();
    let startOfMonth = Math.floor(moment().startOf('month').toDate() / 1000)
    let endOfMonth = Math.floor(moment().endOf('month').toDate() / 1000)
    let listToday = await db.collection('ispu').find({created_at: {$lte: endOfMonth, $gte: startOfMonth}}).toArray()
    let ispu = avarageData(listToday, listToday.length)
    let recomendation = zToText(ispu)
    res.status(200).json({
        message: 'success',
        data: {
            ispu,
            recomendation
        }
    })
}

exports.avgYearly = async (req, res) => {
    var db = mongoUtil.getDb();
    let startOfYear = Math.floor(moment().startOf('year').toDate() / 1000)
    let endOfYear = Math.floor(moment().endOf('year').toDate() / 1000)
    let listToday = await db.collection('ispu').find({created_at: {$lte: endOfYear, $gte: startOfYear}}).toArray()
    let ispu = avarageData(listToday, listToday.length)
    let recomendation = zToText(ispu)
    res.status(200).json({
        message: 'success',
        data: {
            ispu,
            recomendation
        }
    })
}