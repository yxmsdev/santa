import { useState, useEffect } from 'react'
import useSound from 'use-sound'
import Confetti from 'react-confetti'
import logo from './assets/logo.png'
import bridge from './assets/bridge.svg'
import './App.css'
import UserModal from './components/UserModal'
import CongratsModal from './components/CongratsModal'
import NoSpinsModal from './components/NoSpinsModal'

function App() {
  const [result, setResult] = useState(null)
  const [isSpinning, setIsSpinning] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)
  const [rotation, setRotation] = useState(0)
  const [lastResult, setLastResult] = useState(null)
  const [spinCount, setSpinCount] = useState(5)
  const [showModal, setShowModal] = useState(false)
  const [userInfo, setUserInfo] = useState(null)
  const [showCongratsModal, setShowCongratsModal] = useState(false)
  const [showNoSpinsModal, setShowNoSpinsModal] = useState(false)
  
  const [playSpinSound] = useSound('/spin.mp3', { volume: 0.5 })
  const [playWinSound] = useSound('/win.mp3', { volume: 0.5 })
  
  const handleSpin = () => {
    if (!userInfo) {
      setShowModal(true)
      return
    }
    
    if (isSpinning) return
    
    if (spinCount <= 0) {
      setShowNoSpinsModal(true)
      return
    }
    
    setIsSpinning(true)
    setShowConfetti(false)
    const isLastSpin = spinCount === 1
    setSpinCount(prev => prev - 1)
    playSpinSound()
    
    const getNewNumber = () => {
      const randomDay = Math.floor(Math.random() * 31) + 1
      if (!lastResult) return randomDay
      
      const distance = Math.min(
        Math.abs(randomDay - lastResult),
        Math.abs(31 - Math.abs(randomDay - lastResult))
      )
      
      return distance >= 8 ? randomDay : getNewNumber()
    }
    
    const randomDay = getNewNumber()
    
    const degreesPerNumber = 360 / 31
    const targetRotation = -(randomDay - 1) * degreesPerNumber
    const fullRotations = 5 * 360
    const newRotation = fullRotations + targetRotation
    
    setRotation(newRotation)
    
    setTimeout(() => {
      setResult(randomDay)
      setLastResult(randomDay)
      setIsSpinning(false)
      setShowConfetti(randomDay === 25)
      playWinSound()
      
      if (randomDay === 25) {
        setShowCongratsModal(true)
      } else if (isLastSpin) {
        setShowNoSpinsModal(true)
      }
    }, 4000)
  }

  const handleUserSubmit = (data) => {
    setUserInfo(data)
    setShowModal(false)
    handleSpin()
  }

  const formatDoubleDigits = (num) => {
    return num.toString().padStart(2, '0');
  }

  // Generate the numbers for the ring
  const ringNumbers = Array.from({ length: 31 }, (_, i) => {
    const number = (i + 1).toString().padStart(2, '0')
    const angle = i * (360 / 31)
    const ringRadius = 255
    return (
      <div
        key={i}
        className="ring-number"
        style={{
          transform: `
            rotate(${angle}deg)
            translateY(-${ringRadius}px)
          `
        }}
      >
        {number}
      </div>
    )
  })

  const handleSpinComplete = (number) => {
    if (number === 25) {
      setShowCongratsModal(true);
    }
  }

  return (
    <div className="container">
      <div className="stars">
        {[...Array(100)].map((_, i) => (
          <div 
            key={i} 
            className="star" 
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              width: `${Math.random() * 3}px`,
              height: `${Math.random() * 3}px`,
              opacity: Math.random() * 0.7
            }} 
          />
        ))}
      </div>
      <a href="#" className="store-link">Store</a>
      
      {showConfetti && <Confetti 
        width={window.innerWidth}
        height={window.innerHeight}
        recycle={false}
        numberOfPieces={200}
        colors={[
          '#A50C00',  // Deep Red
          '#0F8A5F',  // Christmas Green
          '#FFD700',  // Gold
          '#FFFFFF',  // White
          '#146B3A',  // Dark Green
          '#EA4630',  // Bright Red
          '#F8B229'   // Golden Yellow
        ]}
      />}
      
      <div className="content-left">
        <header>
          <div className="logo-container">
            <img src={logo} alt="The Wild Ones" className="main-logo" />
          </div>
          <h2 className="subtitle">CHRISTMAS GIVEAWAY</h2>
        </header>

        <p className="description">
          Match the magical number 25, when you spin the Eko Wheel and<br />
        stand a chance of winning an Eko Calendar. <br />
         Merry Christmas!🎄</p>

        <button 
          className={`spin-button ${spinCount <= 0 ? 'disabled' : ''}`}
          onClick={handleSpin}
          disabled={isSpinning || spinCount <= 0}
        >
          {spinCount > 0 ? 'Spin' : 'No spins left'}
        </button>
        
        {spinCount > 0 && (
          <p className="spins-left">
            {spinCount} spin{spinCount !== 1 ? 's' : ''} remaining
          </p>
        )}
      </div>

      {result && !isSpinning && (
        <div className="result">
          <p>You Got:</p>
          <h2>{formatDoubleDigits(result)}</h2>
        </div>
      )}

      <div className="wheel-container">
        <div className="wheel-outer">
          <div className="wheel-position">
            <div 
              className={`wheel-rotation ${isSpinning ? 'spinning' : ''}`}
              style={{
                transform: `rotate(${rotation}deg)`
              }}
            >
              <div className="wheel-ring">
                <div className="ring-circle">
                  {ringNumbers}
                </div>
              </div>
            </div>
          </div>

          <div className="wheel-bridge">
            <img src={bridge} alt="" className="bridge-svg" />
          </div>
        </div>
      </div>

      <UserModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleUserSubmit}
      />

      <CongratsModal 
        isOpen={showCongratsModal}
        onClose={() => setShowCongratsModal(false)}
      />

      <NoSpinsModal 
        isOpen={showNoSpinsModal}
        onClose={() => setShowNoSpinsModal(false)}
      />
    </div>
  )
}

export default App
