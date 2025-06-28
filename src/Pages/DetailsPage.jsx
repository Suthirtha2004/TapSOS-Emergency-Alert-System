import React, { useState, useEffect } from 'react';
import { 
  User, 
  Calendar, 
  MapPin, 
  Phone, 
  Plus, 
  X, 
  Save, 
  Shield, 
  MessageSquare, 
  Navigation,
  AlertCircle,
  CheckCircle,
  Clock
} from 'lucide-react';
import Header from '../Components/Header';
import '../Components/UI/DetailsPage.css';
import { useNotification } from '../Components/NotificationProvider';
import { useNavigate } from 'react-router-dom';

const statesAndCities = {
  'Maharashtra': ['Mumbai', 'Pune', 'Nagpur', 'Thane', 'Nashik', 'Aurangabad', 'Solapur', 'Kolhapur'],
  'Delhi': ['New Delhi', 'North Delhi', 'South Delhi', 'East Delhi', 'West Delhi', 'Central Delhi'],
  'Karnataka': ['Bangalore', 'Mysore', 'Hubli', 'Mangalore', 'Belgaum', 'Gulbarga'],
  'Tamil Nadu': ['Chennai', 'Coimbatore', 'Madurai', 'Salem', 'Tiruchirappalli', 'Vellore'],
  'Gujarat': ['Ahmedabad', 'Surat', 'Vadodara', 'Rajkot', 'Bhavnagar', 'Jamnagar'],
  'Uttar Pradesh': ['Lucknow', 'Kanpur', 'Varanasi', 'Agra', 'Prayagraj', 'Ghaziabad'],
  'West Bengal': ['Kolkata', 'Howrah', 'Durgapur', 'Asansol', 'Siliguri', 'Bardhaman'],
  'Telangana': ['Hyderabad', 'Warangal', 'Karimnagar', 'Nizamabad', 'Khammam', 'Adilabad'],
  'Rajasthan': ['Jaipur', 'Jodhpur', 'Udaipur', 'Kota', 'Bikaner', 'Ajmer'],
  'Andhra Pradesh': ['Visakhapatnam', 'Vijayawada', 'Guntur', 'Nellore', 'Kurnool', 'Anantapur']
};

const DetailsPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    address: '',
    city: '',
    state: '',
    zipCode: ''
  });

  const [emergencyContacts, setEmergencyContacts] = useState([
    { id: 1, name: '', phone: '', relationship: '' }
  ]);

  const [permissions, setPermissions] = useState({
    location: false,
    sms: false,
    missedCall: false,
    liveLocation: false
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('tapsos_logged_in'));
  }, []);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Reset city if state changes
    if (name === 'state') {
      setFormData(prev => ({ ...prev, city: '' }));
    }
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Handle emergency contact changes
  const handleEmergencyContactChange = (id, field, value) => {
    setEmergencyContacts(prev => 
      prev.map(contact => 
        contact.id === id 
          ? { ...contact, [field]: value }
          : contact
      )
    );
  };

  // Add new emergency contact
  const addEmergencyContact = () => {
    if (emergencyContacts.length < 10) {
      const newId = Math.max(...emergencyContacts.map(c => c.id)) + 1;
      setEmergencyContacts(prev => [
        ...prev,
        { id: newId, name: '', phone: '', relationship: '' }
      ]);
    }
  };

  // Remove emergency contact
  const removeEmergencyContact = (id) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(prev => prev.filter(contact => contact.id !== id));
    }
  };

  // Handle permission toggles
  const handlePermissionToggle = (permission) => {
    setPermissions(prev => ({
      ...prev,
      [permission]: !prev[permission]
    }));
  };

  // Get current location
  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Here you would typically reverse geocode to get address
          setFormData(prev => ({
            ...prev,
            location: `${latitude.toFixed(6)}, ${longitude.toFixed(6)}`
          }));
        },
        (error) => {
          console.error('Error getting location:', error);
          showNotification('Unable to get your location. Please enter manually.', 'error');
        }
      );
    } else {
      showNotification('Geolocation is not supported by this browser.', 'error');
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    if (!formData.dateOfBirth) {
      newErrors.dateOfBirth = 'Date of birth is required';
    }
    if (!formData.address.trim()) {
      newErrors.address = 'Address is required';
    }
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    if (!formData.zipCode.trim()) {
      newErrors.zipCode = 'ZIP code is required';
    }
    emergencyContacts.forEach((contact, index) => {
      if (!contact.name.trim()) {
        newErrors[`contact${contact.id}Name`] = 'Contact name is required';
      }
      if (!contact.phone.trim()) {
        newErrors[`contact${contact.id}Phone`] = 'Contact phone is required';
      } else if (!/^[\+]?[1-9][\d]{0,15}$/.test(contact.phone.replace(/\s/g, ''))) {
        newErrors[`contact${contact.id}Phone`] = 'Please enter a valid phone number';
      }
      if (!contact.relationship.trim()) {
        newErrors[`contact${contact.id}Relationship`] = 'Relationship is required';
      }
    });
    if (!permissions.location) {
      newErrors.permissions = 'Location access is required for emergency services';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      setIsSaved(true);
      showNotification('Details saved successfully! Your emergency contacts and permissions have been configured.', 'success');
      setTimeout(() => setIsSaved(false), 3000);
      navigate('/tap');
    }, 2000);
  };

  return (
    <div className="details-page">
      <Header isLoggedIn={isLoggedIn} />
      
      <div className="details-container">
        <div className="details-header">
          <h1>Complete Your Profile</h1>
          <p>Help us provide better emergency assistance by completing your details</p>
        </div>

        <form onSubmit={handleSubmit} className="details-form">
          {/* Personal Details Section */}
          <div className="form-section">
            <div className="section-header">
              <User size={24} />
              <h2>Personal Details</h2>
            </div>
            
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="firstName">First Name *</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={errors.firstName ? 'error' : ''}
                  placeholder="Enter your first name"
                />
                {errors.firstName && <span className="error-message">{errors.firstName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name *</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={errors.lastName ? 'error' : ''}
                  placeholder="Enter your last name"
                />
                {errors.lastName && <span className="error-message">{errors.lastName}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="dateOfBirth">Date of Birth *</label>
                <input
                  type="date"
                  id="dateOfBirth"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={errors.dateOfBirth ? 'error' : ''}
                />
                {errors.dateOfBirth && <span className="error-message">{errors.dateOfBirth}</span>}
              </div>
            </div>

            <div className="address-section">
              <h3>Address Details</h3>
              <div className="form-grid">
                <div className="form-group full-width">
                  <label htmlFor="address">Street Address *</label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className={errors.address ? 'error' : ''}
                    placeholder="Enter your street address"
                  />
                  {errors.address && <span className="error-message">{errors.address}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="state">State *</label>
                  <select
                    id="state"
                    name="state"
                    value={formData.state}
                    onChange={handleInputChange}
                    className={errors.state ? 'error' : ''}
                    required
                  >
                    <option value="">Select State</option>
                    {Object.keys(statesAndCities).map(state => (
                      <option key={state} value={state}>{state}</option>
                    ))}
                  </select>
                  {errors.state && <span className="error-message">{errors.state}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="city">City *</label>
                  <select
                    id="city"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={errors.city ? 'error' : ''}
                    required
                    disabled={!formData.state}
                  >
                    <option value="">Select City</option>
                    {formData.state && statesAndCities[formData.state].map(city => (
                      <option key={city} value={city}>{city}</option>
                    ))}
                  </select>
                  {errors.city && <span className="error-message">{errors.city}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="zipCode">ZIP Code *</label>
                  <input
                    type="text"
                    id="zipCode"
                    name="zipCode"
                    value={formData.zipCode}
                    onChange={handleInputChange}
                    className={errors.zipCode ? 'error' : ''}
                    placeholder="Enter ZIP code"
                  />
                  {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="form-section">
            <div className="section-header">
              <Phone size={24} />
              <h2>Emergency Contacts</h2>
              <span className="contact-count">{emergencyContacts.length}/10</span>
            </div>
            
            <div className="emergency-contacts">
              {emergencyContacts.map((contact, index) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h3>Contact {index + 1}</h3>
                    {emergencyContacts.length > 1 && (
                      <button
                        type="button"
                        className="remove-contact"
                        onClick={() => removeEmergencyContact(contact.id)}
                      >
                        <X size={20} />
                      </button>
                    )}
                  </div>
                  
                  <div className="contact-form-grid">
                    <div className="form-group">
                      <label>Name *</label>
                      <input
                        type="text"
                        value={contact.name}
                        onChange={(e) => handleEmergencyContactChange(contact.id, 'name', e.target.value)}
                        className={errors[`contact${contact.id}Name`] ? 'error' : ''}
                        placeholder="Contact name"
                      />
                      {errors[`contact${contact.id}Name`] && (
                        <span className="error-message">{errors[`contact${contact.id}Name`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => handleEmergencyContactChange(contact.id, 'phone', e.target.value)}
                        className={errors[`contact${contact.id}Phone`] ? 'error' : ''}
                        placeholder="Phone number"
                      />
                      {errors[`contact${contact.id}Phone`] && (
                        <span className="error-message">{errors[`contact${contact.id}Phone`]}</span>
                      )}
                    </div>

                    <div className="form-group">
                      <label>Relationship *</label>
                      <input
                        type="text"
                        value={contact.relationship}
                        onChange={(e) => handleEmergencyContactChange(contact.id, 'relationship', e.target.value)}
                        className={errors[`contact${contact.id}Relationship`] ? 'error' : ''}
                        placeholder="e.g., Spouse, Parent, Friend"
                      />
                      {errors[`contact${contact.id}Relationship`] && (
                        <span className="error-message">{errors[`contact${contact.id}Relationship`]}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
              
              {emergencyContacts.length < 10 && (
                <button
                  type="button"
                  className="add-contact-btn"
                  onClick={addEmergencyContact}
                >
                  <Plus size={20} />
                  Add Emergency Contact
                </button>
              )}
            </div>
          </div>

          {/* Permissions Section */}
          <div className="form-section">
            <div className="section-header">
              <Shield size={24} />
              <h2>Emergency Permissions</h2>
            </div>
            
            {errors.permissions && (
              <div className="permission-error">
                <AlertCircle size={20} />
                <span>{errors.permissions}</span>
              </div>
            )}

            <div className="permissions-grid">
              <div className={`permission-card ${permissions.location ? 'active' : ''}`}>
                <div className="permission-icon">
                  <Navigation size={32} />
                </div>
                <div className="permission-content">
                  <h3>Location Access</h3>
                  <p>Allow TapSOS to access your location for emergency services</p>
                  <div className="permission-toggle">
                    <input
                      type="checkbox"
                      id="location"
                      checked={permissions.location}
                      onChange={() => handlePermissionToggle('location')}
                    />
                    <label htmlFor="location">Grant Location Access</label>
                  </div>
                </div>
              </div>

              <div className={`permission-card ${permissions.sms ? 'active' : ''}`}>
                <div className="permission-icon">
                  <MessageSquare size={32} />
                </div>
                <div className="permission-content">
                  <h3>SMS Alerts</h3>
                  <p>Receive emergency alerts and updates via SMS</p>
                  <div className="permission-toggle">
                    <input
                      type="checkbox"
                      id="sms"
                      checked={permissions.sms}
                      onChange={() => handlePermissionToggle('sms')}
                    />
                    <label htmlFor="sms">Grant SMS Permission</label>
                  </div>
                </div>
              </div>

              <div className={`permission-card ${permissions.missedCall ? 'active' : ''}`}>
                <div className="permission-icon">
                  <Phone size={32} />
                </div>
                <div className="permission-content">
                  <h3>Missed Call Alerts</h3>
                  <p>Send missed call alerts to emergency contacts</p>
                  <div className="permission-toggle">
                    <input
                      type="checkbox"
                      id="missedCall"
                      checked={permissions.missedCall}
                      onChange={() => handlePermissionToggle('missedCall')}
                    />
                    <label htmlFor="missedCall">Grant Call Permission</label>
                  </div>
                </div>
              </div>

              <div className={`permission-card ${permissions.liveLocation ? 'active' : ''}`}>
                <div className="permission-icon">
                  <MapPin size={32} />
                </div>
                <div className="permission-content">
                  <h3>Live Location Sharing</h3>
                  <p>Share your live location with emergency services</p>
                  <div className="permission-toggle">
                    <input
                      type="checkbox"
                      id="liveLocation"
                      checked={permissions.liveLocation}
                      onChange={() => handlePermissionToggle('liveLocation')}
                    />
                    <label htmlFor="liveLocation">Grant Live Location</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="form-actions">
            <button
              type="submit"
              className={`save-btn ${isLoading ? 'loading' : ''} ${isSaved ? 'saved' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Clock size={20} />
                  Saving...
                </>
              ) : isSaved ? (
                <>
                  <CheckCircle size={20} />
                  Saved Successfully!
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Details
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DetailsPage;
