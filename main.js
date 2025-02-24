import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

const App = () => {
  const [score, setScore] = useState(0);
  const [multiplier, setMultiplier] = useState(1);
  const [buttonSize, setButtonSize] = useState(100);
  const [buttonColor, setButtonColor] = useState('#ff4444');
  const [message, setMessage] = useState('Start clicking!');
  const [eventCounter, setEventCounter] = useState(0);
  const [isBossFight, setIsBossFight] = useState(false);
  const [bossHealth, setBossHealth] = useState(30);
  const [bossTimer, setBossTimer] = useState(30);
  const [buttonHat, setButtonHat] = useState(null);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [ownedItems, setOwnedItems] = useState([]);
  const shopItems = [
    { id: 'hat1', type: 'hat', name: 'Party Hat', price: 100, style: '🎉' },
    { id: 'hat2', type: 'hat', name: 'Crown', price: 200, style: '👑' },
    { id: 'color1', type: 'color', name: 'Golden', price: 150, style: '#FFD700' },
    { id: 'color2', type: 'color', name: 'Neon', price: 300, style: '#39FF14' },
    { id: 'multiplier1', type: 'multiplier', name: 'Double Click', price: 500, value: 2 },
    { id: 'multiplier2', type: 'multiplier', name: 'Triple Click', price: 1000, value: 3 },
  ];

  // Random events that can occur
  const randomEvents = [
    {
      name: 'Double Trouble',
      effect: () => {
        setMultiplier(prev => prev * 2);
        setMessage('DOUBLE POINTS ACTIVATED!');
        setTimeout(() => {
          setMultiplier(prev => prev / 2);
          setMessage('Back to normal...');
        }, 5000);
      }
    },
    {
      name: 'Button Growth',
      effect: () => {
        setButtonSize(prev => prev * 1.5);
        setMessage('THE BUTTON GROWS HUNGRY!');
        setTimeout(() => {
          setButtonSize(100);
          setMessage('The button calms down');
        }, 3000);
      }
    },
    {
      name: 'Color Chaos',
      effect: () => {
        const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
        setButtonColor(randomColor);
        setMessage('RAINBOW POWER!');
      }
    },
    {
      name: 'Score Roulette',
      effect: () => {
        const random = Math.random();
        if (random > 0.5) {
          setScore(prev => prev * 2);
          setMessage('JACKPOT! Score doubled!');
        } else {
          setScore(prev => Math.floor(prev / 2));
          setMessage('Oops! Score halved!');
        }
      }
    }
  ];

  const handleClick = () => {
    setScore(prev => prev + multiplier);
    setEventCounter(prev => prev + 1);

    // Trigger random events or boss fight
    if (eventCounter > 0) {
      if (eventCounter % 10 === 0) {
        const randomEvent = randomEvents[Math.floor(Math.random() * randomEvents.length)];
        randomEvent.effect();
      }
      // 5% chance to trigger boss fight
      if (Math.random() < 0.05 && !isBossFight) {
        startBossFight();
      }
    }
    // Handle boss fight clicks
    if (isBossFight) {
      setBossHealth(prev => Math.max(0, prev - 1));
      if (bossHealth <= 0) {
        endBossFight(true);
      }
    }
  };
  const startBossFight = () => {
    setIsBossFight(true);
    setBossHealth(30);
    setBossTimer(30);
    setMessage('BOSS FIGHT STARTED! CLICK FAST!');
  };
  const endBossFight = (victory) => {
    setIsBossFight(false);
    setBossHealth(30);
    setBossTimer(30);
    if (victory) {
      setScore(prev => prev + 100);
      setMessage('Boss defeated! +100 points!');
    } else {
      setScore(prev => Math.max(0, prev - 200));
      setMessage('Boss won! -200 points!');
    }
  };
  // Boss fight timer
  useEffect(() => {
    let interval;
    if (isBossFight) {
      interval = setInterval(() => {
        setBossTimer(prev => {
          if (prev <= 0) {
            endBossFight(false);
            return 30;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isBossFight]);

  // Button animation style
  const buttonStyle = {
    width: `${buttonSize}px`,
    height: `${buttonSize}px`,
    backgroundColor: buttonColor,
    border: 'none',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    fontSize: `${buttonSize/8}px`,
    color: 'white',
    fontWeight: 'bold',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
  };

  const purchaseItem = (item) => {
    if (score >= item.price && !ownedItems.includes(item.id)) {
      setScore(prev => prev - item.price);
      setOwnedItems(prev => [...prev, item.id]);
      
      switch (item.type) {
        case 'hat':
          setButtonHat(item.style);
          break;
        case 'color':
          setButtonColor(item.style);
          break;
        case 'multiplier':
          setMultiplier(prev => prev + item.value - 1);
          break;
      }
    }
  };
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#1a1a1a',
      color: 'white',
      fontFamily: 'Arial, sans-serif'
    }}>
      <h1 style={{ 
        fontSize: '2.5em', 
        marginBottom: '20px',
        color: buttonColor,
        transition: 'color 0.3s ease'
      }}>
        Clicker of Doom
      </h1>
      
      <div style={{
        fontSize: '1.5em',
        marginBottom: '20px'
      }}>
        Score: {score}
      </div>

      <div style={{
        height: '50px',
        marginBottom: '20px',
        color: '#ff9900',
        fontSize: '1.2em'
      }}>
        {message}
      </div>

      {isBossFight && (
        <div style={{
          position: 'absolute',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          textAlign: 'center'
        }}>
          <div style={{ fontSize: '24px', color: '#ff0000' }}>
            Boss Health: {bossHealth}/30
          </div>
          <div style={{ fontSize: '20px', color: '#ffff00' }}>
            Time Left: {bossTimer}s
          </div>
        </div>
      )}
      <button 
        onClick={handleClick}
        style={{
          ...buttonStyle,
          position: 'relative'
        }}
        onMouseDown={e => e.target.style.transform = 'scale(0.95)'}
        onMouseUp={e => e.target.style.transform = 'scale(1)'}
        onMouseLeave={e => e.target.style.transform = 'scale(1)'}
      >
        {buttonHat && (
          <div style={{
            position: 'absolute',
            top: '-30px',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '24px'
          }}>
            {buttonHat}
          </div>
        )}
        {isBossFight ? '👊 PUNCH!' : 'CLICK ME'}
      </button>
      <button
        onClick={() => setIsShopOpen(!isShopOpen)}
        style={{
          margin: '20px',
          padding: '10px 20px',
          backgroundColor: '#444',
          border: 'none',
          borderRadius: '5px',
          color: 'white',
          cursor: 'pointer'
        }}
      >
        {isShopOpen ? 'Close Shop' : 'Open Shop'}
      </button>
      {isShopOpen && (
        <div style={{
          position: 'absolute',
          right: '20px',
          top: '50%',
          transform: 'translateY(-50%)',
          backgroundColor: '#333',
          padding: '20px',
          borderRadius: '10px',
          maxHeight: '80vh',
          overflowY: 'auto'
        }}>
          <h2>Shop</h2>
          {shopItems.map(item => (
            <div key={item.id} style={{
              margin: '10px 0',
              padding: '10px',
              backgroundColor: '#444',
              borderRadius: '5px'
            }}>
              <div>{item.name} - {item.price} points</div>
              <button
                onClick={() => purchaseItem(item)}
                disabled={score < item.price || ownedItems.includes(item.id)}
                style={{
                  padding: '5px 10px',
                  backgroundColor: score < item.price ? '#666' : '#007bff',
                  border: 'none',
                  borderRadius: '3px',
                  color: 'white',
                  cursor: score < item.price ? 'not-allowed' : 'pointer'
                }}
              >
                {ownedItems.includes(item.id) ? 'Owned' : 'Buy'}
              </button>
            </div>
          ))}
        </div>
      )}

      <div style={{
        marginTop: '20px',
        fontSize: '0.8em',
        color: '#666'
      }}>
        Current Multiplier: x{multiplier}
      </div>
    </div>
  );
};

const container = document.getElementById('renderDiv');
const root = ReactDOM.createRoot(container);
root.render(<App />);
