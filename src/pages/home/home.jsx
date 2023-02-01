import { useContext, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Header } from "../../components/Header"
import { AuthContext } from "../../context/auth-context"


const Home = () => {

    const navigate = useNavigate()
    const {token} = useContext(AuthContext)

    useEffect(() => {
        if (!token) {
            navigate("/login")
        }
    }, [])

    return (
        <div className="home-page">
            <Header/>        
        </div>
    )
}

export default Home