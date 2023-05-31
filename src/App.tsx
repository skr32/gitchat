
import { LogIn } from './components/LogIn/index.tsx'
// import { Burgermenu } from './components/Burgermenu'
import { ChatWindow } from './components/Chat/index.tsx'
import { Routes, Route } from 'react-router-dom'; 



const App = () => {
  return (         
    <Routes>login
    <Route path='/' element={<LogIn/>} />
    <Route path='/login' element={<LogIn/>} />
    <Route path='/chats' element={<ChatWindow/>} />
  </Routes>
);
}



export default App;
