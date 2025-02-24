import  { useContext} from 'react'
import {Link , useLocation, useNavigate} from 'react-router-dom'
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import {ThemeContext} from '../context/ThemeContext';

function Navbar() {
    let location = useLocation();
    let navigate = useNavigate();
    const handleLogout = ()=>{
        localStorage.removeItem('token');
        navigate('/login');
    }
    const {dark , toggle } = useContext(ThemeContext);
    
    return (
        <div>
            <nav className= {`navbar navbar-expand-lg ${!dark?`bg-body-tertiary`:`bg-body-dark border-bottom`}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand fw-bold" to="/" style={{color: dark?'white':'black'}}>iNotebook</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation" >
                        <span className="navbar-toggler-icon" ></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname=='/'?'active' : ""}`} aria-current="page" to="/" style={{color: dark?'white':'black'}}>Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname=='/about'?'active' : ""}`} to="/about" style={{color: dark?'white':'black'}}>About</Link>
                            </li>
                            
                        </ul>
                        <button className="btn mx-2" onClick={toggle} style={{ background: "none", border: "none" }}>
                            {dark ? <LightModeIcon style={{ color: "white" }} /> : <DarkModeIcon style={{ color: "black" }} />}
                        </button>
                        {!localStorage.getItem('token')?<form className="d-flex">
                            <Link className="btn btn-primary mx-1" to='/login' role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to='/signup' role="button">Sign up</Link>
                        </form>:<button className='btn btn-primary' onClick={handleLogout}>Log out</button>}
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar
