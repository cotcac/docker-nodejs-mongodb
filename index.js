const express = require("express");
const app = express();
const assert = require('assert');
const MongoClient = require("mongodb").MongoClient;
const url = process.env.DB_URI;

// Use connect method to connect to the server
MongoClient.connect(url, function (err, client) {
  if(err) throw err;
  console.log("Connected successfully to server");
  const db = client.db();
  insertDocuments(db, function() {
    client.close();
  });
});


const insertDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 5}
  ], function(err, result) {
    if(err) throw err;
    assert.equal(err, null);
    assert.equal(3, result.result.n);
    assert.equal(3, result.ops.length);
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

app.get("/", (req, res) => {
  res.send(`
  Env: ${process.env.NODE_ENV} -
  DB: ${url} -
  Stage: ${process.env.STAGE} -
  it works.
  `);
});

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("Server running..."));
