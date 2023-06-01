import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

export function Settings() {const [showDiv, setShowDiv] = useState(false);
    const [primaryColor, setPrimaryColor] = useState(() => localStorage.getItem('primaryColor') || '#6C72CB');
    const [secondaryColor, setSecondaryColor] = useState(() => localStorage.getItem('secondaryColor') || '#CB69C1');
    const [backgroundColor, setBackgroundColor] = useState(() => localStorage.getItem('backgroundColor') || '#242424');
    const [contrastColor, setContrastColor] = useState(() => localStorage.getItem('contrastColor') || '#2e2735');
  
    useEffect(() => {
      localStorage.setItem('primaryColor', primaryColor);
      localStorage.setItem('secondaryColor', secondaryColor);
      localStorage.setItem('backgroundColor', backgroundColor);
      localStorage.setItem('contrastColor', contrastColor);
  
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
        :root {
          --primary-color: ${primaryColor};
          --secondary-color: ${secondaryColor};
          --contrast-color: ${contrastColor};
          --background-color: ${backgroundColor};
        }
      `;
  
      document.head.appendChild(styleElement);
  
      return () => {
        document.head.removeChild(styleElement);
      };
    }, [primaryColor, secondaryColor, backgroundColor, contrastColor]);
  
    useEffect(() => {
      const handleEscapeKey = (event: KeyboardEvent) => {
        if (event.key === 'Escape') {
          setShowDiv(false);
        }
      };
  
      window.addEventListener('keydown', handleEscapeKey);
  
      return () => {
        window.removeEventListener('keydown', handleEscapeKey);
      };
    }, []);
  
    const toggleDiv = () => {
      setShowDiv(!showDiv);
    };
  
    const handlePrimaryColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setPrimaryColor(event.target.value);
    };
  
    const handleSecondaryColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setSecondaryColor(event.target.value);
    };
  
    const handleBackgroundColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setBackgroundColor(event.target.value);
    };
  
    const handleContrastColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setContrastColor(event.target.value);
    };
    
    return (
        <>
            {/* to do: create div when button is clicked */}
            {ReactDOM.createPortal(
                <div className={`${showDiv ? 'settings__container' : ''}`}
                    style={{ display: !showDiv ? 'none' : 'block' }}>
                    <svg width="45" height="45" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg"
                        onClick={toggleDiv}>
                        <path d="M14 14L34 34" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /><path d="M14 34L34 14" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" /></svg>
                    <span>
                        <span className='settings__container-color'>
                            <input type='color' value={primaryColor} onChange={handlePrimaryColorChange} />
                            <label>Primary Color</label>
                        </span>
                        <span className='settings__container-color'>
                            <input type='color' value={secondaryColor} onChange={handleSecondaryColorChange} />
                            <label>Secondary Color</label>
                        </span>
                        <span className='settings__container-color'>
                            <input type='color' value={backgroundColor} onChange={handleBackgroundColorChange} />
                            <label>Background Color</label>
                        </span>
                        <span className='settings__container-color'>
                            <input type='color' value={contrastColor} onChange={handleContrastColorChange} />
                            <label>Contrast Color</label>
                        </span>
                    </span>
                </div>,
                document.getElementById('root')!
            )}
            <span className='settings'>
                <svg
                    onClick={toggleDiv}
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>
            </span>
        </>
    )
}