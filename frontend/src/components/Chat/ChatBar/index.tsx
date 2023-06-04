import './style.scss'
import { useState } from 'react'
import logo from '../../../assets/chatLogo.png'
import { ChatPreview, selectedThreadId } from './ChatPreview';
import { Settings } from './Settings';
import { CreateChat } from './CreateChat';
import { LogOut } from '../Chat/LogOut';

export function ChatBar({selectedThreadId, changeSelectedThreadId}: any) {
    const [isOpen, setIsOpen] = useState(true);
    console.log('ebene2: '+selectedThreadId);
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
                            <h2>Inbox &nbsp;<Settings /> </h2>
                            <CreateChat />
                        </div>
                    </div>
                    <div className='sidebar__preview'>
                        <ChatPreview key={selectedThreadId} selectedThreadId={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} />
                    </div>
                    <LogOut />
                </div>
            </div>
        </>
    )
}