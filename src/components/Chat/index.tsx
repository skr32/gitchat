import { useState } from 'react'
import { ChatBar } from './ChatBar'
import './style.scss'
// import { chats } from './ChatBar/ChatPreview'
// import logo from '../../assets/chatLogo.png'
import { Chat } from './Chat'

export function ChatWindow() {
    const [isExpanded, setIsExpanded] = useState(true);
  
    const toggleMenu = () => {
      setIsExpanded(!isExpanded);
    };
  
    return (
      <>
      <div className='chat'>
        <ChatBar isExpanded={isExpanded} toggle={toggleMenu} />
        <Chat expanded={isExpanded} />
      </div>
      </>
    );
  }
  