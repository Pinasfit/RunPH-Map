import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { X, CreditCard, Building, Globe, Calendar, DollarSign } from 'lucide-react';

const PurchaseModal = ({ province, onClose, onPurchase }) => {
  const [formData, setFormData] = useState({
    package: '',
    duration: '',
    companyName: '',
    contactEmail: '',
    contactPhone: '',
    website: '',
    adTitle: '',
    adDescription: '',
    adImage: null,
    targetUrl: '',
    paymentMethod: 'credit_card'
  });

  const [adImagePreview, setAdImagePreview] = useState(null);

  const packages = [
    {
      id: 'basic',
      name: 'Basic Package',
      price: Math.floor(province.price * 0.6),
      features: ['Small banner on province', 'Basic analytics', '1 month minimum']
    },
    {
      id: 'premium',
      name: 'Premium Package',
      price: province.price,
      features: ['Large banner on province', 'Detailed analytics', 'Featured in sidebar', '3 month minimum']
    },
    {
      id: 'exclusive',
      name: 'Exclusive Package',
      price: Math.floor(province.price * 1.5),
      features: ['Exclusive province sponsorship', 'Premium analytics dashboard', 'Featured athlete partnerships', '6 month minimum']
    }
  ];

  const durations = [
    { value: '1', label: '1 Month', multiplier: 1 },
    { value: '3', label: '3 Months', multiplier: 2.7 },
    { value: '6', label: '6 Months', multiplier: 5.1 },
    { value: '12', label: '12 Months', multiplier: 9.6 }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAdImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, adImage: file }));
      const reader = new FileReader();
      reader.onload = (e) => setAdImagePreview(e.target.result);
      reader.readAsDataURL(file);
    }
  };

  const getSelectedPackage = () => {
    return packages.find(pkg => pkg.id === formData.package);
  };

  const getSelectedDuration = () => {
    return durations.find(dur => dur.value === formData.duration);
  };

  const calculateTotal = () => {
    const selectedPackage = getSelectedPackage();
    const selectedDuration = getSelectedDuration();
    
    if (!selectedPackage || !selectedDuration) return 0;
    
    return Math.floor(selectedPackage.price * selectedDuration.multiplier);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const purchaseData = {
      id: Date.now(),
      province: province.name,
      package: getSelectedPackage(),
      duration: getSelectedDuration(),
      total: calculateTotal(),
      company: formData.companyName,
      contact: {
        email: formData.contactEmail,
        phone: formData.contactPhone,
        website: formData.website
      },
      advertisement: {
        title: formData.adTitle,
        description: formData.adDescription,
        image: adImagePreview,
        targetUrl: formData.targetUrl
      },
      purchaseDate: new Date().toISOString(),
      status: 'pending'
    };

    onPurchase(purchaseData);
  };

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
            
            <h2 className="text-3xl font-bold mb-2">Purchase Advertising Space</h2>
            <p className="text-lg opacity-90">{province.name} Province</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-6">
                {/* Package Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <DollarSign className="h-5 w-5" />
                    Select Package
                  </h3>
                  <div className="space-y-3">
                    {packages.map(pkg => (
                      <Card 
                        key={pkg.id}
                        className={`p-4 cursor-pointer transition-all ${
                          formData.package === pkg.id 
                            ? 'border-blue-500 bg-blue-50' 
                            : 'hover:border-gray-300'
                        }`}
                        onClick={() => handleInputChange('package', pkg.id)}
                      >
                        <div className="flex justify-between items-center mb-2">
                          <h4 className="font-semibold">{pkg.name}</h4>
                          <span className="text-2xl font-bold text-blue-600">${pkg.price}</span>
                        </div>
                        <p className="text-sm text-gray-600 mb-2">per month</p>
                        <ul className="text-sm space-y-1">
                          {pkg.features.map((feature, index) => (
                            <li key={index}>• {feature}</li>
                          ))}
                        </ul>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Duration Selection */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="h-5 w-5" />
                    Duration
                  </h3>
                  <Select value={formData.duration} onValueChange={(value) => handleInputChange('duration', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      {durations.map(duration => (
                        <SelectItem key={duration.value} value={duration.value}>
                          {duration.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Company Information */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Building className="h-5 w-5" />
                    Company Information
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="companyName">Company Name *</Label>
                      <Input
                        id="companyName"
                        value={formData.companyName}
                        onChange={(e) => handleInputChange('companyName', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactEmail">Contact Email *</Label>
                      <Input
                        id="contactEmail"
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => handleInputChange('contactEmail', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="contactPhone">Contact Phone</Label>
                      <Input
                        id="contactPhone"
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => handleInputChange('contactPhone', e.target.value)}
                      />
                    </div>
                    <div>
                      <Label htmlFor="website">Website</Label>
                      <Input
                        id="website"
                        type="url"
                        placeholder="https://example.com"
                        value={formData.website}
                        onChange={(e) => handleInputChange('website', e.target.value)}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Advertisement Details */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Advertisement Details
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="adTitle">Advertisement Title *</Label>
                      <Input
                        id="adTitle"
                        value={formData.adTitle}
                        onChange={(e) => handleInputChange('adTitle', e.target.value)}
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="adDescription">Description</Label>
                      <Textarea
                        id="adDescription"
                        placeholder="Brief description of your business or offer..."
                        value={formData.adDescription}
                        onChange={(e) => handleInputChange('adDescription', e.target.value)}
                        rows={3}
                      />
                    </div>
                    <div>
                      <Label htmlFor="targetUrl">Target URL *</Label>
                      <Input
                        id="targetUrl"
                        type="url"
                        placeholder="https://your-website.com"
                        value={formData.targetUrl}
                        onChange={(e) => handleInputChange('targetUrl', e.target.value)}
                        required
                      />
                    </div>
                    
                    {/* Ad Image Upload */}
                    <div>
                      <Label htmlFor="adImage">Advertisement Image</Label>
                      <div className="flex items-center gap-4 mt-2">
                        <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                          {adImagePreview ? (
                            <img src={adImagePreview} alt="Ad Preview" className="w-full h-full object-cover" />
                          ) : (
                            <span className="text-xs text-gray-400">Ad Image</span>
                          )}
                        </div>
                        <div>
                          <Label htmlFor="adImage" className="cursor-pointer">
                            <Button type="button" variant="outline" asChild>
                              <span>Upload Image</span>
                            </Button>
                          </Label>
                          <Input
                            id="adImage"
                            type="file"
                            accept="image/*"
                            onChange={handleAdImageChange}
                            className="hidden"
                          />
                          <p className="text-sm text-gray-600 mt-1">Recommended: 300x200px</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">Order Summary</h3>
                  <Card className="p-4 bg-gray-50">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span>Province:</span>
                        <span className="font-medium">{province.name}</span>
                      </div>
                      {getSelectedPackage() && (
                        <div className="flex justify-between">
                          <span>Package:</span>
                          <span className="font-medium">{getSelectedPackage().name}</span>
                        </div>
                      )}
                      {getSelectedDuration() && (
                        <div className="flex justify-between">
                          <span>Duration:</span>
                          <span className="font-medium">{getSelectedDuration().label}</span>
                        </div>
                      )}
                      <hr className="my-2" />
                      <div className="flex justify-between text-lg font-bold">
                        <span>Total:</span>
                        <span className="text-blue-600">${calculateTotal()}</span>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Payment Method */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Payment Method
                  </h3>
                  <Select value={formData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="credit_card">Credit Card</SelectItem>
                      <SelectItem value="paypal">PayPal</SelectItem>
                      <SelectItem value="bank_transfer">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                  <p className="text-sm text-gray-600 mt-2">
                    Secure payment processing. You will be redirected to complete payment.
                  </p>
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="mt-8 flex gap-4 justify-center">
              <Button 
                type="submit" 
                className="bg-blue-600 hover:bg-blue-700 px-8"
                disabled={!formData.package || !formData.duration || !formData.companyName || !formData.contactEmail}
              >
                Proceed to Payment - ${calculateTotal()}
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

export default PurchaseModal;

