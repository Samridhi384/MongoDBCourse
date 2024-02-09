//Capped collections are a special type of collection which you have to create explicitly where you limit the amount of data or documents that can be stored in there and old documents will simply be deleted when well this size is exceeded, so it's basically a store where oldest data is automatically deleted when new data comes in.

//The writes will always go to the primary node but read requests can be if the server is configured appropriately and that is a task of your system or database admin and that the reads can also talk to secondary nodes and the idea here is of course clear. You want to ensure that you can read your data as fast as possible and if you have an application where you have thousands of read requests per second, then it is awesome if you can read not just from one node which is still one computer who has to handle all of that but if you can read from multiple computers and therefore, you kind of split the load evenly.

// use performance
performance >
  db.createCollection("capped", { capped: true, size: 10000, max: 3 });

performance > db.capped.insertOne({ name: "Max" });

performance > db.capped.insertOne({ name: "Manu" });

performance > db.capped.insertOne({ name: "Anna" });

performance > db.capped.find();
// [
//   { _id: ObjectId('65c34176a810855849285589'), name: 'Max' },
//   { _id: ObjectId('65c34180a81085584928558a'), name: 'Manu' },
//   { _id: ObjectId('65c34188a81085584928558b'), name: 'Anna' }
// ]
performance > db.capped.find().sort({ $natural: -1 }).pretty();
// [
//   { _id: ObjectId('65c34188a81085584928558b'), name: 'Anna' },
//   { _id: ObjectId('65c34180a81085584928558a'), name: 'Manu' },
//   { _id: ObjectId('65c34176a810855849285589'), name: 'Max' }
// ]
performance > db.capped.insertOne({ name: "Maria" });

performance >
  db.capped.find()[
    ({ _id: ObjectId("65c34180a81085584928558a"), name: "Manu" },
    { _id: ObjectId("65c34188a81085584928558b"), name: "Anna" },
    { _id: ObjectId("65c342aba81085584928558c"), name: "Maria" })
  ];
