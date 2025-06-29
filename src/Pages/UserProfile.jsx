import React, { useState, useEffect } from 'react';
import Header from '../Components/Header';
import '../Components/UI/DetailsPage.css';
import { useNavigate } from 'react-router-dom';
import { User, Calendar, MapPin, Phone, Save, Shield, MessageSquare, Navigation, X } from 'lucide-react';

const demoUser = {
  firstName: 'Demo',
  lastName: 'User',
  dateOfBirth: '01-01-1990',
  address: '123 Main Street',
  city: 'Mumbai',
  state: 'Maharashtra',
  zipCode: '400001',
  phone: '+91 98765 43210',
  email: 'demo@tapsos.com',
};

const demoContacts = [
  { id: 1, name: 'Jane Doe', phone: '+91 98765 43211', relationship: 'Spouse' }
];

const demoPermissions = {
  location: true,
  sms: true,
  missedCall: false,
  liveLocation: false
};

const LOCAL_KEY = 'tapsos_user_profile';
const CONTACTS_KEY = 'tapsos_user_contacts';
const PERMISSIONS_KEY = 'tapsos_user_permissions';

const UserProfile = () => {
  const [user, setUser] = useState(demoUser);
  const [editUser, setEditUser] = useState(demoUser);
  const [contacts, setContacts] = useState(demoContacts);
  const [editContacts, setEditContacts] = useState(demoContacts);
  const [permissions, setPermissions] = useState(demoPermissions);
  const [editPermissions, setEditPermissions] = useState(demoPermissions);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setIsLoggedIn(!!localStorage.getItem('tapsos_logged_in'));
    // Load from localStorage or use demo data
    const saved = localStorage.getItem(LOCAL_KEY);
    const savedContacts = localStorage.getItem(CONTACTS_KEY);
    const savedPermissions = localStorage.getItem(PERMISSIONS_KEY);
    setUser(saved ? JSON.parse(saved) : demoUser);
    setEditUser(saved ? JSON.parse(saved) : demoUser);
    setContacts(savedContacts ? JSON.parse(savedContacts) : demoContacts);
    setEditContacts(savedContacts ? JSON.parse(savedContacts) : demoContacts);
    setPermissions(savedPermissions ? JSON.parse(savedPermissions) : demoPermissions);
    setEditPermissions(savedPermissions ? JSON.parse(savedPermissions) : demoPermissions);
  }, []);

  const handleBack = () => {
    navigate('/tap');
  };

  const handleEdit = () => {
    setEditUser(user);
    setEditContacts(contacts);
    setEditPermissions(permissions);
    setIsEditing(true);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setEditUser(user);
    setEditContacts(contacts);
    setEditPermissions(permissions);
    setIsEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleContactChange = (id, field, value) => {
    setEditContacts(prev => prev.map(contact => contact.id === id ? { ...contact, [field]: value } : contact));
  };

  const handlePermissionToggle = (perm) => {
    setEditPermissions(prev => ({ ...prev, [perm]: !prev[perm] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setUser(editUser);
    setContacts(editContacts);
    setPermissions(editPermissions);
    localStorage.setItem(LOCAL_KEY, JSON.stringify(editUser));
    localStorage.setItem(CONTACTS_KEY, JSON.stringify(editContacts));
    localStorage.setItem(PERMISSIONS_KEY, JSON.stringify(editPermissions));
    setIsEditing(false);
  };

  return (
    <div className="details-page">
      <Header isLoggedIn={isLoggedIn} />
      <div className="details-container">
        <button type="button" className="back-to-tap-home-btn" onClick={handleBack}>
          <span className="arrow-left">&#8592;</span> Back to Tap
        </button>
        <form className="details-form" onSubmit={handleSave}>
          {/* Personal Details Section */}
          <div className="form-section">
            <div className="section-header">
              <User size={24} />
              <h2>Personal Details</h2>
            </div>
            <div className="vertical-form-list">
              <div className="form-group">
                <label>First Name *</label>
                <input name="firstName" type="text" value={isEditing ? editUser.firstName : user.firstName} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="form-group">
                <label>Last Name *</label>
                <input name="lastName" type="text" value={isEditing ? editUser.lastName : user.lastName} onChange={handleChange} readOnly={!isEditing} />
              </div>
              <div className="form-group">
                <label>Date of Birth *</label>
                <input name="dateOfBirth" type="text" value={isEditing ? editUser.dateOfBirth : user.dateOfBirth} onChange={handleChange} readOnly={!isEditing} />
              </div>
            </div>
            <div className="address-section">
              <h3>Address Details</h3>
              <div className="vertical-form-list">
                <div className="form-group">
                  <label>Street Address *</label>
                  <input name="address" type="text" value={isEditing ? editUser.address : user.address} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div className="form-group">
                  <label>State *</label>
                  <input name="state" type="text" value={isEditing ? editUser.state : user.state} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div className="form-group">
                  <label>City *</label>
                  <input name="city" type="text" value={isEditing ? editUser.city : user.city} onChange={handleChange} readOnly={!isEditing} />
                </div>
                <div className="form-group">
                  <label>ZIP Code *</label>
                  <input name="zipCode" type="text" value={isEditing ? editUser.zipCode : user.zipCode} onChange={handleChange} readOnly={!isEditing} />
                </div>
              </div>
            </div>
          </div>

          {/* Emergency Contacts Section */}
          <div className="form-section">
            <div className="section-header">
              <Phone size={24} />
              <h2>Emergency Contacts</h2>
              <span className="contact-count">{contacts.length}/10</span>
            </div>
            <div className="emergency-contacts">
              {contacts.map((contact, index) => (
                <div key={contact.id} className="contact-card">
                  <div className="contact-header">
                    <h3>Contact {index + 1}</h3>
                  </div>
                  <div className="vertical-form-list">
                    <div className="form-group">
                      <label>Name *</label>
                      <input type="text" value={isEditing ? editContacts[index].name : contact.name} onChange={e => handleContactChange(contact.id, 'name', e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Phone Number *</label>
                      <input type="text" value={isEditing ? editContacts[index].phone : contact.phone} onChange={e => handleContactChange(contact.id, 'phone', e.target.value)} readOnly={!isEditing} />
                    </div>
                    <div className="form-group">
                      <label>Relationship *</label>
                      <input type="text" value={isEditing ? editContacts[index].relationship : contact.relationship} onChange={e => handleContactChange(contact.id, 'relationship', e.target.value)} readOnly={!isEditing} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Emergency Permissions Section */}
          <div className="form-section">
            <div className="section-header">
              <Shield size={24} />
              <h2>Emergency Permissions</h2>
            </div>
            <div className="permissions-grid">
              <div className={`permission-card ${permissions.location ? 'active' : ''}`}>
                <div className="permission-icon">
                  <Navigation size={32} />
                </div>
                <div className="permission-content">
                  <h3>Location Access</h3>
                  <p>Allow TapSOS to access your location for emergency services</p>
                  <div className="permission-toggle">
                    <input type="checkbox" checked={isEditing ? editPermissions.location : permissions.location} onChange={() => handlePermissionToggle('location')} disabled={!isEditing} />
                    <label>Grant Location Access</label>
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
                    <input type="checkbox" checked={isEditing ? editPermissions.sms : permissions.sms} onChange={() => handlePermissionToggle('sms')} disabled={!isEditing} />
                    <label>Grant SMS Permission</label>
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
                    <input type="checkbox" checked={isEditing ? editPermissions.missedCall : permissions.missedCall} onChange={() => handlePermissionToggle('missedCall')} disabled={!isEditing} />
                    <label>Grant Call Permission</label>
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
                    <input type="checkbox" checked={isEditing ? editPermissions.liveLocation : permissions.liveLocation} onChange={() => handlePermissionToggle('liveLocation')} disabled={!isEditing} />
                    <label>Grant Live Location</label>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Save/Cancel/Edit Buttons */}
          <div className="form-actions">
            {isEditing ? (
              <>
                <button type="button" className="profile-cancel-btn" onClick={handleCancel}>Cancel</button>
                <button type="submit" className="save-btn">
                  <Save size={20} style={{marginRight: 8, marginBottom: -3}} /> Save Changes
                </button>
              </>
            ) : (
              <button type="button" className="save-btn" onClick={handleEdit}>Edit</button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserProfile; 