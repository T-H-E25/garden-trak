import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-garden-leaf-dark text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a9 9 0 0 0-9 9c0 4.17 2.84 7.67 6.69 8.69a.5.5 0 0 0 .62-.45V17.5c0-.23-.2-.41-.42-.38-1.7.25-2.09-.82-2.09-.82-.28-.7-.68-.89-.68-.89-.55-.38.04-.37.04-.37.61.04.93.63.93.63.54.92 1.42.66 1.77.5.05-.39.21-.66.38-.81-1.34-.15-2.75-.67-2.75-2.98 0-.66.23-1.2.62-1.62-.06-.15-.27-.76.06-1.58 0 0 .5-.16 1.65.62a5.8 5.8 0 0 1 1.5-.2c.51 0 1.03.07 1.5.2 1.14-.78 1.65-.62 1.65-.62.33.82.12 1.43.06 1.58.39.42.62.96.62 1.62 0 2.32-1.41 2.83-2.75 2.98.22.19.41.56.41 1.13v2.3c0 .26.22.45.49.41A9 9 0 0 0 21 11a9 9 0 0 0-9-9z"/>
          </svg>
          <span className="text-xl font-bold">GardenTracker</span>
        </div>
        <div className="hidden md:flex space-x-6">
          <a href="#" className="hover:text-garden-mint transition-colors">Home</a>
          <a href="#" className="hover:text-garden-mint transition-colors">My Plants</a>
          <a href="#" className="hover:text-garden-mint transition-colors">Add Plant</a>
          <a href="#" className="hover:text-garden-mint transition-colors">About</a>
        </div>
        <div className="md:hidden">
          <button className="focus:outline-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
