import './style.scss';
import { useEffect, useState } from 'react';

import { getCurrentUserId, getAuthToken, backend_url } from '../../../../Utils';

export let selectedThreadId: string = '';


export function ChatPreview({selectedThreadId, changeSelectedThreadId, changeSelectedThreadName}: any) {
  console.log('ebene3: ' + selectedThreadId);

  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState<{ id: string, name: string; message: string }[]>([]);

  useEffect(() => {
    
    fetch(backend_url + '/api/threads/allthreads', {
      headers: {
        'Authorization': `${getAuthToken()}`
      }
    })
      .then(response => response.json())
      .then(threads => {
        for (let thread of threads) {
          
          let threadName = thread.GroupChatName || '';
          if(!thread.GroupChatName) {
            threadName = thread.members.filter((element: any) => element._id != getCurrentUserId()).map((obj: any) => obj.username).join(", ")
          }
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
  function selectChat(id: string, name: string) {
    changeSelectedThreadId(id);
    changeSelectedThreadName(name);
  }

  if (loading) {
    return <div className='chat-preview__empty'>This place seems a bit quiet. Shall we kick-start a new chat together?</div>;
  }
  //changeSelectedThreadId("test")
  return (
    <div>
      {chats.map((chat, index) => (
        <div key={index} className='chat-preview' id={chat.id} onClick={() => selectChat(chat.id, chat.name)}  >
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
