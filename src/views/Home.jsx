import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Home = () => {
    const { currentUser } = useContext(AuthContext);
    const isLoggedIn = !!currentUser;

    return (
        <div className="container mt-5">
            <div className="jumbotron">
                <h1 className="text-center mb-4">Welcome to my app</h1>
                {!isLoggedIn ? (
                    <div className="text-center">
                        <p>Please log in</p>
                        <Link to="/login" className="btn btn-primary">Login</Link>
                        <Link to="/register" className="btn btn-secondary ms-2">Register</Link>
                    </div>
                ) : (
                    <div className="text-center">
                        <p>You are logged in as {currentUser}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Home;