import './style.scss';
import logo from '../../../../assets/chatLogo.png';
import { useEffect, useState } from 'react';
import { renderMessages } from '../../Chat/Message';

export let selectedThreadId: string = '';
export function ChatPreview() {
    const [selectedThreadId, setSelectedThreadId] = useState('');

    renderMessages(selectedThreadId);

    const [loading, setLoading] = useState(true);
    const [chats, setChats] = useState<{ name: string; message: string }[]>([]);

    useEffect(() => {
        const token = 'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NzcyYzk0MmM0MDhjNGI5MzRmYWU1OSIsIm5hbWUiOiJ0ZXN0IiwiaWF0IjoxNjg1NTMxODEzLCJleHAiOjE3MTcwODg3Mzl9.mCre5BG5C5psHn7Eqe3W1F3IPSLam2os8Jrv7B66HDo';
        fetch('http://localhost:5000/api/threads/allthreads', {
            headers: {
                'Authorization': `${token}`
            }
        })
            .then(response => response.json())
            .then(threads => {
                for (let thread of threads) {
                    const newThread: { name: string, message: string } = {
                        name: thread._id,
                        message: thread._id,
                    }
                    chats.push(newThread);
                    setLoading(false);
                }
            });
    }, []);
    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            {chats.map((chat, index) => (
                <div key={index} className='chat-preview' id={chat.name} onClick={() => renderMessages(chat.name)}>
                    {/* <img src={chat.img} alt=''></img> */}
                    <span className='chat-preview__info'>
                        <p className='chat-preview__info__name'>{chat.name}</p>
                        <p className='chat-preview__info__message'>{chat.message}</p>
                    </span>
                </div>
            ))}
        </div>
    );
}
