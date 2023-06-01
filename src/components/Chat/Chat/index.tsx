import "./style.scss";
import logo from "../../../assets/chatLogo.png";
import { Message } from "./Message";
import { NewMessage } from "./NewMessage";
import { getCurrentUsername } from "../../../Utils";
import { useEffect, useState } from "react";
import { socket } from "../../../socket";


export function Chat({expanded, selectedThreadId, changeSelectedThreadId}: any) {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [messageList, setMessageList] = useState<{ name: string, message: string, date: Date, from: string, isCurrentUser: boolean }[]>([])

    useEffect

    //socketIO stuff
  useEffect(() => {
    function onConnect() {
      setIsConnected(true);
      console.log('websocket connected');
    }

    function onDisconnect() {
      setIsConnected(false);
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('newMessage', message => setMessageList(message));

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);

    //messagelist prop
    
    function addMessageToList(message: any){
        console.log("bin daaaaa");
        const isCurrentUser = getCurrentUsername() === message.name;
        const newMessage = {
            ...message,
            isCurrentUser: isCurrentUser ? 'true' : 'false'
        }
        setMessageList([...messageList, newMessage]);
    }
    useEffect(() => {

        socket.on('newMessage',  (data: any) => addMessageToList(data));
        // socket.on('newMessage',  (data: any) => setMessageList([...messageList, data]));
    }, [socket, messageList]);

    console.log(messageList)
    
    useEffect(() => {
        console.log('subscribing... ' + selectedThreadId)
        socket.emit('subscribe', selectedThreadId);
      }, [selectedThreadId]);
    

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
                    <Message selectedThreadId={selectedThreadId} key={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId} messageList={messageList} setMessageList={setMessageList}/>
                </div>
                {/* input type text ; send button */}
                <NewMessage selectedThreadId={selectedThreadId} key={selectedThreadId} changeSelectedThreadId={changeSelectedThreadId}/>
            </div>
        </>
    );
}
