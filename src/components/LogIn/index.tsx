import { useState } from 'react';
import { BrowserRouter, Link } from 'react-router-dom';
import './style.scss';
import logo from '../../assets/chatLogo.png';
import { SvgButton } from '../SvgButton';

export function LogIn() {
    const [loginName, setLoginName] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [signupName, setSignupName] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [login, setLogin] = useState(false);

    const toggle = () => {
        setLogin((prevState) => !prevState);
    };

    const [focusedInput, setFocusedInput] = useState(null);

    const handleInputClick = (inputName: any) => {
        setFocusedInput(inputName);
    };

    const isFocused = (inputName: any) => {
        return focusedInput === inputName;
    };

    return (
        <>
            <div className="join-container">
                <div className="join-container__inner">
                    <h2>
                        Log In<img src={logo} alt="logo" />
                    </h2>
                    <span>
                        <input
                            type="text"
                            onClick={() => handleInputClick('loginName')}
                            className={isFocused('loginName') ? 'focus' : ''}
                            value={loginName}
                            onChange={(event) => setLoginName(event.target.value)}
                        />
                        <label
                            className={
                                isFocused('loginName') || loginName ? 'focused' : ''
                            }
                        >
                            Username
                        </label>
                    </span>
                    <br />
                    <span>
                        <input
                            type="password"
                            value={loginPassword}
                            onClick={() => handleInputClick('loginPassword')}
                            className={isFocused('loginPassword') ? 'focus' : ''}
                            onChange={(event) => setLoginPassword(event.target.value)}
                        />
                        <label
                            className={
                                isFocused('loginPassword') || loginPassword ? 'focused' : ''
                            }
                        >
                            Password
                        </label>
                    </span>
                    <BrowserRouter>
                        <Link
                            onClick={(event) =>
                                (!loginName || !loginPassword) && event.preventDefault()
                            }
                            to={`/chat?name=${loginName}&password=${loginPassword}`}
                        >
                            <SvgButton text={'Log In'} />
                        </Link>
                    </BrowserRouter>
                </div>
                <div className="join-container__inner">
                    <h2>
                        <img src={logo} alt="logo" /> Sign Up
                    </h2>
                    <span>
                        <input
                            type="text"
                            onClick={() => handleInputClick('signupName')}
                            className={isFocused('signupName') ? 'focus' : ''}
                            value={signupName}
                            onChange={(event) => setSignupName(event.target.value)}
                        />
                        <label
                            className={
                                isFocused('signupName') || signupName ? 'focused' : ''
                            }
                        >
                            Username
                        </label>
                    </span>
                    <br />
                    <span>
                        <input
                            type="password"
                            onClick={() => handleInputClick('signupPassword')}
                            className={isFocused('signupPassword') ? 'focus' : ''}
                            value={signupPassword}
                            onChange={(event) => setSignupPassword(event.target.value)}
                        />
                        <label
                            className={
                                isFocused('signupPassword') || signupPassword ? 'focused' : ''
                            }
                        >
                            Password
                        </label>
                    </span>
                    <BrowserRouter>
                        <Link
                            onClick={(event) =>
                                (!signupName || !signupPassword) && event.preventDefault()
                            }
                            to={`/chat?name=${signupName}&password=${signupPassword}`}
                        >
                            <SvgButton text={'Sign Up'} />
                        </Link>
                    </BrowserRouter>
                </div>
            </div>
            <div className="overlay_container">
                <div
                    className="join-container__inner overlay"
                    style={{
                        transform: !login ? 'translateX(100%)' : 'translateX(0)',
                        opacity: !login ? '1' : '0',
                        zIndex: !login ? '1' : '0',
                    }}
                >
                    <h2>Welcome back</h2>
                    <p>Don't have an account?</p>
                    <br />
                    <button onClick={toggle}>Sign up</button>
                </div>
                <div
                    className="join-container__inner overlay"
                    style={{
                        transform: login ? 'translateX(-100%)' : 'translateX(0)',
                        opacity: !login ? '0' : '1',
                        zIndex: !login ? '0' : '1',
                    }}
                >
                    <h2>Create Account</h2>
                    <p>Already a member?</p> <br />
                    <button onClick={toggle}>Log In</button>
                </div>
            </div>
        </>
    );
}