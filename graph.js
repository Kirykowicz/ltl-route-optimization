let classes = require('./classes');
let WeightedGraph = classes.WeightedGraph;

const miami = 'Miami';
const tampa = 'Tampa';
const orlando = 'Orlando';
const jacksonville = 'Jacksonville';
const tallahassee = 'Tallahassee';
const atlanta = 'Atlanta';
const charlotte = 'Charlotte';
const newOrleans = 'New Orleans';
const jackson = 'Jackson';
const nashville = 'Nashville';
const houston = 'Houston';
const dallas = 'Dallas';

const graph = new WeightedGraph();
graph.addVertex(miami);
graph.addVertex(tampa);
graph.addVertex(orlando);
graph.addVertex(jacksonville);
graph.addVertex(tallahassee);
graph.addVertex(atlanta);
graph.addVertex(charlotte);
graph.addVertex(newOrleans);
graph.addVertex(jackson);
graph.addVertex(nashville);
graph.addVertex(houston);
graph.addVertex(dallas);

graph.addEdge(miami, tampa, 280);
graph.addEdge(miami, orlando, 236);
graph.addEdge(miami, jacksonville, 347);

graph.addEdge(tampa, tallahassee, 276);
graph.addEdge(tampa, atlanta, 456);
graph.addEdge(tampa, orlando, 84);
graph.addEdge(tampa, miami, 280);

graph.addEdge(orlando, tampa, 84);
graph.addEdge(orlando, tallahassee, 257);
graph.addEdge(orlando, atlanta, 438);
graph.addEdge(orlando, jacksonville, 141);
graph.addEdge(orlando, miami, 236);

graph.addEdge(jacksonville, atlanta, 346);
graph.addEdge(jacksonville, orlando, 141);
graph.addEdge(jacksonville, miami, 347);

graph.addEdge(tallahassee, newOrleans, 387);
graph.addEdge(tallahassee, nashville, 490);
graph.addEdge(tallahassee, atlanta, 272);
graph.addEdge(tallahassee, orlando, 257);
graph.addEdge(tallahassee, tampa, 276);

graph.addEdge(atlanta, charlotte, 245);
graph.addEdge(atlanta, nashville, 265);
graph.addEdge(atlanta, jackson, 381);
graph.addEdge(atlanta, tallahassee, 272);
graph.addEdge(atlanta, tampa, 456);
graph.addEdge(atlanta, orlando, 438);
graph.addEdge(atlanta, jacksonville, 346);

graph.addEdge(charlotte, nashville, 409);
graph.addEdge(charlotte, atlanta, 245);

graph.addEdge(newOrleans, houston, 348);
graph.addEdge(newOrleans, dallas, 492);
graph.addEdge(newOrleans, jackson, 188);
graph.addEdge(newOrleans, nashville, 533);
graph.addEdge(newOrleans, tallahassee, 387);

graph.addEdge(jackson, nashville, 415);
graph.addEdge(jackson, dallas, 402);
graph.addEdge(jackson, newOrleans, 188);
graph.addEdge(jackson, atlanta, 381);

graph.addEdge(nashville, dallas, 664);
graph.addEdge(nashville, jackson, 415);
graph.addEdge(nashville, newOrleans, 533);
graph.addEdge(nashville, tallahassee, 490);
graph.addEdge(nashville, atlanta, 265);
graph.addEdge(nashville, charlotte, 409);

graph.addEdge(houston, dallas, 239);
graph.addEdge(houston, newOrleans, 348);

graph.addEdge(dallas, houston, 239);
graph.addEdge(dallas, newOrleans, 492);
graph.addEdge(dallas, jackson, 402);
graph.addEdge(dallas, nashville, 664);

module.exports = graph;

[
  {
    load: 1,
    route: [
      { city: 'Miami', type: 'pick', orders: [1, 3] },
      { city: 'Tampa', type: 'drop', orders: [1] },
      { city: 'Housto n', type: 'drop', orders: [3] },
    ],
    pallets: 8,
    totalMiles: 1291,
  },
  {
    load: 2,
    route: [
      { city: 'Miami', type: 'pick', orders: [2, 4] },
      { city: 'Atlanta', type: 'drop', orders: [4] },
      { city: 'Nashville', type: 'drop', orders: [2] },
    ],
    pallets: 25,
    totalMiles: 958,
  },
];
