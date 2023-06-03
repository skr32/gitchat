import App from './App';
import { BrowserRouter } from "react-router-dom";
import { createRoot } from 'react-dom/client';
import './index.scss';

const root = createRoot(document.getElementById("root") as HTMLElement);


root.render(
  // <React.StrictMode>
   <BrowserRouter>
    <App />
  </BrowserRouter>
  // </React.StrictMode>
);
