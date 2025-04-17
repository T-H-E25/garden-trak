import React from 'react';

const API_URL = 'http://5000-i2dqqifcox1jytcgknwhk-b88f976f.manus.computer/api';

export const usePlants = () => {
  const [plants, setPlants] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState(null);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/plants`);
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const data = await response.json();
      setPlants(data);
      setError(null);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plants:', err);
    } finally {
      setLoading(false);
    }
  };

  const addPlant = async (plantData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/plants`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const newPlant = await response.json();
      setPlants([...plants, newPlant]);
      return newPlant;
    } catch (err) {
      setError(err.message);
      console.error('Error adding plant:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updatePlant = async (id, plantData) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/plants/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(plantData),
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const updatedPlant = await response.json();
      setPlants(plants.map(plant => plant.id === id ? updatedPlant : plant));
      return updatedPlant;
    } catch (err) {
      setError(err.message);
      console.error('Error updating plant:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const waterPlant = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/plants/${id}/water`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      const updatedPlant = await response.json();
      setPlants(plants.map(plant => plant.id === id ? updatedPlant : plant));
      return updatedPlant;
    } catch (err) {
      setError(err.message);
      console.error('Error watering plant:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deletePlant = async (id) => {
    try {
      setLoading(true);
      const response = await fetch(`${API_URL}/plants/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }
      
      setPlants(plants.filter(plant => plant.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Error deleting plant:', err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    fetchPlants();
  }, []);

  return {
    plants,
    loading,
    error,
    fetchPlants,
    addPlant,
    updatePlant,
    waterPlant,
    deletePlant
  };
};

export default usePlants;
