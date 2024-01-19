import img from "../images/shutterstock_586686194_i.jpg"
export default function Search({connectedClients,getHistoryChat}){
    console.log(connectedClients);
    const clients = connectedClients || [];
    console.log(clients);
    
    return(
        <div className="search">
            <div className="searchForm">
                <input type="text" placeholder="find a user.." title="Coming Soon"/>
            </div>
            {clients.map((name)=>{
                return(
                    <div className="userChat" onClick= {()=> getHistoryChat(name)}>
                    <img src={img} alt=""/>
                    <div className="userChatInfo">
                        <span>{name}</span>
                    </div>
                </div>
                )
            })}
        </div>
    )

}