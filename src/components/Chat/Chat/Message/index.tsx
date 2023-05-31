import { useEffect, useState } from 'react';
import './style.scss'
let messages = [
   {me:true, text:'lkjlklkasdflkdsajfldsjföalskfjakfjakdsjfasfdsaj'},
   {me:true, text:'lkjleorituiokj'},
   {me:false, text:'dsfdsKAÖDLFSJHKGDDFGHEIRWUHGUEIf'},
   {me:true, text:'lkjlyxcvkj'},
   {me:false, text:'dsfdsf'},
   {me:true, text:'lkjlafdsakj'},
   {me:true, text:'lkjbncvlkj'},
   {me:false, text:'dsfasdfdsf'},
   {me:true, text:'lkjlkj'},
   {me:false, text:'dsfhgdsf'},
   {me:true, text:'lkjlasdfkj'},
   {me:true, text:'lkjlkj'},
   {me:false, text:'dsfsdfjhdsf'},
   {me:true, text:'lkjlhgjkj'},
   {me:false, text:'dsf4fghdsf'},
]
export function Message() {
    const [chats, setChats] = useState<{ name: string; message: string }[]>([]);

    useEffect(() => {
      const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzcyYzk0MmM0MDhjNGI5MzRmYWU1OSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjg1NTMxODEzLCJleHAiOjE3MTcwODg3Mzl9.mCre5BG5C5psHn7Eqe3W1F3IPSLam2os8Jrv7B66HDo';
      const threadId = e.target.getAttribute('data-thread-id');
      fetch('http://localhost:5000/api/messages/allmessages?thread=' + threadId, {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then(response => response.json())
        .then(messages => {messages.forEach(message => addMessage(message))})
        .then(() => {
            // Scroll to bottom of message list
            messagesList.scrollTop = messagesList.scrollHeight;
        })
        .catch(error => console.error(error));

    // // Prevent form submission and send message to server on button click
    // const form = document.querySelector('#chat-window form');
    // form.addEventListener('submit', e => {
    //     e.preventDefault();
    //     const input = document.getElementById('message-input');
    //     const message = input.value;
    //     input.value = '';

    //     if (message === '') {
    //         return;
    //     }

    }, []);
    
    return(
        <>
        {messages.map((message) => (
            <> 
            <div className={`message ${message.me ? 'right-corner' : 'left-corner'}`} key={message.text}>
                {message.text}
            </div>
            </>
        )
            )}
        </>
    )
}