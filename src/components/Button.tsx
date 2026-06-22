import React from 'react';
import './Button.css';

type Props = {
  label: string;
  onClick: () => void;
  className?: string;
};

const Button: React.FC<Props> = ({ label, onClick, className }) => (
  <button className={`calc-button ${className ?? ''}`} onClick={onClick}>
    {label}
  </button>
);

export default Button;
