const NoSpinsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content no-spins-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h1 className="modal-title">
          Game Over!
        </h1>

        <div className="no-spins-content">
          <p>You've used all your spins</p>
          <p>Visit our store to get your Eko Calendar</p>
        </div>

        <a 
          href="#" 
          className="submit-button"
          onClick={() => {
            onClose();
            // Add store URL here
          }}
        >
          Visit Store
        </a>
      </div>
    </div>
  );
};

export default NoSpinsModal; 