import { useState } from 'react'
import { ChatBar } from './ChatBar'
import './style.scss'
// import { chats } from './ChatBar/ChatPreview'
// import logo from '../../assets/chatLogo.png'
import { Chat } from './Chat'

export function ChatWindow() {
    const [isExpanded] = useState(true);
    const [selectedThreadId, setSelectedThreadId] = useState('');
    function changeSelectedThreadId(id: string) {
      setSelectedThreadId(id);
      console.log(selectedThreadId);
    }
    return (
      <>
      <div className='chat'>
        <ChatBar selectedThreadId={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} />
        <Chat expanded={isExpanded} selectedThreadId={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} />
      </div>
      </>
    );
  }
  