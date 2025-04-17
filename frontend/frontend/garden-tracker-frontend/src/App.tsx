import React, { useState, useEffect } from 'react';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import PlantCard from './components/plants/PlantCard';
import PlantForm from './components/plants/PlantForm';
import usePlants from './hooks/usePlants';

function App() {
  const { plants, loading, error, addPlant, waterPlant, deletePlant } = usePlants();
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleAddPlant = (plantData) => {
    addPlant(plantData)
      .then(() => {
        setShowAddForm(false);
      })
      .catch(err => {
        console.error("Failed to add plant:", err);
      });
  };

  const handleWaterPlant = (id) => {
    waterPlant(id)
      .catch(err => {
        console.error("Failed to water plant:", err);
      });
  };

  const filteredPlants = plants.filter(plant => 
    plant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
    plant.species.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Format the lastWatered date to a readable format
  const formatLastWatered = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) {
      return 'Today';
    } else if (diffDays === 1) {
      return 'Yesterday';
    } else {
      return `${diffDays} days ago`;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-garden-background">
      <Navbar />
      
      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-garden-leaf-dark mb-4">
            Welcome to GardenTracker
          </h1>
          <p className="text-xl text-garden-text-light max-w-2xl mx-auto">
            Track and maintain your plants with ease. Add your plants, monitor their health, and never forget to water them again.
          </p>
        </section>
        
        {/* Loading and Error States */}
        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-garden-leaf"></div>
            <p className="mt-2 text-garden-text-light">Loading plants...</p>
          </div>
        )}
        
        {error && (
          <div className="bg-garden-rose bg-opacity-10 border border-garden-rose text-garden-soil-dark p-4 rounded-md mb-8">
            <p>Error loading plants: {error}</p>
            <p>Please make sure the backend server is running.</p>
          </div>
        )}
        
        {/* Search and Add Section */}
        <section className="mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative w-full md:w-1/2">
              <input
                type="text"
                placeholder="Search your plants..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-garden-border rounded-full focus:outline-none focus:ring-2 focus:ring-garden-leaf"
              />
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-garden-text-light" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-garden-leaf text-white px-6 py-2 rounded-full hover:bg-garden-leaf-dark transition-colors flex items-center"
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 mr-2" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              {showAddForm ? 'Cancel' : 'Add Plant'}
            </button>
          </div>
        </section>
        
        {/* Add Plant Form */}
        {showAddForm && (
          <section className="mb-12">
            <PlantForm onSubmit={handleAddPlant} />
          </section>
        )}
        
        {/* Plants Grid */}
        <section>
          <h2 className="text-2xl font-bold text-garden-leaf-dark mb-6">
            {searchTerm ? 'Search Results' : 'Your Plants'}
          </h2>
          
          {!loading && filteredPlants.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-garden-text-light text-lg">
                {searchTerm ? 'No plants found matching your search.' : 'You have no plants yet. Add your first plant!'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredPlants.map(plant => (
                <div key={plant.id} className="relative">
                  <PlantCard
                    name={plant.name}
                    species={plant.species}
                    image={plant.image}
                    lastWatered={formatLastWatered(plant.lastWatered)}
                    health={plant.health}
                  />
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button 
                      onClick={() => handleWaterPlant(plant.id)}
                      className="bg-garden-mint text-garden-leaf-dark p-2 rounded-full hover:bg-garden-sprout transition-colors"
                      title="Water plant"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                      </svg>
                    </button>
                    <button 
                      onClick={() => deletePlant(plant.id)}
                      className="bg-garden-rose text-white p-2 rounded-full hover:bg-red-600 transition-colors"
                      title="Delete plant"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;
