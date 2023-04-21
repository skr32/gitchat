import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'

import { BannerFull } from './components/BannerFull/index.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <BannerFull />
  </React.StrictMode>,
)
