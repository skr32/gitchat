import "./style.scss";
import logo from "../../../assets/chatLogo.png";
import { Message } from "./Message";
import { useState } from "react";

export function Chat({ expanded }: any) {
    // to do: add library
    // hacky way to decode JWT token. Pleeeaase don't do this in production! Use a library instead!!

    const token = localStorage.getItem("token");
    const decodedToken = parseJwt(token);
    // console.log(decodedToken);
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

    // component for input field and send button
    function NewMessageComponent() {
        const [message, setMessage] = useState("");

        const handleNewMessageChange = (event: any) => {
            setMessage(event.target.value);
        };

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
                    console.log(data);
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

    return (
        <>
            <div
                className="chat-container"
                style={{ width: !expanded ? "80%" : "100%" }}
            >
                {/* top bar - img ; name ; contact info  */}
                <div className="top-bar">
                    <span>
                        <img src={logo}></img>
                    </span>
                    <span>
                        <p>{decodedToken.name}</p>
                    </span>
                    <span>
                        {/* add search for message icon */}
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="25"
                            height="25"
                            fill="currentColor"
                            viewBox="0 0 20 10"
                        >
                            {" "}
                            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />{" "}
                        </svg>
                    </span>
                </div>
                {/* messages left and right  */}
                <div className="message-container">
                    <Message />
                </div>
                {/* input type text ; send button */}
                <NewMessageComponent />
            </div>
        </>
    );
}
