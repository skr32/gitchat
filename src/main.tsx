import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
// import App from './App'

import { Join } from './components/Join/index.tsx'
import { Burgermenu } from './components/Burgermenu'
//import { BannerFull } from './components/BannerFull/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Burgermenu />
    <Join />
  </React.StrictMode>,
)