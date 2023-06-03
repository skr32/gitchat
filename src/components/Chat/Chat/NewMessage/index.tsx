import './style.scss'
import { useState } from "react";
import { getAuthToken } from '../../../../Utils';

export function NewMessage({selectedThreadId}: any) {
    const [message, setMessage] = useState("");
    console.log( 'ebeneNewMessage: ' + selectedThreadId)
    const handleNewMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    const sendNewMessage = () => {
        // do something with message
        fetch("http://localhost:5000/api/messages/newmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${getAuthToken()}`,
            },
            body: JSON.stringify({
                message: message,
                thread: selectedThreadId, // hardcoded for now, change to current state thread later
            }),
        })
            .then((response) => response.json())
            .catch((error) => {
                console.error("Error:", error);
            });

        // clear input field
        setMessage("");
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            sendNewMessage();
        }
    };

    return (
        <div className="input">
            <input
                type="text"
                value={message}
                placeholder="Type Message..."
                onChange={handleNewMessageChange}
                onKeyDown={handleKeyDown}
            ></input>
            <input type="button" value="Send" onClick={sendNewMessage}></input>
        </div>
    );
}