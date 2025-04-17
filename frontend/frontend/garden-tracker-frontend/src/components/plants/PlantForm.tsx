import React from 'react';

interface PlantFormProps {
  onSubmit: (plantData: any) => void;
}

const PlantForm: React.FC<PlantFormProps> = ({ onSubmit }) => {
  const [plantData, setPlantData] = React.useState({
    name: '',
    species: '',
    image: '',
    wateringFrequency: '7',
    sunlight: 'partial',
    notes: '',
    health: 'good'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setPlantData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(plantData);
    // Reset form
    setPlantData({
      name: '',
      species: '',
      image: '',
      wateringFrequency: '7',
      sunlight: 'partial',
      notes: '',
      health: 'good'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-garden-leaf-dark mb-6">Add New Plant</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-garden-text font-medium mb-1">
                Plant Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={plantData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
                required
              />
            </div>
            
            <div>
              <label htmlFor="species" className="block text-garden-text font-medium mb-1">
                Species
              </label>
              <input
                type="text"
                id="species"
                name="species"
                value={plantData.species}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
              />
            </div>
            
            <div>
              <label htmlFor="image" className="block text-garden-text font-medium mb-1">
                Image URL
              </label>
              <input
                type="text"
                id="image"
                name="image"
                value={plantData.image}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
                placeholder="https://example.com/plant-image.jpg"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="wateringFrequency" className="block text-garden-text font-medium mb-1">
                Watering Frequency (days)
              </label>
              <input
                type="number"
                id="wateringFrequency"
                name="wateringFrequency"
                value={plantData.wateringFrequency}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
                min="1"
              />
            </div>
            
            <div>
              <label htmlFor="sunlight" className="block text-garden-text font-medium mb-1">
                Sunlight Needs
              </label>
              <select
                id="sunlight"
                name="sunlight"
                value={plantData.sunlight}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
              >
                <option value="full">Full Sun</option>
                <option value="partial">Partial Sun</option>
                <option value="shade">Shade</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="health" className="block text-garden-text font-medium mb-1">
                Plant Health
              </label>
              <select
                id="health"
                name="health"
                value={plantData.health}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
              >
                <option value="good">Good</option>
                <option value="average">Average</option>
                <option value="poor">Poor</option>
              </select>
            </div>
            
            <div>
              <label htmlFor="notes" className="block text-garden-text font-medium mb-1">
                Notes
              </label>
              <textarea
                id="notes"
                name="notes"
                value={plantData.notes}
                onChange={handleChange}
                rows={3}
                className="w-full px-4 py-2 border border-garden-border rounded-md focus:outline-none focus:ring-2 focus:ring-garden-leaf"
              ></textarea>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button
            type="button"
            onClick={() => onSubmit(null)}
            className="px-4 py-2 mr-2 border border-garden-leaf text-garden-leaf rounded-md hover:bg-garden-border transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-garden-leaf text-white rounded-md hover:bg-garden-leaf-dark transition-colors"
          >
            Add Plant
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlantForm;
