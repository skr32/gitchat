import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
// import App from './App'

// import { LogIn } from './components/LogIn/index.tsx'
// import { Burgermenu } from './components/Burgermenu'
import { ChatWindow } from './components/Chat/index.tsx'
//import { BannerFull } from './components/BannerFull/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    {/* <Burgermenu /> */}
    {/* <LogIn /> */}
    <ChatWindow/>
  </React.StrictMode>,
)