//geospatial json data  in coordiantes array first value has to be the longitude and the second value is the latitude,

db.places.insertOne({
  name: "Ayodha",
  location: { type: "Point", coordinates: [82.1785682, 26.7897737] },
});

db.places.findOne();

// {
//   _id: ObjectId('65c0c2dc9c8062f4e8dc4682'),
//   name: 'Ayodha',
//   location: { type: 'Point', coordinates: [ 82.1785682, 26.7897737 ] }
// }

db.places.createIndex({ location: "2dsphere" });

db.places.find({
  location: {
    $near: {
      $geometry: { type: "Point", coordinates: [82.1785682, 26.7897737] },
    },
  },
});

db.places
  .find({
    location: {
      $near: {
        $geometry: { type: "Point", coordinates: [82.1785682, 26.7897737] },
        $maxDistance: 500,
        $minDistance: 0,
      },
    },
  })
  .pretty();
//  Output:
//[
//   {
//     _id: ObjectId("65c0c2dc9c8062f4e8dc4682"),
//     name: "Ayodha",
//     location: { type: "Point", coordinates: [82.1785682, 26.7897737] },
//   }
// ];

db.places.insertOne({
  name: "Shri Hanuman Garhi Mandir",
  location: { type: "Point", coordinates: [82.1785682, 26.7897737] },
});

awesomeplaces >
  db.places.insertOne({
    name: "Ram Mandir",
    location: { type: "Point", coordinates: [81.8194765, 26.5568641] },
  });

awesomeplaces >
  db.places.insertOne({
    name: "Lucknow",
    location: { type: "Point", coordinates: [80.7777013, 26.8485965] },
  });

// awesomeplaces> const p1 = [82.1785682 ,26.7897737]

// awesomeplaces> p1
// [ 82.1785682, 26.7897737 ]
// awesomeplaces> const p2 = [82.1785682 ,26.7897737]

// awesomeplaces> const p3 = [81.8194765 , 26.5568641]

// awesomeplaces> const p4 = [80.7777013 , 26.8485965]

awesomeplaces >
  db.places
    .find({
      location: {
        $geoWithin: {
          $geometry: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
        },
      },
    })
    .pretty();
// [
//   {
//     _id: ObjectId('65c0c2dc9c8062f4e8dc4682'),
//     name: 'Ayodha',
//     location: { type: 'Point', coordinates: [ 82.1785682, 26.7897737 ] }
//   },
//   {
//     _id: ObjectId('65c0c95b9c8062f4e8dc4683'),
//     name: 'Shri Hanuman Garhi Mandir',
//     location: { type: 'Point', coordinates: [ 82.1785682, 26.7897737 ] }
//   },
//   {
//     _id: ObjectId('65c0c9a09c8062f4e8dc4684'),
//     name: 'Ram Mandir',
//     location: { type: 'Point', coordinates: [ 81.8194765, 26.5568641 ] }
//   },
//   {
//     _id: ObjectId('65c0ca149c8062f4e8dc4685'),
//     name: 'Lucknow',
//     location: { type: 'Point', coordinates: [ 80.7777013, 26.8485965 ] }
//   }

awesomeplaces >
  db.areas.insertOne({
    name: "Rammay",
    area: { type: "Polygon", coordinates: [[p1, p2, p3, p4, p1]] },
  });

// awesomeplaces> db.areas.find()
// [
//   {
//     _id: ObjectId('65c0cf979c8062f4e8dc4687'),
//     name: 'Rammay',
//     area: {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [ 82.1785682, 26.7897737 ],
//           [ 82.1785682, 26.7897737 ],
//           [ 81.8194765, 26.5568641 ],
//           [ 80.7777013, 26.8485965 ],
//           [ 82.1785682, 26.7897737 ]
//         ]
//       ]
//     }
//   }
// ]
awesomeplaces > db.areas.createIndex({ area: "2dsphere" });
awesomeplaces >
  db.areas.find({
    area: {
      $geoIntersects: {
        $geometry: {
          type: "Point",
          coordinates: [82.1923869683022, 26.791689147916404],
        },
      },
    },
  });

awesomeplaces >
  db.areas.find({
    area: {
      $geoIntersects: {
        $geometry: { type: "Point", coordinates: [82.1812345, 26.76568914] },
      },
    },
  });

awesomeplaces >
  db.areas.find({
    area: {
      $geoIntersects: {
        $geometry: { type: "Point", coordinates: [80.7777013, 26.8485965] },
      },
    },
  });
// [
//   {
//     _id: ObjectId('65c0cf979c8062f4e8dc4687'),
//     name: 'Rammay',
//     area: {
//       type: 'Polygon',
//       coordinates: [
//         [
//           [ 82.1785682, 26.7897737 ],
//           [ 82.1785682, 26.7897737 ],
//           [ 81.8194765, 26.5568641 ],
//           [ 80.7777013, 26.8485965 ],
//           [ 82.1785682, 26.7897737 ]
//         ]
//       ]
//     }
//   }
// ]

//find radius  within which a point lies
db.areas
  .find({
    location: {
      $geoWithin: { $centerSphere: [[-122.46203, 37.77286], 1 / 6378.1] },
    },
  })
  .pretty();
