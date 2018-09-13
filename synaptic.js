const { Layer, Network } = require('synaptic')

const inputLayer = new Layer(4)
const hiddenLayer = new Layer(5)
const outputLayer = new Layer(1)

inputLayer.project(hiddenLayer)
hiddenLayer.project(outputLayer)

const myNetwork = new Network({
  input: inputLayer,
  hidden: [hiddenLayer],
  output: outputLayer
})

let learningRate = .3

// for (let i = 0; i < 200; i++) {
//
//   for (let i = 0; i < data.results.length; i++) {
//     myNetwork.activate(data.results[i])
//     myNetwork.propagate(learningRate, [data.wins[i]])
//   }
//
// }

const predictor = myNetwork.standalone()

module.exports = {
  predictor
}
