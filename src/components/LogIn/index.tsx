import { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './style.scss'
import logo from '../../assets/chatLogo.png'
import { SvgButton } from '../SvgButton';


export function LogIn() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [login, setLogin] = useState(false);
    const [signUp, setSignUp] = useState(true);

    const toggle = () => {
        if (login === true) {
            setLogin(false);
            setSignUp(true);
        } else if (signUp === true) {
            setLogin(true);
            setSignUp(false);
        }
    }

    return (
        <>
        <div className="join-container">
  
            <div className="join-container__inner">
                <h2>Log In<img src={logo} alt="logo" /></h2>
                <span>
                <input type="text"
                    onChange={(event) => setName(event.target.value)}
                ></input>
                <label>Username</label>
                </span>
                <br/>
                <span>
                <input type="password"
                    onChange={(event) => setRoom(event.target.value)}
                ></input>
                <label>Password</label>
                </span>
                <BrowserRouter>
                    <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <SvgButton text={'Log In'} />
                    </Link>
                </BrowserRouter>
            </div>
            <div className="join-container__inner">
                <h2><img src={logo} alt="logo" /> Sign Up</h2>
                <span>
                <input type="text"
                    onChange={(event) => setName(event.target.value)}
                ></input>
                <label>Username</label>
                </span>
                <br/>
                <span>
                <input type="password"
                    onChange={(event) => setRoom(event.target.value)}
                ></input>
                <label>Password</label>
                </span>
                <BrowserRouter>
                    <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <SvgButton text={'Sign Up'} />
                    </Link>
                </BrowserRouter>
            </div>
        </div>
        <div className='overlay_container'>
                <div className="join-container__inner overlay"
                    style={{
                        transform: !login ? 'translateX(100%)' : 'translateX(0)',
                        opacity: !login ? '1' : '0',
                        zIndex: !login ? '1' : '0',
                    }}>
                    <h2>Welcome back</h2>
                    <p>Don't have an acoount?</p><br />
                    <button onClick={toggle}>Sign up</button>
                </div>
                <div className="join-container__inner overlay" style={{
                    transform: !signUp ? 'translateX(-100%)' : 'translateX(0)',
                    opacity: !login ? '0' : '1',
                    zIndex: !login ? '0' : '1',
                }}>
                    <h2>Create Account</h2>
                    <p>Already a member?</p> <br />
                    <button onClick={toggle}>LogIn</button>

                </div>
            </div>
        </>
    )
}