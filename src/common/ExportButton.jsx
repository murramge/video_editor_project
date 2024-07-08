const ExportButton = ({ onClick, children }) => {
  return (
    <button className="export_button" onClick={onClick}>
      {children}
    </button>
  );
};

export default ExportButton;
