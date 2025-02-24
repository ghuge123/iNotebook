
import  { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';


function Login({ showAlert }) {
    const [user, setUser] = useState({ email: "", password: "" });

    const {dark} = useContext(ThemeContext);

    let navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        const url = 'http://localhost:5000/api/auth/login';
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjdiMGM1ODlkMDBmNzc2MmYyMjZhYmY2In0sImlhdCI6MTczOTY4OTcxNH0.yVn3p9MxWsrH28JgYnyoxgNJvEHLDc9_1GsLnacny7c'
            },
            body: JSON.stringify({ email: user.email, password: user.password })
        });
        const json = await response.json();
        if (json.success) {
            // save the auth token and redirect
            localStorage.setItem('token', json.authToken);
            navigate('/');
            showAlert("Login Successfully", "success");
        } else {
            showAlert("Invalid Credentials", "danger");
        }
    }


    const onChange = (e) => {

        setUser({ ...user, [e.target.name]: e.target.value }); // whatewere is change is set to there name
    }
    return (
        <div className="container d-flex justify-content-center align-items-center mt-4" >
            <div className="card p-4 shadow-lg rounded-4" style={{ width: "400px" , backgroundColor: dark?'rgb(27, 28, 28)':'' }}>
                <h2 className="text-center mb-4" style={{color: dark?'white':'black'}}>Login to continue with iNotebook</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label" style={{color: dark?'white':'black'}}>Email</label>
                        <input type="email" className="form-control" id="email" name="email" style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}}  onChange={onChange} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label" style={{color: dark?'white':'black'}}>Password</label>
                        <input type="password" className="form-control" name="password" id="password" style={{backgroundColor: dark?'black':'white' , color: dark?'white':'black'}} onChange={onChange} minLength={5} required />
                    </div>
                    <button className="btn btn-dark w-100" type="submit">Login</button>
                </form>
            </div>
        </div>

    )
}

export default Login
