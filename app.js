const math = require('mathjs'),
      moment = require('moment'),
      oanda = require('./oanda')

let trainingInputs = []
let trainingAnswers = []

const fillTrainingInputs = async () => {

  let res = await oanda.candlesFromTo('EUR_USD', 1, 0),
      iterations = math.floor(res.candles.length / 10),
      indexBeg = 0,
      indexEnd = 10,
      prev10Prices = [],
      highLowDiffs = [],
      volumes = []

  for (let i = 0; i < iterations; i++) {

    prev10Prices.length = 0
    highLowDiffs.length = 0
    volumes.length = 0
    let sliced = res.candles.slice(indexBeg, indexEnd)
    indexBeg += 10
    indexEnd += 10

    for (let n = 0; n < 10; n++) {
      prev10Prices.push(sliced[n].bid.c)
      highLowDiffs.push(sliced[n].bid.h - sliced[n].bid.l)
      volumes.push(sliced[n].volume)
    }

    let inputs = [
      math.mean(prev10Prices),
      math.mean(highLowDiffs),
      math.mean(volumes),
      sliced[9].bid.c
    ]

    trainingInputs.push(inputs)

  }

  console.log(trainingInputs[0])
  fillTrainingAnswers()

}

const fillTrainingAnswers = () => {
  for (let i = 0; i < trainingInputs.length; i++) {
    if (trainingInputs[i + 1] > trainingInputs[i]) {
      trainingAnswers.push(1)
    } else {
      trainingAnswers.push(0)
    }
  }
  console.log(trainingAnswers)
}

fillTrainingInputs()
