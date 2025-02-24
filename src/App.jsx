import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './components/Home'
import About from './components/About'
import NoteState from './context/notes/NoteState'
import Login from './components/login'
import Signup from './components/signup'
import Alert from './components/Alert'
import { useState } from 'react'
import AddNote from './components/AddNote'

function App() {
  const[alert , setAlert] = useState(null);

  const showAlert = (message , type)=>{
    setAlert({
      msg : message,
      type : type,
    });

    setTimeout(()=>{
      setAlert(null);
    } , 2000);
  };
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className='container'>
            <Routes>
              <Route path="/" element={<Home showAlert={showAlert}/>} />
              <Route path="/about" element={<About showAlert={showAlert}/>} />
              <Route path="/login" element={<Login showAlert={showAlert}/>} />
              <Route path="/signup" element={<Signup showAlert={showAlert}/>} />
              <Route path="/addnote" element={<AddNote showAlert={showAlert}/>} />
            </Routes>
          </div>
        </Router>
      </NoteState>

    </>
  )
}

export default App
