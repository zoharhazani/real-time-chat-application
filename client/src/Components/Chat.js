import Messages from "./Messages";
import Input from './Input';
export default function Chat({historyChat,sendMessage,recipient,userName}){
    return(
        <div className="chat">
            <div className="chatInfo">
                <span>{recipient}</span>
                
            </div>
            <Messages historyChat={historyChat} userName={userName}/>
            <Input sendMessage={sendMessage}/>
        </div>
    );
}