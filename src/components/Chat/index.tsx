import { useState } from 'react'
import { ChatBar } from './ChatBar'
import './style.scss'
// import { chats } from './ChatBar/ChatPreview'
// import logo from '../../assets/chatLogo.png'
import { Chat } from './Chat'

export function ChatWindow() {
    const [isExpanded] = useState(true);
  
    return (
      <>
      <div className='chat'>
        <ChatBar />
        <Chat expanded={isExpanded} />
      </div>
      </>
    );
  }
  