const math = require('mathjs'),
      moment = require('moment'),
      oanda = require('./oanda',)
      today = moment().format('YYYY-MM-DD')

let prev10Array = []
let openCloseDiffArray = []
let prev10Vols = []

oanda.priceSince('EUR_USD', 1, 0).then(res => {
  for (let i = 0; i < res.candles.length; i++) {
    prev10Array.push(res.candles[i].bid.c)
    openCloseDiffArray.push(math.abs(res.candles[i].bid.o - res.candles[i].bid.c))
    prev10Vols.push(res.candles[i].volume)
  }
  console.log(`Prev 10 Closing Prices Average: ${math.mean(prev10Array)}`)
  console.log(`Average diff between O/C: ${math.mean(openCloseDiffArray)}`)
  console.log(`Average volume of previous 10 periods: ${math.mean(prev10Vols)}`)
})
