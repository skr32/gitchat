import './style.scss'
import { useState } from 'react'
import logo from '../../../assets/chatLogo.png'
import { ChatPreview } from './ChatPreview';

export function ChatBar() {
    const [isOpen, setIsOpen] = useState(true);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <>
            <button className="sidebar__burger"
                aria-expanded={isOpen}
                onClick={toggleMenu}
                style={{
                    position: isOpen ? 'absolute' : 'fixed',
                    left: !isOpen ? '25px' : '250px'
                }}>
                <svg viewBox="0 0 100 100">
                    <rect className="line top" rx="5"></rect>
                    <rect className="line middle" rx="5"></rect>
                    <rect className="line bottom" rx="5"></rect>
                </svg>
            </button>
            <div className='sidebar-container' style={{
                visibility: !isOpen ? 'hidden' : 'visible',
                minWidth: isOpen ? '300px' : '0',
                width: isOpen ? '0' : '80px',
            }}>
                <div className='sidebar' style={{
                    minWidth: isOpen ? '300px' : '0',
                    opacity: isOpen ? '1' : '0',
                    transform: !isOpen ? 'translateX(-500px)' : 'translateX(0)',
                    transition: 'all 0.5s ease',
                }}>
                    <div>

                        <span className='sidebar__title'>
                            <h2>CodeChat<img src={logo} alt="logo" /></h2>
                        </span>
                        <div className='sidebar__upper'>
                            <h2>Inbox</h2>
                            <input type="text" placeholder='Search Chats...'></input>
                        </div>
                    </div>
                    <div className='sidebar__preview'>
                        <ChatPreview />
                    </div>
                </div>
            </div>
        </>
    )
}