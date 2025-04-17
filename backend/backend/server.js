const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Data storage path
const dataPath = path.join(__dirname, 'data');
const plantsFilePath = path.join(dataPath, 'plants.json');

// Ensure data directory exists
if (!fs.existsSync(dataPath)) {
  fs.mkdirSync(dataPath);
}

// Initialize plants data file if it doesn't exist
if (!fs.existsSync(plantsFilePath)) {
  const initialData = {
    plants: [
      {
        id: 1,
        name: 'Monstera Deliciosa',
        species: 'Monstera',
        image: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        wateringFrequency: 7,
        sunlight: 'partial',
        lastWatered: new Date().toISOString(),
        health: 'good',
        notes: 'Thriving in the living room corner.'
      },
      {
        id: 2,
        name: 'Peace Lily',
        species: 'Spathiphyllum',
        image: 'https://images.unsplash.com/photo-1593482892290-f54927ae2b7a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=764&q=80',
        wateringFrequency: 5,
        sunlight: 'shade',
        lastWatered: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        health: 'average',
        notes: 'Needs more water during summer.'
      }
    ]
  };
  fs.writeFileSync(plantsFilePath, JSON.stringify(initialData, null, 2));
}

// Helper function to read plants data
const getPlantsData = () => {
  const jsonData = fs.readFileSync(plantsFilePath);
  return JSON.parse(jsonData);
};

// Helper function to write plants data
const savePlantsData = (data) => {
  fs.writeFileSync(plantsFilePath, JSON.stringify(data, null, 2));
};

// Routes
// GET all plants
app.get('/api/plants', (req, res) => {
  try {
    const data = getPlantsData();
    res.json(data.plants);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving plants', error: error.message });
  }
});

// GET a single plant by ID
app.get('/api/plants/:id', (req, res) => {
  try {
    const data = getPlantsData();
    const plant = data.plants.find(p => p.id === parseInt(req.params.id));
    
    if (!plant) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    res.json(plant);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving plant', error: error.message });
  }
});

// POST a new plant
app.post('/api/plants', (req, res) => {
  try {
    const data = getPlantsData();
    const newPlant = {
      id: data.plants.length > 0 ? Math.max(...data.plants.map(p => p.id)) + 1 : 1,
      name: req.body.name,
      species: req.body.species,
      image: req.body.image || 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b',
      wateringFrequency: req.body.wateringFrequency || 7,
      sunlight: req.body.sunlight || 'partial',
      lastWatered: new Date().toISOString(),
      health: req.body.health || 'good',
      notes: req.body.notes || ''
    };
    
    data.plants.push(newPlant);
    savePlantsData(data);
    
    res.status(201).json(newPlant);
  } catch (error) {
    res.status(500).json({ message: 'Error creating plant', error: error.message });
  }
});

// PUT (update) a plant
app.put('/api/plants/:id', (req, res) => {
  try {
    const data = getPlantsData();
    const plantIndex = data.plants.findIndex(p => p.id === parseInt(req.params.id));
    
    if (plantIndex === -1) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    const updatedPlant = {
      ...data.plants[plantIndex],
      ...req.body,
      id: parseInt(req.params.id) // Ensure ID doesn't change
    };
    
    data.plants[plantIndex] = updatedPlant;
    savePlantsData(data);
    
    res.json(updatedPlant);
  } catch (error) {
    res.status(500).json({ message: 'Error updating plant', error: error.message });
  }
});

// PATCH - update plant watering status
app.patch('/api/plants/:id/water', (req, res) => {
  try {
    const data = getPlantsData();
    const plantIndex = data.plants.findIndex(p => p.id === parseInt(req.params.id));
    
    if (plantIndex === -1) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    data.plants[plantIndex].lastWatered = new Date().toISOString();
    savePlantsData(data);
    
    res.json(data.plants[plantIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Error watering plant', error: error.message });
  }
});

// DELETE a plant
app.delete('/api/plants/:id', (req, res) => {
  try {
    const data = getPlantsData();
    const plantIndex = data.plants.findIndex(p => p.id === parseInt(req.params.id));
    
    if (plantIndex === -1) {
      return res.status(404).json({ message: 'Plant not found' });
    }
    
    data.plants.splice(plantIndex, 1);
    savePlantsData(data);
    
    res.json({ message: 'Plant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting plant', error: error.message });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
