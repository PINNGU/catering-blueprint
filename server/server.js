require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const { MongoClient, ObjectId } = require('mongodb');
const { router: adminRoutes, setAdminCollection } = require('./routes/adminRoutes');
const verifyToken = require('./verifyToken');

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from public folder
const publicPath = path.join(__dirname, 'public');
if (!fs.existsSync(publicPath)) {
  fs.mkdirSync(publicPath);
}
app.use(express.static('public'));

// Multer setup for handling image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, publicPath);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`;
    cb(null, uniqueName);
  }
});
const upload = multer({ storage });

// MongoDB setup
const client = new MongoClient(process.env.MONGO_URI);
let menuCollection;
let adminCollection;
let todaysMenuCollection;

async function connectDB() {
  await client.connect();
  const db = client.db('catering');
  menuCollection = db.collection('menuItems');
  todaysMenuCollection = db.collection('todaysMenu');
  adminCollection = db.collection('admin-users');

  setAdminCollection(adminCollection);
  console.log('db connected');
}
connectDB().catch(console.error);

app.use('/api/admin', adminRoutes);

// === Upload image endpoint ===
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  const imagePath = `${req.protocol}://${req.get('host')}/${req.file.filename}`;
  console.log('Image uploaded:', imagePath);
  res.status(200).json({ imagePath });

});

// === Fetch full menu ===
app.get('/api/menu', async (req, res) => {
  try {
    if (!menuCollection) throw new Error('Database not connected');
    const items = await menuCollection.find().toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu items' });
  }
});

// === Fetch today's menu ===
app.get('/api/todaysMenu', async (req, res) => {
  try {
    if (!todaysMenuCollection) throw new Error('Database not connected');
    const items = await todaysMenuCollection.find().toArray();
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch todays menu items' });
  }
});

// === Update today's menu ===
app.post('/api/todaysMenu',verifyToken, async (req, res) => {
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
    console.error("Error updating today's menu:", err);
    res.status(500).json({ error: "Failed to update today's menu" });
  }
});

// === Add item to full menu ===
app.post('/api/menu',verifyToken ,async (req, res) => {
  try {
    const newItem = req.body;
    if (!newItem || !newItem.name) {
      return res.status(400).json({ error: 'Invalid item data' });
    }
    const result = await menuCollection.insertOne(newItem);
    res.status(201).json(result);
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ error: 'Failed to add item' });
  }
});

// === Delete item from full menu (and today's menu) ===
app.delete('/api/menu/:id',verifyToken, async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);

    const result = await menuCollection.deleteOne({ _id: objectId });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found in complete menu' });
    }

    await todaysMenuCollection.deleteOne({ _id: objectId });

    res.status(200).json({ message: 'Item deleted from complete menu and today\'s menu (if existed)' });
  } catch (err) {
    console.error('Error deleting item:', err);
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// === Delete item from today's menu only ===
app.delete('/api/todaysMenu/:id',verifyToken,async (req, res) => {
  try {
    const { id } = req.params;
    const objectId = new ObjectId(id);
    const result = await todaysMenuCollection.deleteOne({ _id: objectId });

    if (result.deletedCount === 0) {
      return res.status(404).json({ error: 'Item not found in today\'s menu' });
    }

    res.status(200).json({ message: 'Item deleted from today\'s menu' });
  } catch (err) {
    console.error("Error deleting item from today's menu:", err);
    res.status(500).json({ error: "Failed to delete item from today's menu" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
