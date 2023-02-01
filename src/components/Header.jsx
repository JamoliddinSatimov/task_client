import { useState, useRef, useContext } from "react"
import {Link} from "react-router-dom"

import mainLogo from '../assets/logo.png'
import user from "../assets/user.png"
import { AuthContext } from "../context/auth-context"
import Modal from "./modal/modal"



export const Header = () => {

    const {token} = useContext(AuthContext)
    const [addModal, setAddModal ] = useState(false)
    const warningRef = useRef()

    const openModal = () => {
        setAddModal(true)
    }

    const updateAllData = (e) => {
        e.preventDefault()

        const first_name = e.target?.first_name.value
        const last_name = e.target?.last_name.value
        const username = e.target?.username.value
        const password = e.target?.password.value


        fetch("http://localhost:9090/update", {
            method: "PUT",
            headers: {
                access_token: token,
                "Content-Type": "application/json"
            },
            body:JSON.stringify({
                first_name, last_name, username, password
            })
        }).then(res => res.json()).then(data => {
            if (data.success) {
                setAddModal(false)
            }else{
                warningRef.current.textContent = data.message
                warningRef.current.style.display = "block"
            }
        })
        .catch(err => console.log(err))
    }
    

    return <>
        <section className="header">
            <div className="header-navbar">
                <div className="header-logo">
                    <a href="#"><img src={ mainLogo } alt="Logo" width={"150px"} /></a>
                </div>
                <ul className='header-nav-menu'>
                    <li className='header-nav-item'><Link to="#">Home</Link></li>
                    <li className='header-nav-item'><Link to="#">Admin</Link></li>
                    <div className="user-profile">
                        <p onClick={openModal}>Tahrirlash</p><img src={user} alt="rasm bor" width={"30px"} height={"30px"} />
                    </div>
                    {
                        addModal? <Modal title={"Ma'lumotlarni yangilash"} modal={addModal} setAddModal={setAddModal}>
                            <form autoComplete="off" onSubmit={updateAllData} className="add-form">
                                <div className="update-inputs">
                                    <input type="text" className="update-input" name = "first_name" placeholder="First Name"  />
                                    <input type="text" className="update-input" name = 'last_name' placeholder="Last Name"  />
                                    <input type="text" className="update-input" name = 'username' placeholder="Username"  />
                                    <input type="password" className="update-input" name = 'password' placeholder="Password"  />
                                </div>
                                <div ref={warningRef}  className="warning">warning</div>
                                <div className="add-form-footer">
                                    <button type="button" className="cancel-btn" onClick={()=>setAddModal(false)}>cancel</button>
                                    <button className="submit-btn">Create</button>
                                </div>
                            </form>
                        </Modal>:""
                    }
                </ul>
            </div>
        </section>
    </>
}