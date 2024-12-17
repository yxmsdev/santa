const CongratsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content congrats-modal">
        <button className="modal-close" onClick={onClose}>×</button>
        
        <h1 className="modal-title">
          Congratulations!
        </h1>

        <div className="congrats-content">
          <p>You've won an Eko Calendar </p>
          <p>We'll be in touch via your provided contact details with information about your prize.</p>
        </div>
      </div>
    </div>
  );
};

export default CongratsModal; 