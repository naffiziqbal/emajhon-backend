const express = require('express');
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();

app.use(express.json())
app.use(cors());

const port = process.env.PORT || 5000;


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.zscbcon.mongodb.net/?retryWrites=true&w=majority`;
console.log(uri);
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{
       const database = client.db('emajhonData').collection('products');
        app.get('/products', async(req, res) => {
            const query = {}
            const cursor  = database.find(query);
            const count = await database.estimatedDocumentCount()
            const products = await cursor.toArray()
            res.send({count,products})
        })


    }
    finally{}

}
run().catch(err =>console.log(err))


app.get('/', (req, res)=>{
    res.send("Server Runnig")
})
app.listen(port,()=>{
    console.log(`Server Running On Port ${port}`);
    
})
