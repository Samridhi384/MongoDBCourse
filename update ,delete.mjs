//update

db.persons.updateOne(
  { name: "Manuel" },
  { $inc: { age: 1 } },
  { $set: { isSporty: false } }
); //INCREMENT AND FOR  DECREMENT WE CAN USE AGE : -1

min;
db.persons.updateOne({ name: "Chris" }, { $min: { age: 34 } });
// here age is 35 in db so, for min less than 35 value will work

max;
db.persons.updateOne({ name: "Chris" }, { $max: { age: 38 } });

mul; //multiply
db.persons.updateOne({ name: "Chris" }, { $mul: { age: 1.1 } });

// unset the field
db.persons.updateMany({ isSporty: true }, { $unset: { phone: " " } });

// rename the field
db.persons.updateMany({}, { $rename: { age: "totalAge" } });

upsert(update + insert);
db.users.updateOne(
  { name: "Maria" },
  {
    $set: {
      age: 29,
      hobbies: [{ title: "Sleeping", frequency: 9 }],
      isSporty: true,
    },
  },
  { upsert: true }
);

// updating array elements
db.persons.updateMany(
  { hobbies: { $elemMatch: { title: "Sports", frequency: { $gte: 3 } } } },
  { $set: { "hobbies.$.highFrequency": true } }
);

// updating all array elements

db.persons.updateMany(
  { totalAge: { $gt: 30 } },
  { $inc: { "hobbies.$[].frequency": -1 } }
);
// here $[] is used as for each sort of

//update specific field

db.persons.updateMany(
  { "hobbies.frequency": { $gt: 2 } },
  { $set: { "hobbies.$[el].goodFrequency": true } },
  { arrayFilters: [{ "el.frequency": { $gt: 2 } }] }
);

//adding new field
db.users.updateOne(
  { name: "Maria" },
  { $push: { hobbies: { title: "Sports", frequency: 2 } } }
);

//adding multiple fields
db.users.updateOne(
  { name: "Maria" },
  {
    $push: {
      hobbies: {
        $each: [
          { title: "Good wine", frequency: 1 },
          { title: "Sleeping", frequency: 2 },
        ],
        $sort: { frequency: -1 },
      },
    },
  }
);

//remove the elements
db.users.updateOne(
  { name: "Maria" },
  { $pull: { hobbies: { title: "Sleeping" } } }
);

// remove last element of array
db.persons.updateOne({ name: "Chris" }, { $pop: { hobbies: 1 } });

// remove first elemnet of array
db.persons.updateOne({ name: "Chris" }, { $pop: { hobbies: -1 } });

addToSet;
db.users.updateOne(
  { name: "Maria" },
  { $addToSet: { hobbies: { title: "Sleeping", frequency: 5 } } }
);

// difference between push and addToSet is in addToSet we can not add again element  which already exists in an array while in push we can .

//delete one and deleteMany
db.persons.deleteOne({ name: "Anna" });

db.users.deleteMany({ totalAge: { $exists: false }, isSporty: true });

db.persons.deleteMany({});

db.persons.drop(); //deletes whole collection
