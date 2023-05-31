import './style.scss'
import { useState } from "react";

export function NewMessage() {
    const [message, setMessage] = useState("");

    const handleNewMessageChange = (event: any) => {
        setMessage(event.target.value);
    };

    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    function parseJwt(token) {
        var base64Url = token.split(".")[1];
        var base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
        var jsonPayload = decodeURIComponent(
            window
                .atob(base64)
                .split("")
                .map(function (c) {
                    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
                })
                .join("")
        );

        return JSON.parse(jsonPayload);
    }

    const sendNewMessage = () => {
        // do something with message
        fetch("http://localhost:5000/api/messages/newmessage", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `${token}`,
            },
            body: JSON.stringify({
                message: message,
                thread: "64779063ade42ab9cb3b1fe1", // hardcoded for now, change to current state thread later
            }),
        })
            .then((response) => response.json())
            .then((data) => {
            })
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