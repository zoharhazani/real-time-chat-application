import React, { useEffect, useState } from 'react';
import { json, useNavigate } from "react-router-dom";
import { useWebSocket } from "../../Utils/WebSocketContext";
import { saveToLocalStorage, getFromLocalStorage } from '../../Utils/localStorageUtils';
import { Container, Stack } from 'react-bootstrap';
import MyNavBar from '../../Components/NavBar';
import SideBar from '../../Components/SideBar';
import Chat from '../../Components/Chat';
import "../Home/Home.css";


export default function Home()
{
    const { webSocketClient } = useWebSocket(); 
    const [userName, setUserName] = useState('');
    const [recipient,setRecipient] = useState('');
    const [connectedClients,setConnectedClients]= useState([]);
    const [historyChat,setHistoryChat] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = getFromLocalStorage('userName');
        setUserName(storedUserName);
        getConnectedClients();
      }, []);

    function sendMessage(text){
        let time = getCurrentTime();
        let json_message = {"type":"sendMessage","sender":userName,"recipient":recipient,"time":time,"text":text};
        json_message = JSON.stringify(json_message);
        webSocketClient.send(json_message);
    } 

    function getHistoryChat(name){
        setRecipient(name);
        let json_message = {"type":"historyChat","name":name,"userName":userName}
        json_message = JSON.stringify(json_message);
        webSocketClient.send(json_message);
    }  

    function getConnectedClients(){
        let json_message = {"type":"connectedClients"};
        json_message = JSON.stringify(json_message);
        webSocketClient.send(json_message); 
    }

    function handleServerResponse(message){
        switch (message["type"]){
            case 'connectedClients':
                const clients = message["clients"];
                setConnectedClients(clients);
                break;
            case 'historyChat':
                const history = message["historyChat"];
                setHistoryChat(history);
                break;

            case "sendMessage":
                const currMessage = message["message"];
                if(historyChat == [])
                {
                    setHistoryChat(currMessage);
                }
                else{
                    setHistoryChat((prevHistory)=>[...prevHistory,currMessage]);
                }
                break;  
            default:
        }
    }

    webSocketClient.onmessage = function (event){

        const message = JSON.parse(event.data);
        handleServerResponse(message);
    }

    async function handleLogOut(){
        let logoutMessage = {type:"logout",userName:userName};
        logoutMessage = JSON.stringify(logoutMessage);
        await webSocketClient.send(logoutMessage);

        await webSocketClient.close();
        navigate('/');
    }

    function getCurrentTime() {
        const currentDate = new Date();
        const hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
      
        // Format hours and minutes to ensure they have two digits
        const formattedHours = hours < 10 ? `0${hours}` : hours;
        const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
      
        // Return the formatted time as a string
        return `${formattedHours}:${formattedMinutes}`;
    }

    return (
        <>
        <MyNavBar isChatPage={true} userName={userName} handleLogOut={handleLogOut}/>
        <div className='home'>
            <div className='container'>
                <SideBar connectedClients={connectedClients} getHistoryChat={getHistoryChat} />
                <Chat historyChat={historyChat} sendMessage={sendMessage} recipient={recipient} userName={userName}/>
            </div>
        </div>
        </>
    )    
}