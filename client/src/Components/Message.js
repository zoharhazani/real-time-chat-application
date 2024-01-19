import img from "../images/shutterstock_586686194_i.jpg"
export default function Message({message, userName}){
    const sender = message["sender"];
    const text = message["text"];
    const time = message["time"];
    console.log({userName});
    return(
        <div className={`message ${sender === userName ? 'owner' : ''}`}>
            <div className="messageInfo">
                <img src={img}/>
                <span>{time}</span>
            </div>
            <div className="messageContent">
                <p>{text}</p>
                {/* <img src={img}/> */}
            </div>
        </div>
    )
}