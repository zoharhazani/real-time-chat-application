import NavBarChat from "./NavBarChat"
import Search from '../Components/Search'
import Chats from '../Components/Chats'

export default function SideBar({connectedClients,getHistoryChat}){
    return(
        <div className="sidebar">
            <NavBarChat />
            <Search connectedClients={connectedClients} getHistoryChat={getHistoryChat}/>
        </div>
    )
}