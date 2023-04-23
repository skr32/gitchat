import { useState } from 'react';
import './style.scss';

export function Burgermenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <button className="burgermenu" aria-expanded={isOpen} onClick={toggleMenu}>
      <svg viewBox="0 0 100 100" width="250">
        {/* to do: add rect values to scss file  */}
        <rect className="line top" width="80" height="10" x="10" y="25" rx="5"></rect>
        <rect className="line middle" width="80" height="10" x="10" y="45" rx="5"></rect>
        <rect className="line bottom" width="80" height="10" x="10" y="65" rx="5"></rect>
      </svg>
    </button>
  )
}
