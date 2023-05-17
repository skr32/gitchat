import './style.scss'
import logo from '../../../assets/chatLogo.png'
import { Message } from './Message'

export function Chat( { expanded }:any ) {

    return (
        <>
            <div className='chat-container' style={{ width: !expanded ? '80%' : '100%' }}>
                {/* top bar - img ; name ; contact info  */}
                <div className='top-bar'>
                    <span>
                        <img src={logo}></img>
                    </span>
                    <span>
                        <p>Testname Testtest</p>
                    </span>
                    <span>
                        {/* add search for message icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" viewBox="0 0 20 10"> <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" /> </svg>
                    </span>
                </div>
                {/* messages left and right  */}
                <div className='message-container'>
                    <Message />
                </div>
                {/* input type text ; send button */}
                <div className='input'>
                    <input type='text' placeholder='Type Message...'></input>
                    <input type='button' value='Send'></input>
                </div>
            </div>
        </>
    )
}