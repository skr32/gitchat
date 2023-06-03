import { useState } from 'react';
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

    const [isLoginValid, setLoginValid] = useState(true);
    const [isSignupValid, setSignupValid] = useState(true);
  
    function handleLogin(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        if (!loginName || !loginPassword) {
          alert('Please fill in all fields');
          return;
        }
        fetch('http://localhost:5000/api/users/login', {
          method: 'POST',
          body: JSON.stringify({
            username: loginName,
            password: loginPassword
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        })
          .then(response => {
            if (response.ok) {
              return response.json();
            } else {
              throw new Error('Invalid login credentials');
            }
          })
          .then(data => {
            localStorage.setItem('token', data.token);
            window.location.href = '/chats';
          })
          .catch(error => {
            setLoginValid(false); // Set login validation state to false for invalid login
            console.error(error);
          });
      }
      
  
    function handleSignup(event: React.FormEvent<HTMLFormElement>) {
      event.preventDefault();
      if (!signupName || !signupPassword) {
        alert('Please fill in all fields');
        return;
      }
      fetch('http://localhost:5000/api/users/register', {
        method: 'POST',
        body: JSON.stringify({
          username: signupName,
          password: signupPassword
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(response => response.json())
        .then(data => {
          localStorage.setItem('token', data.token);
          window.location.href = '/chats';
        })
        .catch(error => console.error(error))
        .finally(() => {
          setSignupValid(false); // Set signup validation state to false for invalid signup
        });
    }
  


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
                            className={`${
                              isFocused('loginName') ? 'focus' : ''
                            } ${isLoginValid ? '' : 'invalid'}`}
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
                            className={`${
                              isFocused('loginPassword') ? 'focus' : ''
                            } ${isLoginValid ? '' : 'invalid'}`}
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
                    <SvgButton text={'Log In'} click={handleLogin} />

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

                    <SvgButton text={'Sign Up'} click={handleSignup} />

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