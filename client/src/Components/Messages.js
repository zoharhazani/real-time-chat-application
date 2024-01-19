import Message from "./Message"
export default function Messages({historyChat,userName}){
    console.log(historyChat);

    return(
        <div className="messages">
            {historyChat.map((message)=>{
                return(
                    <Message message ={message} userName={userName}/>
                )
            })}
            
        </div>
    )

}