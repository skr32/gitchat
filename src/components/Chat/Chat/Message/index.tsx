import './style.scss'
let messages = [
   {me:true, text:'lkjlklkasdflkdsajfldsjföalskfjakfjakdsjfasfdsaj', timestamp: '10:30'},
   {me:true, text:'lkjleorituiokj', timestamp: '10:35'},
   {me:false, text:'dsfdsKAÖDLFSJHKGDDFGHEIRWUHGUEIf', timestamp: '10:45'},
   {me:true, text:'lkjlyxcvkj', timestamp: '10:55'},
   {me:false, text:'dsfdsf', timestamp: '10:56'},
   {me:true, text:'lkjlafdsakj', timestamp: '10:57'},
   {me:true, text:'lkjbncvlkj', timestamp: '10:58'},
   {me:false, text:'dsfasdfdsf',timestamp: '10:59'},
   {me:true, text:'lkjlkj',timestamp: '11:02'},
   {me:false, text:'dsfhgdsf',timestamp: '11:04'},
   {me:true, text:'lkjlasdfkj',timestamp: '11:05'},
   {me:true, text:'lkjlkj',timestamp: '11:07'},
   {me:false, text:'dsfsdfjhdsf',timestamp: '11:08'},
   {me:true, text:'lkjlhgjkj',timestamp: '11:10'},
   {me:false, text:'dsf4fghdsf',timestamp: '11:12'},
]
export function Message() {
    return (
      <>
        {messages.map((message) => (
          <div className={`message ${message.me ? 'right-corner' : 'left-corner'}`} key={message.text}>
            <div className="message-text">{message.text}</div>
            <div className={`message-timestamp ${message.me ? 'left-message' : 'right-message'}`}>
              {message.timestamp}
            </div>
          </div>
        ))}
      </>
    );
  }