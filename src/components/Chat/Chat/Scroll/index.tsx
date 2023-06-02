import { useState, useEffect } from 'react';
import './style.scss';

export function Scroll({ containerRef }: any) {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const container = containerRef.current;

    const handleScroll = () => {
      if (container) {
        setShowButton(container.scrollTop > 0);
      }
    };

    if (container) {
      container.addEventListener('scroll', handleScroll);
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  

  const scrollToBottom = () => {
    const container = containerRef.current;
    if (container) {
      container.scrollTo({
        top: container.scrollHeight,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div>
      {showButton && (
        <button className="button-pagetop" onClick={scrollToBottom}>
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 330 330"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path id="XMLID_225_" d="M325.607,79.393c-5.857-5.857-15.355-5.858-21.213,0.001l-139.39,139.393L25.607,79.393 c-5.857-5.857-15.355-5.858-21.213,0.001c-5.858,5.858-5.858,15.355,0,21.213l150.004,150c2.813,2.813,6.628,4.393,10.606,4.393 s7.794-1.581,10.606-4.394l149.996-150C331.465,94.749,331.465,85.251,325.607,79.393z"></path> </g></svg>        </button>
      )}
    </div>
  );
}

/*import { useRef, useEffect } from "react";
import './style.scss';

const ChatWindow = () => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (messagesEndRef.current !== null) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, []);

  return (
    <div className="chat-window">
  
      <div className="messages">
        
      </div>

      
      <button onClick={scrollToBottom}>Scroll to Bottom</button>

      
      <div ref={messagesEndRef}></div>
    </div>
  );
};


*/
