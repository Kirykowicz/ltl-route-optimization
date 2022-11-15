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

    function sortedOptions(orders, previousCity = orders[0].pickCity) {
      return orders
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
        previousCity = orderedOptions[0].dropCity;

        available = available.filter(
          (element) => element.order !== orderedOptions[0].order
        );
        orderedOptions.shift();
        return doSomething(sortedOptions(orderedOptions, previousCity));
      } else {
        return doSomething(orderedOptions.slice(1));
      }
    })(sortedOptions(available));

    results.push(newLoad);
  }
  // Format output data
  results.forEach((result) =>
    result.route.unshift({
      city: result.route[0].pickCity,
      type: 'pick',
      orders: [],
    })
  );
  results.forEach((result) => {
    for (let i = 1; i < result.route.length; i++) {
      result.route[0].orders.push(result.route[i].order);
      result.route[i] = {
        city: result.route[i].dropCity,
        type: 'drop',
        orders: [result.route[i].order],
      };
    }
  });
  return results[0].route;
}

// console.log(JSON.stringify(buildOptimizedLoads(orders)));
console.log(buildOptimizedLoads(orders));
