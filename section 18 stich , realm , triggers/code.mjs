//trigger

//create trigger in mongodb atlas

//database trigger
exports = async function (changeEvent) {
  console.log("new document inserted");
  console.log(`product's name is : ${changeEvent.fullDocument.name}`);
  console.log(`product's price is : ${changeEvent.fullDocument.price}`);
};

//scheduled trigger /
//does not affects with database operation
exports = function () {
  console.log("schedule trigger is running");
};
