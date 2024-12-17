import { useState } from 'react'
import instagramLogo from '../assets/instagram.svg'
import xLogo from '../assets/x.svg'

const UserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    country: '',
    username: '',
    platform: 'instagram',
    email: '',
    phone: ''
  })

  const countries = [
    { code: 'AF', name: 'Afghanistan' },
    { code: 'AL', name: 'Albania' },
    // ... more countries
    { code: 'NG', name: 'Nigeria' },
    // ... more countries
    { code: 'ZW', name: 'Zimbabwe' }
  ].sort((a, b) => a.name.localeCompare(b.name)); // Sort alphabetically

  const handleSubmit = (e) => {
    e.preventDefault()
    onSubmit(formData)
  }

  const handlePlatformChange = (platform) => {
    setFormData(prev => ({ ...prev, platform }))
  }

  if (!isOpen) return null

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h1 className="modal-title">ONE MORE STEP!</h1>
        <p className="modal-subtitle">Kindly Fill In Your Details, Just Incase You Win!</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Whats Your name?"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Country</label>
            <input
              type="text"
              placeholder="Where Do you Live"
              list="countries"
              value={formData.country}
              onChange={(e) => setFormData({...formData, country: e.target.value})}
              required
            />
            <datalist id="countries">
              {countries.map(country => (
                <option key={country.code} value={country.name} />
              ))}
            </datalist>
          </div>

          <div className="form-group">
            <label>Social Handle</label>
            <div className="social-wrapper">
              <div className="platform-toggle">
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'instagram' ? 'active' : ''}`}
                  onClick={() => handlePlatformChange('instagram')}
                >
                  <img src={instagramLogo} alt="Instagram" />
                </button>
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'x' ? 'active' : ''}`}
                  onClick={() => handlePlatformChange('x')}
                >
                  <img src={xLogo} alt="X" />
                </button>
              </div>
              <div className="social-input">
                <span>@</span>
                <input
                  type="text"
                  placeholder="username"
                  value={formData.username}
                  onChange={(e) => setFormData({...formData, username: e.target.value})}
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>

          <div className="form-group">
            <label>Number</label>
            <input
              type="tel"
              placeholder="+234 9137363855"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>

          <button type="submit" className="submit-button">
            Spin The Fokin Wheel Now!!
          </button>
        </form>
      </div>
    </div>
  )
}

export default UserModal 