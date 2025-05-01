import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-5xl mx-auto px-4 py-6 flex items-center">
        <div className="flex items-center">
          <svg
            className="h-10 w-10 text-primary"
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
          </svg>
          <div className="ml-3">
            <h1 className="text-2xl font-bold text-gray-900">RhinoplastyAI</h1>
            <p className="text-sm text-gray-500">Visualize your rhinoplasty results using AI</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 