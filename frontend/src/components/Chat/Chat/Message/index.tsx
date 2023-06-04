import { useEffect, useRef } from 'react';
import './style.scss'
import { getAuthToken, getCurrentUserId, backend_url } from '../../../../Utils';

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
            fetch(backend_url + '/api/messages/allmessages?thread=' + selectedThreadId, {
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


    function getDateTimeString(date: string) {
        var dateOptions: any = { day: '2-digit', month: '2-digit', year: 'numeric' };
        var timeOptions: any = { hour12: false, hour: '2-digit', minute:'2-digit' };
        console.log(new Date(date).toLocaleDateString('de-DE', dateOptions) + ' ' + new Date(date).toLocaleTimeString('de-DE', timeOptions));
        return new Date(date).toLocaleDateString('de-DE', dateOptions) + ' ' + new Date(date).toLocaleTimeString('de-DE', timeOptions);
    }


    return (
        <>
            {messageList.length > 0 ? (
                messageList.map((message: any, index: any) => (
                    <div
                        className={`message ${message.isCurrentUser === 'true' ? 'right-corner' : 'left-corner'}`}
                        key={index} 
                    >
                        {message.message}
                        <div ref={messagesEndRef} className={`message-timestamp ${message.isCurrentUser ? 'left-message' : 'right-message'}`}>
                        {getDateTimeString(message.date)}
                        </div>

                    </div>
                ))
            ) : (
                <div>Start Chatting</div>
            )}
        </>
    )
}