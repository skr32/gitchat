import { useState } from 'react';
import './style.scss';

export function Burgermenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button className="burgermenu" aria-expanded={isOpen} onClick={toggleMenu}>
      <svg viewBox="0 0 100 100">
        <rect className="line top" rx="5"></rect>
        <rect className="line middle" rx="5"></rect>
        <rect className="line bottom" rx="5"></rect>
      </svg>
    </button>
  )
}
