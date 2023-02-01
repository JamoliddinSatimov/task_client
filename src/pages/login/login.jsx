import { useContext, useEffect, useRef } from "react"
import { Link, useNavigate } from "react-router-dom"
import user from "../../assets/user.png"
import { AuthContext } from "../../context/auth-context"

const Login = () => {

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
        const username = e.target?.login_username?.value
        const password = e.target?.login_password?.value

        fetch('http://localhost:9090/login', {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin":"/*"
            },
            body: JSON.stringify({
                username, password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setToken(data.access_token)
                navigate("/dashboard")
            }else if(data.status == 503){
                warningRef.current.textContent = "user did not exists"
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
                <h1 className="login-form-title">sign in</h1>
                <input type="text" className="login-form-input" name = "login_username" placeholder="Username" required />
                <input type="password" className="login-form-input" name = 'login_password' placeholder="Password" required />
                <button type="submit" className="login-btn">Login</button>
                <div ref={warningRef}  className="warning">warning</div>
                <div className="form-links">
                    <Link to="#">help us</Link>
                    <Link to="/">to register</Link>
                </div>
                </form>
        </section>
    )
}

export default Login