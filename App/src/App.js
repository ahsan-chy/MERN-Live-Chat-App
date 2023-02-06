import './App.css';
import Routers from './routes/Routers';
import socketIO from 'socket.io-client';

const socket = socketIO.connect('http://localhost:4000');
function App() {
  return (
    <div style={{textAlign:'center', color:'#0E8A8A'}}>
        {/* All Website Routers - URLs */}
        <Routers/>
    </div>
  );
}

export default App;
