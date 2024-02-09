// in comments output are there

//one to one
hospital >
  db.patients.insertOne({
    name: "Max",
    age: 29,
    diseaseSummary: "summary-max-1",
  });

hospital >
  db.diseaseSummaries.insertOne({
    _id: "summary-max-1",
    diseases: ["cold", "broken leg"],
  });

hospital > db.diseaseSummaries.findOne();

// { _id: 'summary-max-1', diseases: [ 'cold', 'broken leg' ] }

var dsid = db.patients.findOne().diseaseSummary;

dsid;
// summary-max-1
db.diseaseSummaries.findOne({ _id: dsid });
// { _id: 'summary-max-1', diseases: [ 'cold', 'broken leg' ] }

db.persons.insertOne({ name: "max", car: { model: "bmw", price: 40000 } });
// {
//   acknowledged: true,
//   insertedId: ObjectId('65b8808d4f2adc01b81bae92')
// }

carData > db.cars.insertOne({ owner: ObjectId("65b8808d4f2adc01b81bae92") });
// {
//   acknowledged: true,
//   insertedId: ObjectId('65b881604f2adc01b81bae93')
// }
carData > db.cars.find();
// [
//   {
//     _id: ObjectId('65b881604f2adc01b81bae93'),
//     owner: ObjectId('65b8808d4f2adc01b81bae92')
//   }
// ]
db.citizens.insertMany([
  { name: "max", cityId: ObjectId("65b886554f2adc01b81bae96") },
  { name: "sam", cityId: ObjectId("65b886554f2adc01b81bae96") },
]);

db.posts.insertOne({
  title: "My first post",
  text: "This is my 1st post!",
  tags: ["new", "tech"],
  creator: ObjectId("65b897a54f2adc01b81bae9f"),
  comments: [
    {
      text: "I like this post!",
      author: ObjectId("65b897a54f2adc01b81bae9e"),
    },
  ],
});
