const express = require('express')
const cors = require('cors')
const {MongoClient,ObjectId} = require('mongodb');

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI)
let menuCollection;

async function connectDB(){
    await client.connect();
    const db = client.db('catering');
    menuCollection = db.collection('menu')
    console.log('db connected')

}

connectDB().catch(console.error);




app.get("/api/menu",async(req,res) => {
    const items = await menuCollection.find().toArray();
    res.json(items)
});



const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

