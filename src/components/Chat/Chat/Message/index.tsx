import { useEffect, useRef } from 'react';
import './style.scss'
import { getAuthToken, getCurrentUserId, } from '../../../../Utils';

let returnedThreadId: any = null;
export function renderMessages(threadId: any) {
    returnedThreadId = threadId;
    console.log('here' + returnedThreadId);
    return (threadId);
}
export function Message({ selectedThreadId, messageList, setMessageList }: any) {
    const messagesEndRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (messagesEndRef.current !== null) { // check that the ref object is not null
          // Scroll to the end of the chat window on load
          messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
        }
      }, [messageList]); // add messageList as a dependency to re-trigger effect when new messages are added
    


    console.log('ebeneMessage: ' + selectedThreadId);
    console.log(messageList)
    useEffect(() => {

        // to do: make threadId dynamic
        console.log(returnedThreadId);
        if (selectedThreadId) {
            fetch('http://localhost:5000/api/messages/allmessages?thread=' + selectedThreadId, {
                headers: {
                    'Authorization': `${getAuthToken()}`
                }
            })
                .then(response => response.json())
                .then(messages => {
                    //console.log(messages)
                    const newMessages = messages.map((message: { fromUserId: string; fromUsername: string; message: string; date: Date; }) => {
                        const isCurrentUser = getCurrentUserId() === message.fromUserId;
                        return {
                            name: message.fromUsername,
                            message: message.message,
                            date: message.date,
                            from: message.fromUserId,
                            isCurrentUser: isCurrentUser ? 'true' : 'false'
                        };
                    });
                    setMessageList(newMessages);
                })
                .catch(error => {
                    console.error('Error fetching messages:', error);
                });
        }

    }, []);

    return (
        <>
            {messageList.length > 0 ? (
                messageList.map((message: any, index: any) => (
                    <div
                        className={`message ${message.isCurrentUser === 'true' ? 'right-corner' : 'left-corner'}`}
                        key={index} 
                    >
                        {message.message}
                        <div ref={messagesEndRef} />
                    </div>
                ))
            ) : (
                <div>Start Chatting</div>
            )}
        </>
    )
}