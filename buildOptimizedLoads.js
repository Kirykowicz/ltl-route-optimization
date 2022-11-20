let graph = require('./graph');
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

    // This function takes the orders that have not been assigned yet, and sorts them in order, by distance, from the previous drop or if it is the first drop, then in order from the origin.
    function sortedOptions(orders, previousCity = orders[0].pickCity) {
      return orders
        .map((order) => {
          return {
            order: order.order,
            pickCity: order.pickCity,
            dropCity: order.dropCity,
            pallets: order.pallets,
            distance: graph.findShortestPath(previousCity, order.dropCity),
          };
        })
        .sort((a, b) => a.distance - b.distance);
    }

    // This is a recursive function that uses the process of elimination to add drops to a load. It starts by taking the order that is the shortest distance from either the origin or the previous delivery. If there is enough space on the truck, the function then calls itself recursively, if there is not enough room for that order, than that order is removed from the available options, and the function will call itself again recursively. This continues until there are no more options that have been attempted to be assigned. After that, this load is pushed to results, and and a new Load is created. Starting the process over again. This repeats until all orders have been gone through and assigned to a Load.
    (function addOrders(orderedOptions) {
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
        return addOrders(sortedOptions(orderedOptions, previousCity));
      } else {
        return addOrders(orderedOptions.slice(1));
      }
    })(sortedOptions(available));

    results.push(newLoad);
  }

  // Format the output data to look like the example output data in the instructions
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

  return results;
}

module.exports = buildOptimizedLoads;
