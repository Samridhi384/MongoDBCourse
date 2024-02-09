//authentication and authorization

mongod - auth;

// use admin;

db.createUser({
  user: "samridhi",
  pwd: "samridhi",
  roles: ["userAdminAnyDatabase"],
});

db.auth("samridhi", "samridhi");

//  use admin

//   show dbs
//   show collections

//Clusters are essentially constructs where you have multiple mongodb servers working together

//MongoDB grants access to data and commands through role-based authorization and provides built-in roles that provide the different levels of access commonly needed in a database system.

//A role grants privileges to perform sets of actions on defined resources. Roles define the level of access that a user has in MongoDB.

//mongo -u max -p max //not working

// mongo -u max -p max --authenticationDatabase admin

//use shop

db.createUser({ user: "appdev", pwd: "dev", roles: ["readWrite"] });

db.auth("appdev", "dev");

db.products.insertOne({ name: "Book" });

db.logout();

db.updateUser("appdev", {
  roles: ["readWrite", { role: "readWrite", db: "blog" }],
});

db.getUser("appdev");

// use blog

db.posts.insertOne({ title: "this works!" });

db.createUser({
  user: "globalAdmin",
  pwd: "admin",
  roles: ["dbAdminAnyDatabase"],
});

//how to generate ssl certificate
//https://stackoverflow.com/questions/10175812/how-to-generate-a-self-signed-ssl-certificate-using-openssl
//SSL/TLS protocols allow the connection between two mediums (client-server) to be encrypted.
