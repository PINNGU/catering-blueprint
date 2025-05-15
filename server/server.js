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
let todaysMenuCollection;



async function connectDB(){
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



app.get("/api/menu", async (req, res) => {
  try {
    if (!menuCollection) throw new Error('Database not connected');
    const items = await menuCollection.find().toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

app.get("/api/todaysMenu", async (req, res) => {
  try {
    if (!menuCollection) throw new Error('Database not connected');
    const items = await todaysMenuCollection.find().toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todays menu items' });
  }
});

app.post("/api/todaysMenu", async (req, res) => {
  try {
    if (!todaysMenuCollection) throw new Error('Database not connected');

    const newMenu = req.body;

    
    if (!Array.isArray(newMenu)) {
      return res.status(400).json({ error: 'Invalid data format' });
    }

    
    await todaysMenuCollection.deleteMany({});

    
    if (newMenu.length > 0) {
      await todaysMenuCollection.insertMany(newMenu);
    }

    res.status(200).json({ message: "Today's menu updated successfully" });
  } catch (err) {
    console.error('Error updating today\'s menu:', err);
    res.status(500).json({ error: 'Failed to update today\'s menu' });
  }
});




const PORT = process.env.PORT || 5000;
app.listen(PORT,() => console.log(`Server running on port ${PORT}`));

