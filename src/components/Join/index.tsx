import { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './style.scss'
import logo from '../../assets/chatLogo.png'
import { SvgButton } from '../SvgButton';


export function Join() {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="join-container">
            <div className="join-container__inner">
                <h2>CodeChat<img src={logo} alt="logo" /></h2>
                <input placeholder="Username" type="text"
                    onChange={(event) => setName(event.target.value)}
                ></input>
                <input placeholder="Room ID" type="text"
                    onChange={(event) => setRoom(event.target.value)}
                ></input>
                <BrowserRouter>
                <Link onClick={ (event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                    <SvgButton text={'Join Chat'} />
                </Link>
                </BrowserRouter>
            </div>
        </div>
    )
}