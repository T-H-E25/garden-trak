import React from 'react';

interface PlantCardProps {
  name: string;
  species: string;
  image: string;
  lastWatered: string;
  health: 'good' | 'average' | 'poor';
  onWater?: () => void;
  onDelete?: () => void;
}

const PlantCard: React.FC<PlantCardProps> = ({ 
  name, 
  species, 
  image, 
  lastWatered, 
  health,
  onWater,
  onDelete
}) => {
  const healthColors = {
    good: 'bg-garden-leaf-light',
    average: 'bg-garden-sunflower',
    poor: 'bg-garden-rose'
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform hover:scale-105">
      <div className="h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="text-xl font-semibold text-garden-text mb-1">{name}</h3>
        <p className="text-garden-text-light text-sm mb-3">{species}</p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-xs text-garden-text-light">Last Watered</span>
            <p className="text-garden-text">{lastWatered}</p>
          </div>
          <div>
            <span className="text-xs text-garden-text-light">Health</span>
            <div className={`w-4 h-4 rounded-full mt-1 ${healthColors[health]}`}></div>
          </div>
        </div>
        
        <div className="flex justify-between mt-4">
          <button 
            className="bg-garden-leaf text-white px-3 py-1 rounded-md text-sm hover:bg-garden-leaf-dark transition-colors"
          >
            Details
          </button>
          <button 
            onClick={onWater}
            className="bg-garden-mint text-garden-leaf-dark px-3 py-1 rounded-md text-sm hover:bg-garden-sprout transition-colors"
          >
            Water
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
