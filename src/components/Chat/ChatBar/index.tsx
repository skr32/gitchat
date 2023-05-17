import './style.scss'
import { useEffect, useState } from 'react'
import logo from '../../../assets/chatLogo.png'
import { ChatPreview } from './ChatPreview';

export function ChatBar( { toggle }:any ) {
    const [isOpen, setIsOpen] = useState(true);

    // useEffect(() => {
    //     if (!isOpen) {
    //       const timeoutId = setTimeout(() => {
    //         setIsOpen(false);
    //       }); // Adjust the delay time (in milliseconds) as needed
    
    //       return () => clearTimeout(timeoutId);
    //     }
    //   }, [isOpen]);
    
      const toggleMenu = () => {
        setIsOpen(!isOpen);
      };

    return (
        <>
            <button className="sidebar__burger"
                aria-expanded={isOpen}
                onClick={toggleMenu}
                style={{ position: isOpen ? 'absolute' : 'fixed', left: !isOpen ? '25px' : '250px'}}>
                <svg viewBox="0 0 100 100">
                    <rect className="line top" rx="5"></rect>
                    <rect className="line middle" rx="5"></rect>
                    <rect className="line bottom" rx="5"></rect>
                </svg>
            </button>
        <div className='sidebar-container' style={{visibility: !isOpen ? 'hidden' : 'visible', width: isOpen ? '300px' : '80px',}}>
            <div className='sidebar' style={{
                minWidth: isOpen ? '300px' : '0',
                visibility: !isOpen ? 'hidden' : 'visible',
                transform: !isOpen ? 'translateX(-100%)' : 'translateX(0%)',
                transition: 'all 0.5s ease',
            }}>
                <span className='sidebar__title'>
                <h2>CodeChat<img src={logo} alt="logo" /></h2>
                </span>
                <div className='sidebar__upper'>
                    <span></span>
                    <h2>Inbox</h2>
                    <input type="text" placeholder='Search Chats...'></input>
                    <span></span>
                </div>
                <div className='sidebar__preview'>
                    <ChatPreview />
                </div>
            </div>
            </div>
        </>
    )
}