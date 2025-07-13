import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, MapPin, Users, DollarSign, Star } from 'lucide-react';

const ProvinceModal = ({ province, onClose, onAthleteClick, onPurchaseClick }) => {
  if (!province) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'partial': return 'bg-yellow-500';
      case 'sold': return 'bg-red-500';
      case 'premium': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available for Advertising';
      case 'partial': return 'Partially Sponsored';
      case 'sold': return 'Fully Purchased';
      case 'premium': return 'Premium Province';
      default: return 'Unknown Status';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white p-6 rounded-t-lg">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="w-20 h-20 bg-white/20 rounded-lg flex items-center justify-center">
                <MapPin className="h-10 w-10" />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{province.name}</h2>
                <div className="flex flex-wrap gap-4 text-lg opacity-90">
                  <div>Capital: {province.capital}</div>
                  <div>Region: {province.region}</div>
                  <div>Population: {province.population}</div>
                </div>
                <Badge className={`${getStatusColor(province.status)} text-white mt-2`}>
                  {getStatusText(province.status)}
                </Badge>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column - Province Info */}
              <div className="space-y-6">
                {/* Advertising Packages */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Advertising Packages
                  </h3>
                  <div className="space-y-3">
                    <Card className="p-4 border-2 border-green-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Basic Package</h4>
                        <span className="text-2xl font-bold text-green-600">${Math.floor(province.price * 0.6)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">per month</p>
                      <ul className="text-sm space-y-1">
                        <li>• Small banner on province</li>
                        <li>• Basic analytics</li>
                        <li>• 1 month minimum</li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-2 border-blue-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold">Premium Package</h4>
                        <span className="text-2xl font-bold text-blue-600">${province.price}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">per month</p>
                      <ul className="text-sm space-y-1">
                        <li>• Large banner on province</li>
                        <li>• Detailed analytics</li>
                        <li>• Featured in sidebar</li>
                        <li>• 3 month minimum</li>
                      </ul>
                    </Card>

                    <Card className="p-4 border-2 border-purple-200">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-semibold flex items-center gap-1">
                          <Star className="h-4 w-4" />
                          Exclusive Package
                        </h4>
                        <span className="text-2xl font-bold text-purple-600">${Math.floor(province.price * 1.5)}</span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">per month</p>
                      <ul className="text-sm space-y-1">
                        <li>• Exclusive province sponsorship</li>
                        <li>• Premium analytics dashboard</li>
                        <li>• Featured athlete partnerships</li>
                        <li>• 6 month minimum</li>
                      </ul>
                    </Card>
                  </div>

                  <div className="mt-4 space-y-2">
                    <Button 
                      className="w-full bg-green-600 hover:bg-green-700"
                      onClick={() => onPurchaseClick && onPurchaseClick()}
                    >
                      Purchase Advertising Space
                    </Button>
                    <Button variant="outline" className="w-full">
                      Request More Information
                    </Button>
                  </div>
                </div>
              </div>

              {/* Right Column - Athletes */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Athletes from {province.name} ({province.athletes.length})
                  </h3>
                  
                  {province.athletes.length > 0 ? (
                    <div className="space-y-3">
                      {province.athletes.map(athlete => (
                        <Card 
                          key={athlete.id}
                          className="p-4 hover:shadow-md transition-shadow cursor-pointer"
                          onClick={() => onAthleteClick(athlete)}
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={athlete.profilePic}
                              alt={athlete.name}
                              className="w-16 h-16 rounded-full object-cover"
                            />
                            <div className="flex-1">
                              <h4 className="font-semibold text-lg">{athlete.name}</h4>
                              <p className="text-gray-600">Age: {athlete.age}</p>
                              <div className="flex gap-2 mt-2">
                                {athlete.achievements.slice(0, 1).map((achievement, index) => (
                                  <Badge key={index} variant="secondary" className="text-xs">
                                    {achievement}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-sm text-gray-600">Marathon PR</div>
                              <div className="font-semibold">{athlete.personalRecords.Marathon}</div>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  ) : (
                    <Card className="p-8 text-center">
                      <Users className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                      <p className="text-gray-600">No athletes registered from this province yet.</p>
                      <Button variant="outline" className="mt-4">
                        Be the First to Register
                      </Button>
                    </Card>
                  )}
                </div>

                {/* Province Statistics */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Province Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-blue-600">{province.athletes.length}</div>
                      <div className="text-sm text-gray-600">Registered Athletes</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-green-600">
                        {province.athletes.reduce((sum, athlete) => sum + athlete.achievements.length, 0)}
                      </div>
                      <div className="text-sm text-gray-600">Total Achievements</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-purple-600">
                        {province.status === 'available' ? '0' : '1'}
                      </div>
                      <div className="text-sm text-gray-600">Active Sponsors</div>
                    </Card>
                    <Card className="p-4 text-center">
                      <div className="text-2xl font-bold text-orange-600">
                        ${province.price}
                      </div>
                      <div className="text-sm text-gray-600">Starting Price</div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProvinceModal;

