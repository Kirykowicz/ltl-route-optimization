class PriorityQueue {
  constructor() {
    this.values = [];
  }

  enqueue(val, priority) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }
}

class WeightedGraph {
  constructor() {
    this.adjacencyList = {};
  }

  addVertex(vertex) {
    if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = [];
  }

  addEdge(vertex1, vertex2, weight) {
    this.adjacencyList[vertex1].push({ node: vertex2, weight });
    this.adjacencyList[vertex2].push({ node: vertex1, weight });
  }

  Dijkstra(start, finish) {
    const nodes = new PriorityQueue();
    const distances = {};
    const previous = {};
    let path = []; // to return at end
    let smallest;

    // build up initial state
    for (let vertex in this.adjacencyList) {
      if (vertex === start) {
        distances[vertex] = 0;
        nodes.enqueue(vertex, 0);
      } else {
        distances[vertex] = Infinity;
        nodes.enqueue(vertex, Infinity);
      }
      previous[vertex] = null;
    }

    // as long as there is something to visit
    while (nodes.values.length) {
      smallest = nodes.dequeue().val;
      if (smallest === finish) {
        // We are done
        // Build up path to return to end
        while (previous[smallest]) {
          path.push(smallest);
          smallest = previous[smallest];
        }
        break;
      }
      if (smallest || distances[smallest] !== Infinity) {
        for (let neighbor in this.adjacencyList[smallest]) {
          // find neighboring node
          let nextNode = this.adjacencyList[smallest][neighbor];
          // calculate new distance to neighboring node
          let candidate = distances[smallest] + nextNode.weight;
          let nextNeighbor = nextNode.node;
          if (candidate < distances[nextNeighbor]) {
            // updating new smallest distance to neighbor
            distances[nextNeighbor] = candidate;
            // updating previous - how we got to neighbor
            previous[nextNeighbor] = smallest;
            // enque in priority queue with new priority
            nodes.enqueue(nextNeighbor, candidate);
          }
        }
      }
    }
    // return path.concat(smallest).reverse();
    return distances[finish];
  }
}

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

const orders = [
  { order: 1, pickCity: 'Miami', dropCity: 'Tampa', pallets: 5 },
  { order: 2, pickCity: 'Miami', dropCity: 'Nashville', pallets: 15 },
  { order: 3, pickCity: 'Miami', dropCity: 'Houston', pallets: 3 },
  { order: 4, pickCity: 'Miami', dropCity: 'Atlanta', pallets: 10 },
  { order: 5, pickCity: 'Miami', dropCity: 'Miami', pallets: 10 },
  { order: 6, pickCity: 'Miami', dropCity: 'Jackson', pallets: 17 },
];

class Load {
  constructor() {
    this.load = 1;
    this.route = [];
    this.pallets = 0;
    this.totalMiles = 0;
  }
}

function buildOptimizedLoads(orders) {
  // load count
  // while there are available loads
  // order the orders from pick up point
  // build new load
  // push shortest distance to new load
  // order the orders with new pick up point
  // if pallets fit, push shortest distance
  // if pallets do not fit go over to next load and check and push if it fits
  // order the orders
  // if pallet fits push shortest distance
  // once everything has been added, build new load
  // repeat process
  let loads = 0;
  let available = orders.slice();
  let results = [];
  console.log(available);
  let previousCity = available[0].pickCity;

  while (available.length) {
    let newLoad = new Load();
    newLoad.load += loads;

    let orderedOptions = available
      .map((order) => {
        console.log(previousCity);
        return {
          order: order.order,
          pickCity: order.pickCity,
          dropCity: order.dropCity,
          pallets: order.pallets,
          distance: graph.Dijkstra(previousCity, order.dropCity),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    console.log(orderedOptions);

    (function doSomething(orderedOptions) {
      if (!orderedOptions.length) {
        return;
      } else if (26 - (newLoad.pallets + orderedOptions[0].pallets) >= 0) {
        newLoad.route.push(orderedOptions[0]);
        newLoad.pallets += orderedOptions[0].pallets;
        newLoad.totalMiles += orderedOptions[0].distance;
        previousCity = orderedOptions[0].dropCity;

        console.log(available);
        available = available.filter(
          (element) => element.order !== orderedOptions[0].order
        );
        orderedOptions.shift();
        return doSomething(orderedOptions);
      } else {
        return doSomething(orderedOptions.slice(1));
      }
    })(orderedOptions);

    results.push(newLoad);
  }
  return results;
}

console.log(buildOptimizedLoads(orders));
