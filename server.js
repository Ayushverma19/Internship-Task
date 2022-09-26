const express = require('express');
const app = express();

const fs = require("fs");

app.use(express.json());
// STEP 1: Reading JSON file


const MongoClient = require('mongodb').MongoClient;


var db
MongoClient.connect('mongodb+srv://yoayu:1234@cluster0.xl9vdio.mongodb.net/test', (err, client) => { //Here I Connect the Mongodb DataBase , by online cloud MongoDb Atlas
    if (err)
        return console.log(err);
    //console.log(client)
    db = client.db('Status');
    app.listen(3000, () => {
        console.log('server is working');
    })

})


var jarray = [];

app.get('/', async(req, res) => {
    res.sendFile(__dirname + '/index.html'); //.send() method on the res object forwards any data passed as an argument  to the client-side.
    const users = db.collection("User");
    const Total_users = await users.estimatedDocumentCount();
    console.log(`No Of Users :${Total_users}`)



    let currentDate = new Date();

    // Getting full month name (e.g. "June")
    let m = currentDate.getMonth() + 1
    let y = currentDate.getFullYear()
    const sort = { month_dig: -1 }

    db.collection('Revenue').find({ month_dig: { $lt: m }, Year: { $lte: y } }, { _id: 0 }).sort(sort).toArray((err, result) => { // Here I was take all the past Month revenue from the expect current   month
        if (err) return console.log(err);

        console.log("Past Revenue Recieved By Month : ")
            //console.log(result);


        for (var product in result) {
            const item = {
                "month": result[product].month,
                "Total Amount": result[product].TA
            };
            //console.log(item);
            jarray.push(item);



        }
        console.log(jarray);

    })

})