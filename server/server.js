require('dotenv').config();
const express = require('express')
const cors = require('cors')
const {MongoClient,ObjectId} = require('mongodb');
const { router: adminRoutes, setAdminCollection } = require('./routes/adminRoutes');



const app = express();
app.use(cors());
app.use(express.json());

const client = new MongoClient(process.env.MONGO_URI)
let menuCollection;
let adminCollection;

async function connectDB(){
    await client.connect();
    const db = client.db('catering');
    menuCollection = db.collection('menu');
    adminCollection = db.collection('admin-users');

    setAdminCollection(adminCollection);

    console.log('db connected');


}

connectDB().catch(console.error);

app.use('/api/admin', adminRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

