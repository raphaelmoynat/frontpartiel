import './App.css'
import Navbar from './components/Navbar'
import Home from "./views/Home.jsx";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from "./views/Login.jsx";
import {AuthProvider} from "./context/AuthContext.jsx";
import Register from "./views/Register.jsx";


function App() {



    return (
        <>
            <AuthProvider>
                <Router>
                    <Navbar/>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="register" element={<Register />} />

                    </Routes>


                </Router>
            </AuthProvider>

        </>
    )
}

export default App