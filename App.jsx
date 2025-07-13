import React from 'react';
import PhilippineMap from './components/PhilippineMap';
import { ThemeProvider } from './contexts/ThemeContext';
import './App.css';

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <PhilippineMap />
      </div>
    </ThemeProvider>
  );
}

export default App;

