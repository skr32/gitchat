
import { LogIn } from './components/LogIn/index.tsx'
// import { Burgermenu } from './components/Burgermenu'
import { ChatWindow } from './components/Chat/index.tsx'
import { Routes, Route } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { socket } from './socket'



const App = () => {

  // socketio stuff
  const [isConnected, setIsConnected] = useState(socket.connected);

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

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
    };
  }, []);


  return (         
    <Routes>login
    <Route path='/' element={<LogIn/>} />
    <Route path='/login' element={<LogIn/>} />
    <Route path='/chats' element={<ChatWindow/>} />
  </Routes>
);
}



export default App;
