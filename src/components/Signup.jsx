import { useContext, useState} from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

function Signup({showAlert}) {

  const [user, setUser] = useState({name:"" , email: "", password: "" });
  const navigate = useNavigate();
  const {dark} = useContext(ThemeContext);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = 'http://localhost:5000/api/auth/createUser';
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name: user.name , email: user.email, password: user.password })
    });
    const json = await response.json();
    console.log(json.authToken);
    if (json.success) {
      // save the auth token and redirect
      localStorage.setItem('token', json.authToken);
      navigate('/');
      showAlert("User Register Successfully" , "success");
    } else {
      showAlert("Invalid Credentials" , "danger");
    }
  }

  const onChange = (e) => {

    setUser({ ...user, [e.target.name]: e.target.value }); // whatewere is change is set to there name
  }
  return (
    <div className="container d-flex justify-content-center align-items-center" >
    <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" , backgroundColor: dark?'rgb(27, 28, 28)':''  }}>
        <h2 className="text-center mb-4" style={{color: dark?'white':'black'}}>Sign up to continue with iNotebook</h2>
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label" style={{color: dark?'white':'black'}}>Name</label>
                <input type="text" className="form-control" id="name" name="name" placeholder="Enter your name" style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label" style={{color: dark?'white':'black'}}>Email</label>
                <input type="email" className="form-control" id="email" name="email" placeholder="name@example.com" style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} onChange={onChange} required />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label" style={{color: dark?'white':'black'}}>Password</label>
                <input type="password" className="form-control" name="password" id="password" style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} onChange={onChange} minLength={5} required />
            </div>
            <button className="btn btn-dark w-100" type="submit">Sign up</button>
        </form>
    </div>
</div>

  )
}

export default Signup
