import React, { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Moon, Sun } from 'lucide-react';
import AthleteProfile from './AthleteProfile';
import ProvinceModal from './ProvinceModal';
import AthleteRegistration from './AthleteRegistration';
import PurchaseModal from './PurchaseModal';
import mapSvg from '../assets/Provinces_of_the_Philippines.svg';
import provinceData from '../data/provinceData';
import { useTheme } from '../contexts/ThemeContext';

// Get all athletes from province data
const getAllAthletes = () => {
  const athletes = [];
  Object.values(provinceData).forEach(province => {
    if (province.athletes && province.athletes.length > 0) {
      athletes.push(...province.athletes);
    }
  });
  return athletes;
};

const PhilippineMap = () => {
  const { theme, toggleTheme, isDark } = useTheme();
  const [selectedAthlete, setSelectedAthlete] = useState(null);
  const [selectedProvince, setSelectedProvince] = useState(null);
  const [showRegistration, setShowRegistration] = useState(false);
  const [showPurchase, setShowPurchase] = useState(null);
  const [athletes, setAthletes] = useState(getAllAthletes());
  const [purchases, setPurchases] = useState([]);
  const [tooltip, setTooltip] = useState({ visible: false, x: 0, y: 0, content: '' });
  const [zoomLevel, setZoomLevel] = useState(1);
  const [panOffset, setPanOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const mapRef = useRef(null);

  const addAthleteProfilePics = () => {
    if (!mapRef.current) return;

    const svg = mapRef.current.querySelector('svg');
    if (!svg) return;

    // Remove existing athlete markers
    const existingMarkers = svg.querySelectorAll('.athlete-marker');
    existingMarkers.forEach(marker => marker.remove());

    athletes.forEach(athlete => {
      const province = provinceData[athlete.province];
      if (!province) return;

      // Find the province path in the SVG
      const provincePath = svg.querySelector(`[data-province="${athlete.province}"]`) || 
                          svg.querySelector(`title:contains("${athlete.province}")`)?.parentElement;
      
      if (provincePath) {
        const bbox = provincePath.getBBox();
        const centerX = bbox.x + bbox.width / 2;
        const centerY = bbox.y + bbox.height / 2;

        // Create athlete marker
        const marker = document.createElementNS('http://www.w3.org/2000/svg', 'g');
        marker.classList.add('athlete-marker');
        marker.style.cursor = 'pointer';

        // Create circle background
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', centerX);
        circle.setAttribute('cy', centerY);
        circle.setAttribute('r', '15');
        circle.setAttribute('fill', '#ffffff');
        circle.setAttribute('stroke', '#3b82f6');
        circle.setAttribute('stroke-width', '3');

        // Create image
        const image = document.createElementNS('http://www.w3.org/2000/svg', 'image');
        image.setAttribute('x', centerX - 12);
        image.setAttribute('y', centerY - 12);
        image.setAttribute('width', '24');
        image.setAttribute('height', '24');
        image.setAttribute('href', athlete.profilePic);
        image.style.clipPath = 'circle(12px at 12px 12px)';

        marker.appendChild(circle);
        marker.appendChild(image);

        // Add click event
        marker.addEventListener('click', (e) => {
          e.stopPropagation();
          setSelectedAthlete(athlete);
        });

        svg.appendChild(marker);
      }
    });
  };

  const handleRegistration = (athleteData) => {
    const newAthlete = {
      ...athleteData,
      id: Date.now(),
      profilePic: athleteData.profilePic || "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face"
    };
    
    setAthletes(prev => [...prev, newAthlete]);
    setShowRegistration(false);
  };

  const handlePurchase = (purchaseData) => {
    setPurchases(prev => [...prev, { ...purchaseData, id: Date.now() }]);
    setShowPurchase(null);
  };

  const handleProvinceClick = (provinceName) => {
    const province = provinceData[provinceName];
    if (province) {
      setSelectedProvince({ name: provinceName, ...province });
    }
  };

  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev * 1.5, 5));
  };

  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev / 1.5, 0.5));
  };

  const handleResetZoom = () => {
    setZoomLevel(1);
    setPanOffset({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panOffset.x, y: e.clientY - panOffset.y });
    }
  };

  const handleMouseMove = (e) => {
    if (isDragging && zoomLevel > 1) {
      setPanOffset({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoomLevel(prev => Math.max(0.5, Math.min(5, prev * delta)));
  };

  useEffect(() => {
    addAthleteProfilePics();
  }, [athletes]);

  useEffect(() => {
    const mapContainer = mapRef.current;
    if (mapContainer) {
      mapContainer.addEventListener('wheel', handleWheel, { passive: false });
      return () => mapContainer.removeEventListener('wheel', handleWheel);
    }
  }, []);

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return '#10b981';
      case 'partial': return '#f59e0b';
      case 'sold': return '#dc2626';
      case 'premium': return '#3b82f6';
      default: return '#6b7280';
    }
  };

  const getAvailableProvinces = () => {
    return Object.values(provinceData).filter(p => p.status === 'available').length;
  };

  const getActiveSponsors = () => {
    return Object.values(provinceData).filter(p => p.status === 'sold' || p.status === 'premium').length;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      {/* Header */}
      <div className="bg-blue-600 dark:bg-gray-800 text-white p-6 shadow-lg transition-colors duration-300">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">Philippine Map Runner</h1>
            <p className="text-blue-100 dark:text-gray-300">Discover Athletes by Province</p>
          </div>
          <div className="flex gap-4 items-center">
            <Button 
              onClick={toggleTheme}
              variant="outline"
              size="sm"
              className="bg-white/10 border-white/20 text-white hover:bg-white/20"
            >
              {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button 
              onClick={() => setShowRegistration(true)}
              className="bg-green-500 hover:bg-green-600"
            >
              Register as Athlete
            </Button>
            <Button 
              onClick={() => setShowPurchase({})}
              className="bg-purple-500 hover:bg-purple-600"
            >
              Advertise Here
            </Button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Map Section */}
          <div className="lg:col-span-3">
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold dark:text-white">Interactive Province Map</h2>
                <div className="flex gap-2">
                  <Button onClick={handleZoomIn} size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">+</Button>
                  <Button onClick={handleZoomOut} size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">-</Button>
                  <Button onClick={handleResetZoom} size="sm" variant="outline" className="dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700">Reset</Button>
                </div>
              </div>
              
              <div className="flex gap-2 mb-4 flex-wrap">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">Available for Advertising</Badge>
                <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">Partially Sponsored</Badge>
                <Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200">Fully Purchased</Badge>
                <Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">Premium Provinces</Badge>
              </div>

              <div 
                ref={mapRef}
                className="relative bg-green-100 dark:bg-gray-700 rounded-lg overflow-hidden border-2 border-green-200 dark:border-gray-600 transition-colors duration-300"
                style={{ height: '500px', cursor: isDragging ? 'grabbing' : (zoomLevel > 1 ? 'grab' : 'default') }}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseUp}
              >
                <div className="absolute top-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm z-10">
                  {Math.round(zoomLevel * 100)}%
                </div>
                
                <div 
                  style={{
                    transform: `scale(${zoomLevel}) translate(${panOffset.x / zoomLevel}px, ${panOffset.y / zoomLevel}px)`,
                    transformOrigin: 'center center',
                    transition: isDragging ? 'none' : 'transform 0.2s ease',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <img 
                    src={mapSvg} 
                    alt="Philippine Map" 
                    className="max-w-full max-h-full object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                    onClick={(e) => {
                      // Handle province clicks here
                      const rect = e.target.getBoundingClientRect();
                      const x = e.clientX - rect.left;
                      const y = e.clientY - rect.top;
                      
                      // This is a simplified click handler - in a real implementation,
                      // you'd need to map coordinates to provinces or use SVG path detection
                      console.log('Map clicked at:', x, y);
                    }}
                  />
                </div>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Statistics */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Statistics</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Total Athletes:</span>
                  <span className="font-bold dark:text-white">{athletes.length}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Available Provinces:</span>
                  <span className="font-bold dark:text-white">{getAvailableProvinces()}/82</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Active Sponsors:</span>
                  <span className="font-bold dark:text-white">{getActiveSponsors()}</span>
                </div>
              </div>
            </Card>

            {/* Featured Athletes */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Featured Athletes</h3>
              <div className="space-y-4">
                {athletes.slice(0, 3).map(athlete => (
                  <div 
                    key={athlete.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-200"
                    onClick={() => setSelectedAthlete(athlete)}
                  >
                    <img 
                      src={athlete.profilePic} 
                      alt={athlete.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold dark:text-white">{athlete.name}</div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{athlete.province}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Recent Purchases */}
            <Card className="p-6 dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
              <h3 className="text-xl font-bold mb-4 dark:text-white">Recent Purchases</h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">• Metro Manila</span>
                  <span className="text-green-600 dark:text-green-400">$500/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">• Cebu</span>
                  <span className="text-green-600 dark:text-green-400">$300/month</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="dark:text-gray-300">• Davao</span>
                  <span className="text-green-600 dark:text-green-400">$250/month</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Athlete Profile Modal */}
      {selectedAthlete && (
        <AthleteProfile 
          athlete={selectedAthlete} 
          onClose={() => setSelectedAthlete(null)} 
        />
      )}

      {/* Province Modal */}
      {selectedProvince && (
        <ProvinceModal 
          province={selectedProvince} 
          onClose={() => setSelectedProvince(null)}
          onAthleteClick={setSelectedAthlete}
          onPurchaseClick={(province) => setShowPurchase(province)}
        />
      )}

      {/* Registration Modal */}
      {showRegistration && (
        <AthleteRegistration 
          onClose={() => setShowRegistration(false)}
          onSubmit={handleRegistration}
        />
      )}

      {/* Purchase Modal */}
      {showPurchase && (
        <PurchaseModal 
          province={showPurchase}
          onClose={() => setShowPurchase(null)}
          onSubmit={handlePurchase}
        />
      )}

      {/* Tooltip */}
      {tooltip.visible && (
        <div 
          className="fixed bg-black dark:bg-gray-700 text-white px-2 py-1 rounded text-sm pointer-events-none z-50 transition-colors duration-300"
          style={{ left: tooltip.x, top: tooltip.y }}
        >
          {tooltip.content}
        </div>
      )}
    </div>
  );
};

export default PhilippineMap;

