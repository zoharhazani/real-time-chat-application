import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import { useWebSocket } from "../../Utils/WebSocketContext";
import { saveToLocalStorage} from '../../Utils/localStorageUtils';
import Button from "react-bootstrap/Button";
import Form  from "react-bootstrap/Form";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from "react-bootstrap/Stack";
import { Container } from "react-bootstrap";
import MyNavBar from '../../Components/NavBar';

export default function Login() {
  const [name, setName] = useState("");
  const [port, setPort] = useState("");
  const { setWebSocketClient } = useWebSocket(); 
  const SERVER_HOST = 'localhost';
  const SERVER_PORT = 1234;
  
  const navigate = useNavigate();

  async function handleSubmit(event) {

    event.preventDefault();

    if(port < 0 || port > 65535)
    {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid port value. Enter a number between 0 - 65535",
      });
      
    }
    else if ( port != 1234)
    {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Invalid port value. hint-1234",
      });

    }
    else
    {
      const userDetails = {
        name: name,
        port: port,
      };

      connectToServer(userDetails);
    }
  }

  function connectToServer(userDetails)
  {
    const userName = userDetails.name;
    const websocketClient = new WebSocket(`ws://localhost:1234`);
    websocketClient.onopen = function (){
      websocketClient.send(userName);
      saveToLocalStorage('userName',userName);
      setWebSocketClient(websocketClient); 
      navigate('/Home');
    };
  }

  return (
    <>
    <MyNavBar isChatPage={false}/>
    <Container>
    <Form onSubmit={handleSubmit} style={{border:"3px solid #075e54", borderRadius:"12px", width:"600px", height:"400px", margin:"auto", marginTop:"10%", }}>
      <Row style={{height:"100vh",justifyContent:"center",paddingTop:"10%"}}>
        <Col xs={6}>
        <Stack gap={3}>
        <h2 style={{color:"black"}}>Login</h2>
        <Form.Control type="text" placeholder="Name" onChange={(e)=> setName(e.target.value)}/>
        <Form.Control type="text" placeholder="Port" onChange={(e)=>setPort(e.target.value)}/>
        <Button style={{backgroundColor:"#128c7e", borderColor:"#128c7e", fontWeight:"bold"}} type="submit">Login</Button>
        </Stack>
        </Col>
      </Row>
    </Form>
    </Container>
    </>
  );
}
