import './style.scss'
import logo from '../../../../assets/chatLogo.png'

export let chats = [
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
    { name: 'Max Musterperson', message: 'asdfsdfdsf', img: logo },
]

export function ChatPreview() {
    return (
        <div>
            {chats.map((chat) => (
                <>
                    <div className='chat-preview'>
                        <img src={chat.img}></img>
                        <span className='chat-preview__info'>
                        <p className='chat-preview__info__name'>{chat.name}</p>
                        <p className='chat-preview__info__message'>{chat.message}</p>
                        </span>
                    </div>
                </>
            ))}
        </div>

    )
}