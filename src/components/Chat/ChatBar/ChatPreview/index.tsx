import './style.scss';
import logo from '../../../../assets/chatLogo.png';
import { useEffect, useState } from 'react';
import { renderMessages } from '../../Chat/Message';

import { getCurrentUserId, getAuthToken } from '../../../../Utils';

export let selectedThreadId: string = '';


export function ChatPreview({selectedThreadId, changeSelectedThreadId}: any) {
  console.log('ebene3: ' + selectedThreadId);

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<{ id: string, name: string; message: string }[]>([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/threads/allthreads', {
      headers: {
        'Authorization': `${getAuthToken()}`
      }
    })
      .then(response => response.json())
      .then(threads => {
        for (let thread of threads) {

          const threadName = thread.GroupChatName || thread.members.find((member: { _id: any }) => member._id !== getCurrentUserId)?.username || '';
          const threadLastMessage = thread?.lastMessage?.message ?? ' ';
          const newThread: { id: string, name: string, message: string } = {
            id: thread._id,
            name: threadName,
            message: threadLastMessage,
          }
          chats.push(newThread);
          setLoading(false);
        }
      });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  //changeSelectedThreadId("test")
  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className='chat-preview' id={chat.id} onClick={() => changeSelectedThreadId(chat.id)}  >
        {/* onClick={() => renderMessages(chat.id)}> */}
          {/* <img src={chat.img} alt=''></img> */}
          <span className='chat-preview__info'>
            <p className='chat-preview__info__name'>{chat.name}</p>
            <p className='chat-preview__info__message'>{chat.message}</p>
          </span>
        </div>
      ))}
    </div>
  );
}
