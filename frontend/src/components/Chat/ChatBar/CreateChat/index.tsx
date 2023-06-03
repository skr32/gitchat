import { useEffect, useRef, useState } from 'react';
import './style.scss';
import ReactDOM from 'react-dom';
import { backend_url, getAuthToken, getCurrentUserId } from '../../../../Utils';

export function CreateChat() {
    const [createChat, setCreateChat] = useState(false);
    const [allUsers, setAllUsers] = useState<{ _id: string; name: string }[]>([]);
    const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
    const jwtTokenRef = useRef<HTMLInputElement>(null);
    console.log(jwtTokenRef);

    useEffect(() => {
        const handleEscapeKey = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                setCreateChat(false);
            }
        };

        window.addEventListener('keydown', handleEscapeKey);

        return () => {
            window.removeEventListener('keydown', handleEscapeKey);
        };
    }, []);

    const toggleDiv = () => {
        setCreateChat(!createChat);
    };

    useEffect(() => {
        fetch(backend_url + '/api/users/allusers')
            .then(response => response.json())
            .then(users => {
                const usersData = users.map((user: { _id: string; username: string }) => ({
                    _id: user._id,
                    name: user.username
                }));
                setAllUsers(usersData.filter((element: any) => element._id != getCurrentUserId()));
            })
            .catch(error => console.error(error));
    }, []);

    function handleUserCheckboxChange(userId: string) {
        setSelectedUsers(prevSelectedUsers => {
            if (prevSelectedUsers.includes(userId)) {
                console.log(selectedUsers);
                return prevSelectedUsers.filter(id => id !== userId);
            } else {
                return [...prevSelectedUsers, userId];
            }
        });
    }

    function createThread() {
        if (selectedUsers.length === 0) {
            alert('Please select at least one user.');
            return;
        }

        // POST the selected users to the API to create a new thread with JWT authorization
        fetch(backend_url + '/api/threads/newthread', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `${getAuthToken()}`
            },
            body: JSON.stringify({ members: [...selectedUsers, getCurrentUserId()] })
        })
            .then(response => {
                if (response.ok) {
                    alert('Thread created successfully.');
                    window.location.href = '/chats';
                } else {
                    response.json().then(data => alert(`Error: ${data.message}`));
                }
            })
            .catch(error => console.error(error));
    }

    const createChatContainer = createChat ? (
        <div className="createchat__container">
            <svg
                width="45"
                height="45"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={toggleDiv}
            >
                <path
                    d="M14 14L34 34"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M14 34L34 14"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <span>
                <h2>Create New Chat</h2>
                <ul>
                    {allUsers.map(user => (
                        <li key={user._id}>
                            <label>
                                <input
                                    type="checkbox"
                                    name="users[]"
                                    value={user._id}
                                    ref={jwtTokenRef}
                                    checked={selectedUsers.includes(user._id)}
                                    onChange={() => handleUserCheckboxChange(user._id)}
                                />
                                {user.name}
                            </label>
                        </li>
                    ))}
                </ul>
                <div className="new-chat" onClick={createThread}>
                    New Chat
                </div>
            </span>
        </div>
    ) : null;

    return (
        <>
            {ReactDOM.createPortal(
                createChatContainer,
                document.getElementById('root')!
            )}
            <div className="createchat" onClick={toggleDiv}>
                New Chat
            </div>
        </>
    );
}
