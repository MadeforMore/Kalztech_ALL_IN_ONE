const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// MongoDB connection
let db;
const client = new MongoClient(process.env.MONGODB_URI);

async function connectToMongoDB() {
  try {
    await client.connect();
    db = client.db('taskdb');
    console.log('✅ Connected to MongoDB Atlas successfully!');
  } catch (error) {
    console.error('❌ MongoDB connection error:', error);
    process.exit(1);
  }
}

// Routes
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// Save data to database
app.post('/api/data', async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Name, email, and message are required' 
      });
    }

    const data = {
      name,
      email,
      message,
      timestamp: new Date(),
      id: Date.now().toString()
    };

    const result = await db.collection('userdata').insertOne(data);
    
    console.log('📝 Data saved to database:', data);
    
    res.json({ 
      success: true, 
      message: 'Data saved in database',
      id: result.insertedId 
    });
  } catch (error) {
    console.error('Database save error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to save data' 
    });
  }
});

// Get all data from database
app.get('/api/data', async (req, res) => {
  try {
    const data = await db.collection('userdata').find({}).toArray();
    res.json({ success: true, data });
  } catch (error) {
    console.error('Database fetch error:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch data' 
    });
  }
});

// Start server
async function startServer() {
  await connectToMongoDB();
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
}

startServer();