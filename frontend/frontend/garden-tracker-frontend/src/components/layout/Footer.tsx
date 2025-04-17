import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-garden-leaf-dark text-white p-6 mt-auto">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <h3 className="text-xl font-bold mb-2">GardenTracker</h3>
            <p className="text-garden-mint">Track and maintain your plants with ease</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8">
            <div>
              <h4 className="font-semibold mb-2">Quick Links</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-garden-mint transition-colors">Home</a></li>
                <li><a href="#" className="hover:text-garden-mint transition-colors">My Plants</a></li>
                <li><a href="#" className="hover:text-garden-mint transition-colors">Add Plant</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Resources</h4>
              <ul className="space-y-1">
                <li><a href="#" className="hover:text-garden-mint transition-colors">Plant Care Tips</a></li>
                <li><a href="#" className="hover:text-garden-mint transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-garden-mint transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
        </div>
        <div className="border-t border-garden-leaf-light mt-6 pt-6 text-center">
          <p>&copy; {new Date().getFullYear()} GardenTracker. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
