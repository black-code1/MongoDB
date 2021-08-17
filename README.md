# MongoDB Operations

## Create Database

`use shop` - > shop is the db name

## Show Database

`show dbs` - > show available database

## Create New Collection & insert one new product

`db.products.insertOne({name: "A Book", price: 12.99})` - > products is the collection name

`db.products.insertOne({name: "A T-Shirts", price: 29.99, description: "This is a high quality T-Shirts."})` - > products with different scheme

`db.products.insertOne({name: "A Computer", price: 1229.99, description: "A high quality Computer.", details: {cpu: "Intel i7 8770", memory: 32}})` - > products with embedde document

## Find all the data in a collection

`db.products.find()` - > products is the collection name

`db.products.find().pretty()` - > output data in a pretty way

# CRUD Operations & MongoDB

## Create
  
  `insertOne(data, options)` - > insert one document
  ---
  ```
  db.flightData.insertOne(
    {
      "departureAirport": "MUC", 
      "arrivalAirport": "SFO", 
      "aircraft": "Airbus A380", 
      "distance": 12000, 
      "intercontinental": true
    })

  ```
  ---
  `insertMany(data, options)` - > insert one document
  ---

  ``` 
    db.flightData.insertMany([
     {
       "departureAirport": "MUC",
       "arrivalAirport": "SFO",
       "aircraft": "Airbus A380",
       "distance": 12000,
       "intercontinental": true
     },
     {
       "departureAirport": "LHR",
       "arrivalAirport": "TXL",
       "aircraft": "Airbus A320",
       "distance": 950,
       "intercontinental": false
     }
   ])
```

## Read

  `find(filter, options)` - > finds all matching documents
  ---
  `db.flightData.find({intercontinental: true})` - > output truthy intercontinental

  `db.flightData.find({distance: {$gt: 10000}}).pretty()` - > output distance greater than 10000
  ---

  `findOne(filter, options)` - > find first matching document
  ---
  `db.flightData.findOne({distance: {$gt: 900}})`

  ---
  `db.passengers.find().toArray()` - > return an array

  ---
  - > Find doesn't give you all the document even though it looks like it did it instead give you a cursor - pretty() only exist in cursor, we get the cursor instead with find method and not the document immediately

  - > insert , update and delete are method on which cursor do not exist because these method don't  fetch data, they manipulate data instead

## Update

  `updateOne(filter, data, options)` - > changing one piece of data - recommended

  ---
  `db.flightData.updateOne({distance: 12000}, {$set: {marker: "delete"}})` - > if marker exist then update else add

  `db.flightData.update({_id: ObjectId("611781b08b5fa53136acc056")}, {$set: {delayed: false}})`
  
  `db.flightData.updateOne({_id: ObjectId("611781b08b5fa53136acc056")}, {$set: {delayed: true}})`
  
  `db.flightData.update({_id: ObjectId("611781b08b5fa53136acc056")},  {delayed: false})` - > Overwrote all the other key-value paired
  ---
  
  `updateMany(filter, data, options)` - > changing many documents - recommended
  
   ---
  
  `db.flightData.updateMany({}, {$set: {marker: "toDelete"}})` - > updateMany example documents
  
  ---
  
  `replaceOne(filter, data, options)` - > replace a document entirely with a new one

  ---

  ```
    db.flightData.replaceOne({_id: ObjectId("611781b08b5fa53136acc056")},{
       "departureAirport": "MUC",
       "arrivalAirport": "SFO",
       "aircraft": "Airbus A380",
       "distance": 12000,
       "intercontinental": true
     })
  ```

## Delete

  `deleteOne(filter, options)` - > delete one document
  
  ---
  
  `db.flightData.deleteOne({departureAirport: "TXL"})` - > deleteOne example
  
  ---
  
  `deleteMany(filter, options)` - > delete many documents
  
  ---
  
  `db.flightData.deleteMany({marker: "toDelete"})` - > deleteMany example documents

  ## Projection

  `db.passengers.find({}, {name: 1}).pretty()` - > name is the field i wanna get - 1 means included in the data you are returning to me 

  ---

  `db.passengers.find({}, {name: 1, _id: 0}).pretty()` - > exclude _id it happens on the mongodb server before the result reach to you

  ## Embedded Documents & Arrays

  `db.flightData.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "1 hour ago"}}}`

  ---

  `db.flightData.updateMany({}, {$set: {status: {description: "on-time", lastUpdated: "1 hour ago", details: {responsible: "Ryan Stark"}}}})`

  ## Accessing Structured Data

  `db.passengers.findOne({name: "Albert Twostone"}).hobbies`

  `db.passengers.find({hobbies: "sports"})` - > query array, return the entire document containing the hobbies sports in the array of hobbies

  `db.flightData.find({"status.description": "on-time"})` - > get access to an embedded document status return all the document containing description on-time

  ---
  ```
  {
	"_id" : ObjectId("611781b08b5fa53136acc057"),
	"departureAirport" : "LHR",
	"arrivalAirport" : "TXL",
	"aircraft" : "Airbus A320",
	"distance" : 950,
	"intercontinental" : false,
	"status" : {
		"description" : "on-time",
		"lastUpdated" : "1 hour ago",
		"details" : {
			"responsible" : "Ryan Stark"
		}
	}

  ```
`db.flightData.find({"status.details.responsible": "Ryan Stark"}).pretty()`

## Summary

- > A Database holds multiple Collections where each Collection can then hold multiple Documents

- > find() returns a cursor, NOT a list of documents!

- > Use filters to find specific documents

- > Use filters and operators (e.g. $gt) to limit the number of documents you retrieve

- > Use projection to limit the set of fields you retrieve

`use databaseName` - `db.dropDatabase() or db.myCollection.drop()`  - > To delete database

# Schemas & Relations How to Structure Documents

## Data Types

- Text - > "Ryan"
- Boolean - > true or false
- Number - > Integer (int32) 55 or NumberLong (int64) 10000000000 or NumberDecimal 12.99
- ObjectId - > ObjectId("sfasd")
- ISODate - > ISODate("2018-09-09") 
- Timestamp - > Timestamp(11421532)
- Embedded Document - > {"a": {...}}
- Array - > {"b": [...]}

## Data Types in Action

```
db.companies.insertOne(
  {
    name: "Fresh Apples Inc", 
    isStartup: true, 
    employees: 33, 
    funding: 12345678901234567890, 
    details: {ceo: "Mark Super"}, 
    tags: [{title: "super"}, {title: "perfect"}], 
    foundingDate: new Date(), 
    insertedAt: new Timestamp()
    }
    )
```
---

```
    {
      "_id" : ObjectId("61191e648b5fa53136acc075"),
      "name" : "Fresh Apples Inc",
      "isStartup" : true,
      "employees" : 33,
      "funding" : 12345678901234567000,
      "details" : {
        "ceo" : "Mark Super"
      },
      "tags" : [
        {
          "title" : "super"
        },
        {
          "title" : "perfect"
        }
      ],
      "foundingDate" : ISODate("2021-08-15T14:02:12.239Z"),
      "insertedAt" : Timestamp(1629036132, 1)
    }

```
---

`db.stats()` - > output stat of the selected database

`db.numbers.insertOne({a: NumberInt(1)})`

`typeof db.numbers.findOne().a`

## Understanding Relations

- > Store related data either by Nested / Embedded Documents OR References

- Customers
  ```
  {
    userName: 'max',
    favBooks: ['id1', 'id2']
  }
  ```

- Books
  ```
  {
    _id: 'id1',
    name: 'Lord of the Rings 1'
  }
  ```

## One To One Relations - Embedded

- Patients collection

  ```
  db.patients.insertOne(
    {
      name: "Max", 
      age: 29, 
      diseaseSummary: "summary-max-1"
    })
  ```
  
- diseaseSummaries collection

  ```
  db.diseaseSummaries.insertOne(
    {
      _id: "summary-max-1", 
      disease: ["cold", "broken leg"]
    })
  ```

  `var dsid = db.patients.findOne().diseaseSummary` - `db.diseaseSummaries.findOne({_id: dsid})`

- > Better approche is to use embedded document for strong One to One relationship

  `db.patients.insertOne({name: "Max", age: 29, diseaseSummary: {diseases: ["cold", "broken leg"]}})`

## One To One - Using References

  `db.persons.insertOne({name: "Max", age: 29, salary: 3000})`
  `db.cars.insertOne({model: "BMW", price: 40000, owner: ObjectId("5b98d4654d01c52e1637a99b")})`

## One To Many Embedded

  `db.questionThreads.insertOne({creator: "Max", question: "How does that all work?", answers: [{text: "Like that."},{text: "Thanks!"}]})`

## One To Many - Using References

  `use cityData`

  `db.cities.insertOne({name: "New York City", coordinates: {lat: 21, lng: 55}})`

  `db.citizens.insertMany([{name: "Max Schwarzmueller", cityId: ObjectId("5b98d6b44d01c52e1637a99f")}, {name: "Manuel Lorenz", cityId: ObjectId("5b98d6b44d01c52e1637a99f")}])`

  ## Many To Many - Embedded

  - Reference way

  `db.products.insertOne({title: "A Book", price: 12.99})`

  `db.customers.insertOne({name: "Max", age: 29})`

  `db.customers.updateOne({}, {$set: {orders: [{productId: ObjectId("6119a0898b5fa53136acc082"), quantity: 2}]}})`

  - Embedded

  `db.customers.updateOne({}, {$set: {orders: [{title: "A Book", price: 12.99, quantity: 2}]}})`

  ## Many To Many - Using References

  `db.books.insertOne({name: "My favorite Book"})`

  `db.authors.insertMany([{name: "Max Schwarz", age: 29, address: {street: "Main"}}, {name: "Manuel Lor", age: 30, address: {stree: "Tree"}}])`

  `db.books.updateOne({}, {$set: {authors: [ObjectId("6119a5578b5fa53136acc085"), ObjectId("6119a5578b5fa53136acc086")]}})`

  ## Using lookUp() for Merging Reference Relations

  db.books.aggregate([{$lookup: {from: "authors", localField: "authors", foreignField: "_id", as: "creators"}}])

    - Results

    ```
    {
    "_id" : ObjectId("6119a4d38b5fa53136acc084"),
    "name" : "My favorite Book",
    "authors" : [
      ObjectId("6119a5578b5fa53136acc085"),
      ObjectId("6119a5578b5fa53136acc086")
    ],
    "creators" : [
      {
        "_id" : ObjectId("6119a5578b5fa53136acc085"),
        "name" : "Max Schwarz",
        "age" : 29,
        "address" : {
          "street" : "Main"
        }
      },
      {
        "_id" : ObjectId("6119a5578b5fa53136acc086"),
        "name" : "Manuel Lor",
        "age" : 30,
        "address" : {
          "stree" : "Tree"
        }
      }
    ]
  }

    ```

## Implementation

  `db.users.insertMany([{name: "Max Schwarzmueller", age: 29, email: "max@test.com"}, {name: "Manu Lorenz", age: 30, email: "manu@test.com"}])`

  `db.posts.insertOne({title: "My first Post!", text: "This is my first post, I hope you like it!", tags: ["new", "tech"], creator: ObjectId("6119ac358b5fa53136acc088"), comments: [{text: "I like this post!", author: ObjectId("6119ac358b5fa53136acc087")}]})`

## Adding Collection Doument Validation

- > the code is in the validation.js file

## Changing the Validation Action

  ```
      db.runCommand(collMod: "posts", db.createCollection("posts", {
      validator: {
        $jsonSchema: {
          bsonType: "object",
          required: ["title", "text", "creator", "comments"],
          properties: {
            title: {
              bsonType: "string",
              description: "must be a string and is requred"
            },
            text: {
              bsonType: "string",
              description: "must be a string and is requred"
            },
            creator: {
              bsonType: "objectId",
              description: "must be a string and is requred"
            },
            comments: {
              bsonType: "array",
              description: "must be a string and is requred",
              items: {
                bsonType: "object",
                required: ["text", "author"],
                properties: {
                  text: {
                    bsonType: "string",
                    description: "must be a string and is requred"
                  },
                  author: {
                    bsonType: "objectId",
                    description: "must be an onjectid and is requred"
                  }
                }
              }
            }
          }
        }
      }
    })) 
  ```
- > collMod - collection Modifier - the code is in the validation-2.js file

## Summary

- Use embedded documents if you got one-to-one or one-to-many relationships and no app or data size reason to split

- Use references if data amount/ size or application needs require it or for many-to-many relations