# ltl-route-optimization

First and foremost, to run this application enter node app.js into the terminal and hit enter.

My thought process in building this function is as follows:

We want to optimize miles, and also optimize trailer space. Meaning, as we add ltl orders, we are trying to fill up a trailer as much as possible, while also attempting to find the shortest possible route for the loaded truck to travel.

In this function, an array of orders is used as an input value.

1. The function first takes the array and sorts each order by distance from origin to drop city.
2. Next, a new load is created.
3. The order with the shortest distance from the origin is selected as the first drop on the first load,
4. The selected order removed from the array of orders (it is no longer available).
5. Next, the array of orders is resorted, however, the origin is now changed to be the drop city of the order that was just added to the first load.
6. Next the first order in the newly sorted array (the one with the shortest distance from the first drop) is selected. If the truck has space for it (a truck can only hold 26 pallets), it is added to the load and steps 4 and 5 are repeated. If there is not space for it, it is skipped and the next order in the array is selected to see if it fits. This process continues until the load is at its maximum capacity with the available combination of pallet counts.
7. If there are still available orders that have not been accounted for, then the process starts again from step 2 until every order is assigned to a truck.

Example of an input array:

[
{ order: 1, pickCity: 'Miami', dropCity: 'Tampa', pallets: 5 },
{ order: 2, pickCity: 'Miami', dropCity: 'Nashville', pallets: 15 },
{ order: 3, pickCity: 'Miami', dropCity: 'Houston', pallets: 3 },
{ order: 4, pickCity: 'Miami', dropCity: 'Atlanta', pallets: 10 },
]

Example of and output array:

[
{
load: 1,
route: [
{ city: 'Miami', type: 'pick', orders: [1, 3] },
{ city: 'Tampa', type: 'drop', orders: [1] },
{ city: 'Houston', type: 'drop', orders: [3] },
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
