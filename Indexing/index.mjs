db.contact.explain("executionStats").find({ "dob.age": { $gt: 60 } });
//it tells the execution time

// db.contact.createIndex({ "dob.age": 1 });

// here 1 for ascending and -1 for descending order

//after this again  run explain command to check index is used or not by checking time which will be less in milisecond comparetively
db.contact.explain("executionStats").find({ "dob.age": { $gt: 60 } });

db.contact.dropIndex({ "dob.age": 1 });
db.contact.explain("executionStats").find({ "dob.age": { $gt: 20 } }); //here in colsacn time will be less for value which not exists

//compound index
db.contact.createIndex({ "dob.age": 1, gender: 1 });

db.contact.explain().find({ "dob.age": 35 }); //index scan

db.contact.explain().find({ gender: "male" }); //collection scan

db.contact.explain().find({ "dob.age": 35 }).sort({ gender: 1 });
//it uses both age and gender for sorting with ixscan

contacts > db.contact.getIndexes();

//   { v: 2, key: { _id: 1 }, name: '_id_' }, //default index which it uses for sorting by default
//   {
//     v: 2,
//     key: { 'dob.age': 1, gender: 1 },
//         name: 'dob.age_1_gender_1'

db.contact.createIndex({ email: 1 }, { unique: true }); // will give error as same email exists

db.contact.createIndex(
  { "dob.age": 1 },
  { partailFilterExpression: { gender: "male" } }
);
//create an index on age, not on gender but on age but only for elements where the underlying document is for a male.
// this is used to filter out unwanted documents while querying

//other for same field
db.contact.createIndex(
  { "dob.age": 1 },
  { partailFilterExpression: { "dob.age": { $gt: 60 } } }
);

db.contact.find({ "dob.age": { $gt: 60 } }).pretty();
// this will include female also
db.contact.find({ "dob.age": { $gt: 60 }, gender: "male" }).pretty(); //ixscan

db.contact.insertOne({
  name: "Max",
  hobbies: ["Cooking", "Sports"],
  addressses: [{ street: "Main street" }, { second: "Second street" }],
});

db.contact.createIndex({ addressses: 1 });

db.contact
  .explain("executionStats")
  .find({ "addressses.street": "Main Street" }); //collscan

//   winningPlan: {
//       stage: 'COLLSCAN',
//       filter: { 'addressses.street': { '$eq': 'Main Street' } },
//       direction: 'forward'
//     },  it is showing collscan as it can access array inside array

db.contact
  .explain("executionStats")
  .find({ addressses: { street: "Main Street" } }); //ixscan

// winningPlan: {
//       stage: 'FETCH',
//       inputStage: {
//         stage: 'IXSCAN',
//         keyPattern: { addressses: 1 },
//         indexName: 'addressses_1',
//         isMultiKey: true,
//         multiKeyPaths: { addressses: [ 'addressses' ] },
//         isUnique: false,
//         isSparse: false,
//         isPartial: false,
//         indexVersion: 2,
//         direction: 'forward',
//         indexBounds: {
//           addressses: [ '[{ street: "Main Street" }, { street: "Main Street" }]' ]
//         }
//       }
//     },

db.contact.createIndex({ "addressses.street": 1 });

db.contact
  .explain("executionStats")
  .find({ "addressses.street": "Main Street" });

//  winningPlan: {d: 0
//       stage: 'FETCH',
//       inputStage: {
//         stage: 'IXSCAN',
//         keyPattern: { 'addressses.street': 1 },
//         indexName: 'addressses.street_1',
//         isMultiKey: true, { street: 'Main Street' } },
//         multiKeyPaths: { 'addressses.street': [ 'addressses' ] },

db.contact.createIndex({ addressses: 1, hobbies: 1 });
// MongoServerError: Index build failed: ad570f88-52b6-46cc-aee6-9b055d620451: Collection contacts.contact ( 8adf540f-e9b9-4815-af4f-1538fae7dbfd ) :: caused by :: cannot index parallel arrays [hobbies] [addressses]

db.products.insertMany([
  {
    title: "A book",
    description: "This is an awesome book about young artist",
  },
  {
    title: "Red T-Shirt",
    description: "This T-shirt is red and pretty awesome",
  },
]);

db.products.createIndex({ description: "text" });
//This will create a text index which is a special kind of index where mongodb will go ahead and as I mentioned, remove all the stop words and store all the keywords in an array essentially,

db.products.find({ $text: { $search: "awesome" } }).pretty();

db.products.find({ $text: { $search: '"awesome book"' } }).pretty();

db.products
  .find(
    { $text: { $search: "awesome t-shirt" } },
    { score: { $meta: "textScore" } }
  )
  .sort({ score: { $meta: "textScore" } })
  .pretty();

db.products.dropIndex("description_text");

db.products.createIndex({ title: "text", description: "text" });

db.products.insertOne({ title: "A Ship", description: "Floats Perfectly!" });

db.products.find({ $text: { $search: "ship" } });

db.products.getIndexes();

db.products.dropIndex("title_text_description_text");

db.products.createIndex(
  { title: "text", description: "text" },
  { default_language: "english" }
);

db.products.dropIndex("title_text_description_text");

db.products.createIndex(
  { title: "text", description: "text" },
  { default_language: "english", weights: { title: 1, description: 10 } }
);
//So we could have title 1, description 10 and now description would be worth 10 times as much as title or would weigh in 10 times as much.

db.products.find(
  { $text: { $search: "red" } },
  { score: { $meta: "textScore" } }
);
