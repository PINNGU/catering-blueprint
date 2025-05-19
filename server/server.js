require('dotenv').config();
const express = require('express')
const cors = require('cors')
const { MongoClient, ObjectId } = require('mongodb');
const { router: adminRoutes, setAdminCollection } = require('./routes/adminRoutes');
const cookieParser = require('cookie-parser');





const app = express();
app.use(cookieParser());
app.use(cors());
app.use(express.json());


const client = new MongoClient(process.env.MONGO_URI)
let menuCollection;
let adminCollection;

async function connectDB() {
    await client.connect();
    const db = client.db('catering');
    menuCollection = db.collection('menuItems')
    todaysMenuCollection = db.collection('todaysMenu');
    adminCollection = db.collection('admin-users');

    setAdminCollection(adminCollection);

    console.log('db connected');


}

connectDB().catch(console.error);

app.use('/api/admin', adminRoutes);



app.get("/api/menu", async(req, res) => {
    try {
        if (!menuCollection) throw new Error('Database not connected');
        const items = await menuCollection.find().toArray();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch menu items' });
    }
});

app.get("/api/todaysMenu", async(req, res) => {
    try {
        if (!menuCollection) throw new Error('Database not connected');
        const items = await todaysMenuCollection.find().toArray();
        res.json(items);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to fetch todays menu items' });
    }
});



const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));