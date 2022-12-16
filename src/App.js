import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Nav from './Components/Nav/Nav';
import Main from './Components/Main/Main';
import io from 'socket.io-client'
import './App.css';
import JoinRoom from './Components/JoinRoom/JoinRoom';
import CentralChatWindow from './Components/CentralChatWindow/CentralChatWindow';

const socket = io.connect('http://localhost:5000');

function App() {
  return (
    <div className="App">
      <Nav />
      <div className="App-container">
        <div className='menu'>
          <p>Menu</p>
        </div>
        <div className='content'>
          <BrowserRouter>
            <Routes>
              {/* <Main /> */}
              <Route path="/" element={<JoinRoom socket={socket}/>} />
              <Route path="/chat" element={<CentralChatWindow socket={socket}/>} />
            </Routes>
          </BrowserRouter>
        </div>
      </div>
    </div>
  );
}

export default App;
