import { useEffect, useState } from 'react';
import './style.scss'

let returnedThreadId: any = null;
export function renderMessages(threadId:any){
    returnedThreadId = threadId;
        return(threadId);
}
export function Message() {
    const [processedMessages, setProcessedMessages] = useState<{ name: string, message: string, date: Date }[]>([]);
    // const token = localStorage.getItem('token');
    const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzcyYzk0MmM0MDhjNGI5MzRmYWU1OSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjg1NTMxODEzLCJleHAiOjE3MTcwODg3Mzl9.mCre5BG5C5psHn7Eqe3W1F3IPSLam2os8Jrv7B66HDo';
    function parseJwt(token:string) {
        var base64Url = token.split('.')[1];
        var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        var jsonPayload = decodeURIComponent(window.atob(base64).split('').map(function (c) {
            return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        }).join(''));

        return JSON.parse(jsonPayload);
    }
    const decodedToken = parseJwt(token);

    useEffect(() => {
      }, [returnedThreadId]);
      setTimeout(() => console.log(returnedThreadId), 3000)
    useEffect(() => {
        // to do: make threadId dynamic
    //   const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzcyYzk0MmM0MDhjNGI5MzRmYWU1OSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjg1NTMxODEzLCJleHAiOjE3MTcwODg3Mzl9.mCre5BG5C5psHn7Eqe3W1F3IPSLam2os8Jrv7B66HDo';
      const token = localStorage.getItem('token');
      console.log(returnedThreadId);
    //  fetch('http://localhost:5000/api/messages/allmessages?thread=' + returnedThreadId, {
      fetch('http://localhost:5000/api/messages/allmessages?thread=64779063ade42ab9cb3b1fe1', {
        headers: {
            'Authorization': `${token}`
        }
    })
        .then(response => response.json())
        .then(messages => {
            const newMessages = messages.map((message: { fromUsername: string; message: string; date: Date; }) => {
              const isCurrentUser = decodedToken.name === message.fromUsername;
              return {
                name: isCurrentUser ? 'true' : 'false',
                message: message.message,
                date: message.date
              };
            });
    
            setProcessedMessages(prevMessages => [...prevMessages, ...newMessages]);
          })
          .catch(error => {
            console.error('Error fetching messages:', error);
          });
      }, []);

    return (
        <>
        {processedMessages.length > 0 ? (
        processedMessages.map((message, index) => (
          <div
          className={`message ${message.name === 'true' ? 'right-corner' : 'left-corner'}`}
            key={index}
          >
            {message.message}
          </div>
        ))
      ) : (
        <div>Loading messages...</div>
      )}
        </>
    )
}