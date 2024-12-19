import { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound'
import Confetti from 'react-confetti'
import logo from '/src/assets/logo.png?url'
import bridge from '/src/assets/bridge.svg?url'
import './App.css'
import UserModal from './components/UserModal'
import CongratsModal from './components/CongratsModal'
import NoSpinsModal from './components/NoSpinsModal'
import { db } from './firebase'
import { collection, addDoc, doc, updateDoc, getDocs, query, where } from 'firebase/firestore'

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
  
  // Create ref for victory sound
  const victorySound = useRef(new Audio('/vict.mp3'))
  
  // Set up victory sound on mount
  useEffect(() => {
    victorySound.current.volume = 0.5
    // Preload the sound
    victorySound.current.load()
  }, [])

  // Initialize other sounds
  const [playSpinSound] = useSound('/spin.mp3', { 
    volume: 0.5,
    html5: true,
    pool: 1
  })
  const [playWinSound] = useSound('/win.mp3', { 
    volume: 0.5,
    html5: true,
    pool: 1
  })

  const handleUserSubmit = async (data) => {
    try {
      // Check for existing email or phone
      const emailQuery = await getDocs(
        query(collection(db, 'participants'), where('email', '==', data.email))
      )
      const phoneQuery = await getDocs(
        query(collection(db, 'participants'), where('phone', '==', data.phone))
      )

      if (!emailQuery.empty) {
        alert('This email has already been used')
        return
      }

      if (!phoneQuery.empty) {
        alert('This phone number has already been used')
        return
      }

      // If no duplicates, proceed with registration
      const initialData = {
        ...data,
        timestamp: new Date(),
        spinResult: null,
        lastSpin: null,
        isWinner: false,
        spinsRemaining: 5
      }
      
      const docRef = await addDoc(collection(db, 'participants'), initialData)
      
      setUserInfo({
        ...data,
        docId: docRef.id,
        isWinner: false,
        spinsRemaining: 5
      })
      setShowModal(false)
      
      setTimeout(() => {
        handleSpin(docRef.id)
      }, 0)

    } catch (error) {
      console.error('Failed to save participant:', error)
    }
  }

  const handleSpin = async (docId = null) => {
    if (!userInfo) {
      setShowModal(true)
      return
    }
    if (isSpinning) return
    if (userInfo.isWinner) {
      setShowCongratsModal(true)
      return
    }
    if (spinCount <= 0) {
      setShowNoSpinsModal(true)
      return
    }

    setIsSpinning(true)
    setShowConfetti(false)
    playSpinSound()
    
    // Get spin result
    const randomDay = getNewNumber()
    const isWinner = randomDay === 25
    const isLastSpin = spinCount === 1
    
    // Calculate rotation
    const degreesPerNumber = 360 / 31
    const targetRotation = -(randomDay - 1) * degreesPerNumber
    const fullRotations = 5 * 360
    const newRotation = fullRotations + targetRotation
    
    setRotation(newRotation)
    setSpinCount(prev => prev - 1)

    // Wait for animation
    setTimeout(async () => {
      // Update states first
      setResult(randomDay)
      setLastResult(randomDay)
      setIsSpinning(false)

      // Update database immediately with the spin result
      if (userInfo.docId) {
        try {
          const participantRef = doc(db, 'participants', userInfo.docId)
          const updateData = {
            spinResult: randomDay,
            lastSpin: spinCount === 1 ? randomDay : null,
            isWinner: randomDay === 25,
            spinsRemaining: spinCount - 1
          }
          
          console.log('Attempting to update database with:', updateData)
          await updateDoc(participantRef, updateData)
          console.log('Successfully updated database')
        } catch (error) {
          console.error('Failed to update spin result:', error)
        }
      }

      // Handle win/lose conditions after database update
      if (isWinner) {
        setShowConfetti(true)
        victorySound.current.currentTime = 0
        victorySound.current.play().catch(e => console.error('Victory sound error:', e))
        setShowCongratsModal(true)
        setUserInfo(prev => ({ ...prev, isWinner: true }))
      } else {
        playWinSound()
        if (isLastSpin) {
          setShowNoSpinsModal(true)
        }
      }
    }, 4000)
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

  const getNewNumber = () => {
    const randomDay = Math.floor(Math.random() * 31) + 1
    if (!lastResult) return randomDay
    
    const distance = Math.min(
      Math.abs(randomDay - lastResult),
      Math.abs(31 - Math.abs(randomDay - lastResult))
    )
    
    return distance >= 8 ? randomDay : getNewNumber()
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
