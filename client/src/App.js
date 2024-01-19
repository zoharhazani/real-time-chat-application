import './App.css';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router,Route, Routes } from 'react-router-dom';
import Login from './Pages/Login/Login';
import Home from './Pages/Home/Home';
import { WebSocketProvider } from './Utils/WebSocketContext';
import {Container} from "react-bootstrap"
import NavBar from './Components/NavBar';
import { useLocation } from 'react-router-dom';

function App() {
  return (
    <>
      <Router>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/Home' element={<Home />} />
      </Routes>
    </Router>

    </>
  );
  
}

export default function AppWithWebSocket() {
  return (
    <WebSocketProvider>
      <App />
    </WebSocketProvider>
  );
}
