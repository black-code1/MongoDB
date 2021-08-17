// Adding Collection Document Validation
db.createCollection("posts", {
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
})