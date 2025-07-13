import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, Upload, User, MapPin, Trophy } from 'lucide-react';

const AthleteRegistration = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    age: '',
    email: '',
    phone: '',
    province: '',
    profilePic: null,
    yearsRunning: '',
    favoriteDistance: '',
    personalRecords: {
      '5K': '',
      '10K': '',
      'Half Marathon': '',
      'Marathon': ''
    },
    bio: '',
    socialMedia: {
      instagram: '',
      facebook: '',
      strava: ''
    }
  });

  const [profilePicPreview, setProfilePicPreview] = useState(null);

  const provinces = [
    'Abra', 'Agusan del Norte', 'Agusan del Sur', 'Aklan', 'Albay', 'Antique',
    'Apayao', 'Aurora', 'Basilan', 'Bataan', 'Batanes', 'Batangas', 'Benguet',
    'Biliran', 'Bohol', 'Bukidnon', 'Bulacan', 'Cagayan', 'Camarines Norte',
    'Camarines Sur', 'Camiguin', 'Capiz', 'Catanduanes', 'Cavite', 'Cebu',
    'Cotabato', 'Davao de Oro', 'Davao del Norte', 'Davao del Sur',
    'Davao Occidental', 'Davao Oriental', 'Dinagat Islands', 'Eastern Samar',
    'Guimaras', 'Ifugao', 'Ilocos Norte', 'Ilocos Sur', 'Iloilo', 'Isabela',
    'Kalinga', 'La Union', 'Laguna', 'Lanao del Norte', 'Lanao del Sur',
    'Leyte', 'Maguindanao del Norte', 'Maguindanao del Sur', 'Marinduque',
    'Masbate', 'Metro Manila', 'Misamis Occidental', 'Misamis Oriental',
    'Mountain Province', 'Negros Occidental', 'Negros Oriental', 'Northern Samar',
    'Nueva Ecija', 'Nueva Vizcaya', 'Occidental Mindoro', 'Oriental Mindoro',
    'Palawan', 'Pampanga', 'Pangasinan', 'Quezon', 'Quirino', 'Rizal',
    'Romblon', 'Samar', 'Sarangani', 'Siquijor', 'Sorsogon', 'South Cotabato',
    'Southern Leyte', 'Sultan Kudarat', 'Sulu', 'Surigao del Norte',
    'Surigao del Sur', 'Tarlac', 'Tawi-Tawi', 'Zambales', 'Zamboanga del Norte',
    'Zamboanga del Sur', 'Zamboanga Sibugay'
  ];

  const distances = ['5K', '10K', 'Half Marathon', 'Marathon', 'Ultra Marathon'];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePersonalRecordChange = (distance, value) => {
    setFormData(prev => ({
      ...prev,
      personalRecords: {
        ...prev.personalRecords,
        [distance]: value
      }
    }));
  };

  const handleSocialMediaChange = (platform, value) => {
    setFormData(prev => ({
      ...prev,
      socialMedia: {
        ...prev.socialMedia,
        [platform]: value
      }
    }));
  };

  const handleProfilePicChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, profilePic: file }));
      const reader = new FileReader();
      reader.onload = (e) => setProfilePicPreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Create athlete object
    const newAthlete = {
      id: Date.now(), // Simple ID generation
      name: `${formData.firstName} ${formData.lastName}`,
      age: parseInt(formData.age),
      province: formData.province,
      profilePic: profilePicPreview || "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      achievements: [], // Will be populated later
      personalRecords: formData.personalRecords,
      bio: formData.bio,
      socialMedia: formData.socialMedia,
      email: formData.email,
      phone: formData.phone,
      yearsRunning: parseInt(formData.yearsRunning),
      favoriteDistance: formData.favoriteDistance
    };

    onSubmit(newAthlete);
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
            
            <h2 className="text-3xl font-bold mb-2">Create Athlete Profile</h2>
            <p className="text-lg opacity-90">Join the Philippine running community</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Personal Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input
                        id="firstName"
                        value={formData.firstName}
                        onChange={(e) => handleInputChange('firstName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input
                        id="lastName"
                        value={formData.lastName}
                        onChange={(e) => handleInputChange('lastName', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div>
                      <Label htmlFor="age">Age *</Label>
                      <Input
                        id="age"
                        type="number"
                        min="16"
                        max="100"
                        value={formData.age}
                        onChange={(e) => handleInputChange('age', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                    />
                  </div>
                </div>

                {/* Location */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Location
                  </h3>
                  <div>
                    <Label htmlFor="province">Choose Your Province *</Label>
                    <Select value={formData.province} onValueChange={(value) => handleInputChange('province', value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your province" />
                      </SelectTrigger>
                      <SelectContent>
                        {provinces.map(province => (
                          <SelectItem key={province} value={province}>
                            {province}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Profile Photo */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Profile Photo</h3>
                  <div className="flex items-center gap-4">
                    <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                      {profilePicPreview ? (
                        <img src={profilePicPreview} alt="Preview" className="w-full h-full object-cover" />
                      ) : (
                        <Upload className="h-8 w-8 text-gray-400" />
                      )}
                    </div>
                    <div>
                      <Label htmlFor="profilePic" className="cursor-pointer">
                        <Button type="button" variant="outline" asChild>
                          <span>Upload Photo</span>
                        </Button>
                      </Label>
                      <Input
                        id="profilePic"
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePicChange}
                        className="hidden"
                      />
                      <p className="text-sm text-gray-600 mt-1">JPG, PNG up to 5MB</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Running Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Trophy className="h-5 w-5" />
                    Running Information
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="yearsRunning">Years Running</Label>
                      <Input
                        id="yearsRunning"
                        type="number"
                        min="0"
                        max="50"
                        value={formData.yearsRunning}
                        onChange={(e) => handleInputChange('yearsRunning', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="favoriteDistance">Favorite Distance</Label>
                      <Select value={formData.favoriteDistance} onValueChange={(value) => handleInputChange('favoriteDistance', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select distance" />
                        </SelectTrigger>
                        <SelectContent>
                          {distances.map(distance => (
                            <SelectItem key={distance} value={distance}>
                              {distance}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Personal Records */}
                  <div className="mt-4">
                    <Label>Personal Records (optional)</Label>
                    <div className="grid grid-cols-2 gap-4 mt-2">
                      {Object.entries(formData.personalRecords).map(([distance, time]) => (
                        <div key={distance}>
                          <Label htmlFor={distance} className="text-sm">{distance}</Label>
                          <Input
                            id={distance}
                            placeholder="MM:SS or H:MM:SS"
                            value={time}
                            onChange={(e) => handlePersonalRecordChange(distance, e.target.value)}
                          />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea
                    id="bio"
                    placeholder="Tell us about your running journey..."
                    value={formData.bio}
                    onChange={(e) => handleInputChange('bio', e.target.value)}
                    rows={4}
                  />
                </div>

                {/* Social Media */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Social Media (optional)</h3>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="instagram">Instagram Handle</Label>
                      <Input
                        id="instagram"
                        placeholder="@username"
                        value={formData.socialMedia.instagram}
                        onChange={(e) => handleSocialMediaChange('instagram', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="facebook">Facebook Profile</Label>
                      <Input
                        id="facebook"
                        placeholder="Profile name"
                        value={formData.socialMedia.facebook}
                        onChange={(e) => handleSocialMediaChange('facebook', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="strava">Strava Profile</Label>
                      <Input
                        id="strava"
                        placeholder="Profile name"
                        value={formData.socialMedia.strava}
                        onChange={(e) => handleSocialMediaChange('strava', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <Button type="submit" className="bg-green-600 hover:bg-green-700 px-8">
                Create Profile
              </Button>
              <Button type="button" variant="outline" onClick={onClose} className="px-8">
                Cancel
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  );
};

export default AthleteRegistration;

