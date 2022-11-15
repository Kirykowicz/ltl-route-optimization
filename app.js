let graph = require('./graph');
let orders = require('./data');
let classes = require('./classes');
let Load = classes.Load;

function buildOptimizedLoads(orders) {
  let loads = 0;
  let available = orders.slice();
  let results = [];

  while (available.length) {
    loads++;
    let newLoad = new Load();
    newLoad.load = loads;

    // let previousCity = available[0].pickCity;
    // if (!newLoad.route.length) {
    //   previousCity = available[0].pickCity;
    // } else {
    //   previousCity = newLoad.route[newLoad.route.length - 1].dropCity;
    // }

    function orderOptions(a, previousCity = a[0].pickCity) {
      return a
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
    }

    (function doSomething(orderedOptions) {
      if (!orderedOptions.length) {
        return;
      } else if (26 - (newLoad.pallets + orderedOptions[0].pallets) >= 0) {
        newLoad.route.push(orderedOptions[0]);
        newLoad.pallets += orderedOptions[0].pallets;
        newLoad.totalMiles += orderedOptions[0].distance;
        newLoad.previousCity = orderedOptions[0].dropCity;
        console.log(orderedOptions[0].dropCity);
        previousCity = orderedOptions[0].dropCity;

        available = available.filter(
          (element) => element.order !== orderedOptions[0].order
        );
        orderedOptions.shift();
        return doSomething(orderOptions(orderedOptions, previousCity));
      } else {
        return doSomething(orderedOptions.slice(1));
      }
    })(orderOptions(available));

    results.push(newLoad);
  }
  return results[0];
}

// console.log(JSON.stringify(buildOptimizedLoads(orders)));
console.log(buildOptimizedLoads(orders));
