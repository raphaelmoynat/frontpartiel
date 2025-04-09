import {Link, useNavigate} from "react-router-dom";
import {useContext} from 'react'
import {AuthContext} from "../context/AuthContext.jsx";
import {CartContext} from "../context/CartContext.jsx";

function Navbar() {
    const { currentUser, logout } = useContext(AuthContext)
    const navigate = useNavigate()


    const handleLogout = () => {
        logout()
        navigate('/')

    }

    return (
        <>
            <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
                <div className="container">
                    <a href="" className="navbar-brand">Scan App</a>

                    <button
                        className="navbar-toggler"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav ms-auto">

                            {currentUser ? (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" onClick={handleLogout}>
                                            Logout
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/scan">
                                            Scan
                                        </Link>
                                    </li>
                                    <li className="nav-item">

                                        <Link to="/cart" className="nav-link">
                                            Panier
                                        </Link>

                                    </li>
                                    <li className="nav-item">

                                        <Link to="/my-orders" className="nav-link">
                                            Mes commandes
                                        </Link>

                                    </li>
                                </>


                            ) : (
                                <>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/">
                                        Login
                                        </Link>
                                    </li>
                                    <li className="nav-item">
                                        <Link className="nav-link" to="/register">
                                            Register
                                        </Link>
                                    </li>
                                </>
                            )}


                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )

}

export default Navbar;