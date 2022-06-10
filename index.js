const express = require('express')
const cors = require('cors');
const app = express();
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;
require("dotenv").config();
const port = process.env.PORT || 5000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

//use middleware
app.use(cors());
app.use(express.json());

// user: monirhossain
// pass: Zr26hCOkpiKRfOQK
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@my-portfolio.upvya.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run (){
    try{
        await client.connect();
        const projectsCollection = client.db("data").collection("projects");
        //All Get Api
        app.get('/projects', async (req, res)=> {
            const filter = {};
            const result = await projectsCollection.find(filter).toArray();
            res.send(result)
        })

        app.get('/project/:id', async (req, res)=> {
            const id = req.params.id;
            const filter = {_id: ObjectId(id)};
            const result = await projectsCollection.findOne(filter)
            res.send(result)
        })

    }
    finally{

    }
}
run().catch(console.dir)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})