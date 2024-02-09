// read operation

// findOne will give document and not the whole cursor

db.movies.find({genres : ["Drama"]}).pretty().limit(5)

db.movies.find({runtime : {$nin : [30,42]}}).pretty()

 db.movies.find({"rating.average" : {$lt : 5}}).count()

  db.movies.find({$or: [{"rating.average" : {$lt : 5}},{"rating.average" : {$gt : 9.3}}]}).pretty()
  db.movies.find({$nor: [{"rating.average" : {$lt : 5}},{"rating.average" : {$gt : 9.3}}]}).pretty()


//and 
 db.movies.find({genres : "Drama" , "rating.average" : {$gt : 9}}).count()

db.movies.find({$and: [{genres : "Drama"},{"rating.average" : {$gt : 9}}]}).count()

// Default mongodb filter all the conditions
 db.movies.find({ "rating.average": { $gt: 9 }, genres: "Drama" }).count(); // 3

//  This will not work in all drivers coz in JS, repeat names in same objects is not permitted
 db.movies.find({genres: "Drama", genres: "Horror"}).count() // 23
  db.movies.find({ genres: "Horror" }).count(); // 23

// So u can work with $and
 db.movies.find({$and: [{ genres: "Drama"}, {genres: "Horror" }]}).count(); // 17

 db.movies.find({ runtime: { $not: { $eq: 60 } } }).count(); // 70
 
 db.movies.find({ runtime: { $ne: 60 } }).count(); // 70

 //exists
 db.users.find({age : {$exists : true , $gte : 18} } )

 db.users.find({age : {$exists : true} } )

 db.users.find({age : {$exists : true , $ne : null} } )

 //type
 db.users.find({phone : {$type : "number"}})
 
  db.users.find({phone : {$type : ["number","double"]}})


//evaluation operator
//regex 
db.movies.find({summary : {$regex : /musical/ } })

//expr 
 db.sales.find({$expr : {$gt : ["$volume" , "$target"] } }).pretty()

 //with a condition 
db.sales.find({$expr : {$gt : [{$cond : {if : {$gte : ["$volume" , 190]} , then: {$subtract: ["$volume" , 30]} , else : "$volume"}} , "$target"]}}).pretty()

//array query selector
//$size = looks for exact match
db.users.find({hobbies : {$size : 3} })

//$all matches without considering order
 db.movieStarts.find({genre: {$all : ["action" ,"thriller"]}}).pretty()

//$elemMatch  = to match partivular element
 db.users.find({$and : [{"hobbies.title" : "cooking"},{"hobbies.frequency" : {$gte : 3}}]}).pretty() 

db.users.find({hobbies : {$elemMatch : {title : "cooking" , frequency : {$gte : 7}}}}).pretty()

db.exmoviestarts.find({ratings: {$elemMatch : {$gt : 8 , $lt : 10}}}).pretty()

//cursors

const dataCursor = db.movieStarts.find();
dataCursor.next();

dataCursor.forEach((doc) => {
  printjson(doc);
});

 dataCursor.hasNext();

//sorting
 db.movies.find().sort({"rating.average"  : 1}).pretty() //ascending
 db.movies.find().sort({"rating.average"  : -1}).pretty() //descending

//pagination
  db.movies.find({},{rating:1 , runtime : 1}).sort({"rating.average"  : 1 , runtime : -1 }).skip(100).limit(5).pretty()

//projections

db.movies.find({},{rating:1 , runtime : 1 , name :1 , genres:1 , "schedule.time" : 1, _id :0}).pretty()


//projections in array
db.movies.find({genres : "Drama"},{"genres.$":1}).pretty()

db.movies.find({genres : {$all : ["Drama","Horror"]}},{"genres.$":1}).pretty()

//slice 
db.movies.find({"rating.average" : {$gt :9}},{genres: {$slice : 2} , name :1}).pretty()

 db.movies.find({"rating.average" : {$gt :9}},{genres: {$slice : [1,2]} , name :1}).pretty()

// https://www.mongodb.com/docs/manual/reference/method/db.collection.find/#mongodb-method-db.collection.find