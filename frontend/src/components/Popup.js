import ReactModal from "react-modal";

const ErrorPopup = ({ isOpen, onClose }) => {
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Error Popup"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          padding: "2rem",
          borderRadius: "8px",
          width: "300px",
          margin: "0 auto",
        },
      }}
    >
      <h2>Error</h2>
      <button onClick={onClose}>Close</button>
    </ReactModal>
  );
};

export default ErrorPopup;
