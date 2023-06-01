import { useEffect, useState } from 'react';
import './style.scss'
import { getAuthToken, getCurrentUsername } from '../../../../Utils';

let returnedThreadId: any = null;
export function renderMessages(threadId: any) {
    returnedThreadId = threadId;
    console.log('here' + returnedThreadId);
    return (threadId);
}
export function Message() {
    const [processedMessages, setProcessedMessages] = useState<{ name: string, message: string, date: Date }[]>([]);

    useEffect(() => {
    }, [returnedThreadId]);
   // setTimeout(() => console.log(returnedThreadId), 3000)

    useEffect(() => {

        // to do: make threadId dynamic
        console.log(returnedThreadId);
        //  fetch('http://localhost:5000/api/messages/allmessages?thread=' + returnedThreadId, {
        fetch('http://localhost:5000/api/messages/allmessages?thread=64779063ade42ab9cb3b1fe1', {
            headers: {
                'Authorization': `${getAuthToken()}`
            }
        })
            .then(response => response.json())
            .then(messages => {
                const newMessages = messages.map((message: { fromUsername: string; message: string; date: Date; }) => {
                    const isCurrentUser = getCurrentUsername() === message.fromUsername;
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