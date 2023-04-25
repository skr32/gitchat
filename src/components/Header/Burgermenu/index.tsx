import { useState } from 'react';
import './style.scss';

import { headerLinks } from '../Header';
import { ChangeTheme } from '../ChangeTheme';

export function Burgermenu() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button className="burgermenu" aria-expanded={isOpen} onClick={toggleMenu} style={{position: !isOpen ? 'absolute' : 'fixed',}}>
        <svg viewBox="0 0 100 100">
          <rect className="line top" rx="5"></rect>
          <rect className="line middle" rx="5"></rect>
          <rect className="line bottom" rx="5"></rect>
        </svg>
      </button>
      <div className='burgermenu__container' style={{
        transform: !isOpen ? 'translateY(-100%)' : 'translateY(0%)',
        transition: 'transform 0.5s ease'
      }}>
        <ul className='burgermenu__items'>
          {headerLinks.map((link) => (
            <li>
              <a href={link.link}>{link.title}</a>
            </li>
          ))}
          <br/>
          <ChangeTheme />
        </ul>
      </div>
    </>
  )
}
