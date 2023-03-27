import React from "react";

const Footer = ({ onFormOpen }) => {
  return (
    <footer>
      <button className="add-button" onClick={onFormOpen}>
        <span className="add-icon">+</span>
      </button>
    </footer>
  );
};

export default Footer;
