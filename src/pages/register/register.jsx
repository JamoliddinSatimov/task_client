import {useContext, useEffect, useRef} from 'react'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../context/auth-context'

import user from "../../assets/user.png"
import { Link } from 'react-router-dom'


const Register = () => {

    const {token, setToken} = useContext(AuthContext)
    const navigate = useNavigate("")
    const warningRef = useRef()

    useEffect(() => {
        if (token) {
            navigate("/dashboard")
        }
    }, [])

    const getData = (e) => {
        e.preventDefault()
        const username = e.target?.username?.value
        const first_name = e.target?.first_name?.value
        const last_name = e.target?.last_name?.value
        const password = e.target?.password?.value

        fetch('http://localhost:9090/register', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"/*"
            },
            body: JSON.stringify({
                first_name, last_name, username, password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setToken(data.access_token)
                navigate("/dashboard")
            }else if( data.status == 503 ){
                warningRef.current.textContent = "the username already exists"
                warningRef.current.style.display = "block"
            }else{
                warningRef.current.textContent = data.message
                warningRef.current.style.display = "block"
            }
        })
        .catch(err => console.log(err))

    }

    return (
        <section className="login">
            <form className="login-form" onSubmit={getData}  autoComplete="off">
                <div className="form-box"><img src={user} alt="user icon" width={'50px'} height = {"50px"} className="form-icon"/></div>
                <h1 className="login-form-title">sign up</h1>
                <input type="text" className="login-form-input" name = "first_name" placeholder="First Name" required />
                <input type="text" className="login-form-input" name = "last_name" placeholder="Last Name" required />
                <input type="text" className="login-form-input" name = "username" placeholder="Username" required />
                <input type="password" className="login-form-input" name = 'password' placeholder="Password" required />
                <button type="submit" className="login-btn">Register</button>
                <div ref={warningRef}  className="warning">warning</div>
                <div className="form-links">
                    <Link to="#">help us</Link>
                    <Link to="/login">to login</Link>
                </div>
                </form>
        </section>
    )
}

export default Register