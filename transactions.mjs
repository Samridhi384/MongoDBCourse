// mongosh "mongodb+srv://mongodb1.vwvlvg1.mongodb.net/" --apiVersion 1 --username samridhi

// Atlas atlas-x1w3x1-shard-0 [primary] products> db.products.insertOne({title : "a cup"})

// Atlas atlas-x1w3x1-shard-0 [primary] products> db.post.insertMany([{title : "first post" , userId : ObjectId('65c357e254d64500a03dd939')},{title : "second post" , userId : ObjectId('65c357e254d64500a03dd939')}])

const session = db.getMongo().startSession();

const userCol1 = session.getDatabase("products").products;

const postCol1 = session.getDatabase("products").post;
session.startTransaction();

userCol1.deleteOne({ _id: ObjectId("65c357e254d64500a03dd939") });

postCol1.deleteMany({ userId: ObjectId("65c357e254d64500a03dd939") });

session.commitTransaction();

db.products.find();
db.post.find();
