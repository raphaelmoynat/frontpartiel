import './App.css';
import Navbar from './components/Navbar';
import Home from "./views/Home.jsx";
import {BrowserRouter as Router, Routes, Route, Navigate} from 'react-router-dom';
import Login from "./views/Login.jsx";
import {AuthContext, AuthProvider} from "./context/AuthContext.jsx";
import Register from "./views/Register.jsx";
import {useContext} from "react";
import ProtectedRoute from "./components/ProtectedRoutes.jsx";
import {CartProvider} from "./context/CartContext.jsx";
import Cart from "./components/Cart.jsx";
import OrderConfirmation from "./views/OrderConfirmation.jsx";
import MyOrders from "./views/MyOrders.jsx";
import OrderSuccess from "./views/OrderSuccess.jsx";

const ConditionalRedirect = () => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Navigate to="/scan" /> : <Navigate to="/" />;
};

const ConditionalAuth = ({ children }) => {
    const { currentUser } = useContext(AuthContext);
    return currentUser ? <Navigate to="/scan" /> : children;
};

function App() {


    return (
        <AuthProvider>
            <CartProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/scan" element={<ProtectedRoute> <Home /> </ProtectedRoute>} />
                        <Route path="/" element={<ConditionalAuth><Login /></ConditionalAuth>} />
                        <Route path="/register" element={ <Register />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/order-confirmation" element={<OrderConfirmation />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/my-orders" element={<MyOrders />} />
                    </Routes>
                </Router>
            </CartProvider>
        </AuthProvider>
    );
}


export default App;
