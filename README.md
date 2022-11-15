# ltl-route-optimization

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
