import { Route, Routes } from "react-router-dom"
import Home from "./pages/home/home"
import Login from "./pages/login/login"
import NotFound from "./pages/not-found/notFound"
import Register from "./pages/register/register"
import "./App.css"

function App() {

  return (
    <div className="App">

      <Routes>
        <Route path="/" element= {<Register/>}/>
        <Route path="/dashboard" element={<Home/>}/>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/*" element={<NotFound />}></Route>
      </Routes>
      
    </div>
  )
}
export default App