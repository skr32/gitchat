import "./style.scss";
import logo from "../../../assets/chatLogo.png";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";
import { getCurrentUsername } from "../../../Utils";


export function Chat({expanded, selectedThreadId, changeSelectedThreadId}: any) {
    // to do: add library
    // hacky way to decode JWT token. Pleeeaase don't do this in production! Use a library instead!!

    console.log('ebeneChat: ' + selectedThreadId)
    

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
                        <p>{getCurrentUsername()}</p>
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
                    <Message selectedThreadId={selectedThreadId} key={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId}/>
                </div>
                {/* input type text ; send button */}
                <NewMessage />
            </div>
        </>
    );
}
