import img from "../images/shutterstock_586686194_i.jpg"
export default function NavBarChat(){
    return(
        <div className="chatnavbar">
            <span className="logo">Chats</span>
            <div className="user">
                <img src={img} alt=""/>
            </div>

        </div>
    )
}