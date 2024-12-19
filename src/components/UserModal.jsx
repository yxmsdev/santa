import { useState } from 'react'
import instagramLogo from '/src/assets/instagram.svg?url'
import xLogo from '/src/assets/x.svg?url'

const UserModal = ({ isOpen, onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    platform: 'instagram'
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    // Basic validation
    if (!formData.name || !formData.email || !formData.phone || !formData.username) {
      alert('Please fill in all fields')
      return
    }

    // Email validation
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      alert('Please enter a valid email')
      return
    }

    // Submit the form
    onSubmit(formData)
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
              placeholder="What's your name?"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="email@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="tel"
              placeholder="+234 000 0000 000"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label>Social Handle</label>
            <div className="social-wrapper">
              <div className="platform-toggle">
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'instagram' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, platform: 'instagram' })}
                >
                  <img src={instagramLogo} alt="Instagram" />
                </button>
                <button
                  type="button"
                  className={`platform-btn ${formData.platform === 'x' ? 'active' : ''}`}
                  onClick={() => setFormData({ ...formData, platform: 'x' })}
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
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  required
                />
              </div>
            </div>
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