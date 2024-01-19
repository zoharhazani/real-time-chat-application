import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Stack from 'react-bootstrap/Stack';
import { useLocation } from 'react-router-dom';
export default function MyNavBar({isChatPage,userName,handleLogOut}){


    return(
        <Navbar bg="dark" className='mb-4' style={{height:"3.75rem"}}>
            <Container>
                <h2 style={{color:"white"}}>Chat App</h2>
                { isChatPage &&
                <span>Logged in as {userName}</span>
                }
                { isChatPage &&
                <Nav>
                    <Stack>
                        <h6 onClick={handleLogOut}>logout</h6>
                    </Stack>
                </Nav>
                }
            </Container>
        </Navbar>
    )
}