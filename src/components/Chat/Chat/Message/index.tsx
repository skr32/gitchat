import './style.scss'
let messages = [
   {me:true, text:'lkjlklkasdflkdsajfldsjföalskfjakfjakdsjfasfdsaj'},
   {me:true, text:'lkjleorituiokj'},
   {me:false, text:'dsfdsKAÖDLFSJHKGDDFGHEIRWUHGUEIf'},
   {me:true, text:'lkjlyxcvkj'},
   {me:false, text:'dsfdsf'},
   {me:true, text:'lkjlafdsakj'},
   {me:true, text:'lkjbncvlkj'},
   {me:false, text:'dsfasdfdsf'},
   {me:true, text:'lkjlkj'},
   {me:false, text:'dsfhgdsf'},
   {me:true, text:'lkjlasdfkj'},
   {me:true, text:'lkjlkj'},
   {me:false, text:'dsfsdfjhdsf'},
   {me:true, text:'lkjlhgjkj'},
   {me:false, text:'dsf4fghdsf'},
]
export function Message() {
    return(
        <>
        {messages.map((message) => (
            <> 
            <div className={`message ${message.me ? 'right-corner' : 'left-corner'}`} key={message.text}>
                {message.text}
            </div>
            </>
        )
            )}
        </>
    )
}