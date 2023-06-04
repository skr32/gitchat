import { useState } from 'react'
import { ChatBar } from './ChatBar'
import './style.scss'
// import { chats } from './ChatBar/ChatPreview'
// import logo from '../../assets/chatLogo.png'
import { Chat } from './Chat'

export function ChatWindow() {
    const [isExpanded] = useState(true);
    const [selectedThreadId, setSelectedThreadId] = useState('');
    const [selectedThreadName, setSelectedThreadName] = useState('');

    function changeSelectedThreadName(name: string) {
      setSelectedThreadName(name);
      console.log(selectedThreadName);
    }

    function changeSelectedThreadId(id: string) {
      setSelectedThreadId(id);
      console.log(selectedThreadId);
    }
    return (
      <>
      <div className='chat'>
        <ChatBar selectedThreadId={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} changeSelectedThreadName={changeSelectedThreadName} />
        <Chat expanded={isExpanded} selectedThreadId={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} selectedThreadName={selectedThreadName} />
      </div>
      </>
    );
  }
  