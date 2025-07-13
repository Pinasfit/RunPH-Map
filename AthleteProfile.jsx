import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { X, Instagram, Facebook, MapPin, Trophy, Clock, Target } from 'lucide-react';

const AthleteProfile = ({ athlete, onClose }) => {
  if (!athlete) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="relative">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6 rounded-t-lg">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 right-4 text-white hover:bg-white/20"
              onClick={onClose}
            >
              <X className="h-5 w-5" />
            </Button>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <img
                src={athlete.profilePic}
                alt={athlete.name}
                className="w-24 h-24 rounded-full border-4 border-white object-cover"
              />
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-2">{athlete.name}</h2>
                <div className="flex flex-wrap gap-4 text-lg opacity-90">
                  <div className="flex items-center gap-1">
                    <span>Age: {athlete.age}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MapPin className="h-4 w-4" />
                    <span>{athlete.province}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Bio */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Target className="h-5 w-5" />
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{athlete.bio}</p>
                </div>

                {/* Achievements */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Achievements
                  </h3>
                  <div className="space-y-2">
                    {athlete.achievements.map((achievement, index) => (
                      <Badge key={index} variant="secondary" className="block w-fit">
                        {achievement}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Social Media</h3>
                  <div className="flex gap-3">
                    {athlete.socialMedia.instagram && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Instagram className="h-4 w-4" />
                        {athlete.socialMedia.instagram}
                      </Button>
                    )}
                    {athlete.socialMedia.facebook && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <Facebook className="h-4 w-4" />
                        {athlete.socialMedia.facebook}
                      </Button>
                    )}
                    {athlete.socialMedia.strava && (
                      <Button variant="outline" size="sm" className="flex items-center gap-2">
                        <span className="text-orange-500 font-bold">S</span>
                        {athlete.socialMedia.strava}
                      </Button>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Personal Records */}
                <div>
                  <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Personal Records
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(athlete.personalRecords).map(([distance, time]) => (
                      <Card key={distance} className="p-4 text-center">
                        <div className="text-2xl font-bold text-blue-600">{time}</div>
                        <div className="text-sm text-gray-600">{distance}</div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Statistics Chart Placeholder */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Training Progress</h3>
                  <Card className="p-4">
                    <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-center justify-center">
                      <span className="text-gray-600">Training chart coming soon</span>
                    </div>
                  </Card>
                </div>

                {/* Recent Races */}
                <div>
                  <h3 className="text-xl font-semibold mb-3">Recent Races</h3>
                  <div className="space-y-3">
                    <Card className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Manila Marathon 2023</p>
                          <p className="text-sm text-gray-600">December 3, 2023</p>
                        </div>
                        <Badge variant="outline">1st Place</Badge>
                      </div>
                    </Card>
                    <Card className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">BGC Fun Run</p>
                          <p className="text-sm text-gray-600">November 15, 2023</p>
                        </div>
                        <Badge variant="outline">2nd Place</Badge>
                      </div>
                    </Card>
                    <Card className="p-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="font-medium">Quezon City 10K</p>
                          <p className="text-sm text-gray-600">October 28, 2023</p>
                        </div>
                        <Badge variant="outline">1st Place</Badge>
                      </div>
                    </Card>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <Button className="bg-blue-600 hover:bg-blue-700">
                Follow Athlete
              </Button>
              <Button variant="outline">
                Send Message
              </Button>
              <Button variant="outline">
                View Training Log
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AthleteProfile;

