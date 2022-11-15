let graph = require('./graph');
let classes = require('./classes');
let orders = require('./data');
let Load = classes.Load;

function buildOptimizedLoads(orders) {
  let loads = 1;
  let available = orders.slice();
  let results = [];
  let previousCity = available[0].pickCity;

  while (available.length) {
    let newLoad = new Load();
    newLoad.load = loads++;

    let orderedOptions = available
      .map((order) => {
        return {
          order: order.order,
          pickCity: order.pickCity,
          dropCity: order.dropCity,
          pallets: order.pallets,
          distance: graph.Dijkstra(previousCity, order.dropCity),
        };
      })
      .sort((a, b) => a.distance - b.distance);

    (function doSomething(orderedOptions) {
      if (!orderedOptions.length) {
        return;
      } else if (26 - (newLoad.pallets + orderedOptions[0].pallets) >= 0) {
        newLoad.route.push(orderedOptions[0]);
        newLoad.pallets += orderedOptions[0].pallets;
        newLoad.totalMiles += orderedOptions[0].distance;
        previousCity = orderedOptions[0].dropCity;

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

// console.log(JSON.stringify(buildOptimizedLoads(orders)));
console.log(buildOptimizedLoads(orders));
