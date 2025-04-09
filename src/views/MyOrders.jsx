import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

function MyOrders() {
    const [orders, setOrders] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        const fetchOrders = async () => {
            const token = localStorage.getItem('token')
            if (!token) {
                navigate('/login')
            }

            try {
                const response = await axios.get('https://backendpartiel.raphaelmoynat.com/api/orders/my-orders',
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                )
                setOrders(response.data.orders);
            } catch (error) {
                console.error(error);
            }
        }
        fetchOrders();
    }, [navigate])


    return (
        <div className="container mt-3 mb-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h3 className="mb-0">Mes commandes</h3>
                <Link to="/" className="btn btn-primary">Retour</Link>
            </div>

            {orders.length === 0 ? (
                <div className="card shadow-sm">
                    <div className="card-body text-center p-4">
                        <p className="mb-3">Vous n'avez pas encore passé de commande</p>
                        <Link to="/scan" className="btn btn-primary">Accueil</Link>
                    </div>
                </div>
            ) : (
                <div className="list-group">
                    {orders.map((order) => (
                        <div key={order.id} className="card mb-3 shadow-sm">
                            <div className="card-header bg-light d-flex justify-content-between align-items-center">
                                <span className="fw-bold">Commande id : {order.id}</span>
                                <span className="badge bg-success">Total :{order.totalAmount} €</span>
                            </div>
                            <div className="card-body">
                                <ul className="list-group list-group-flush mb-3">
                                    {order.items.map((item, index) => (
                                        <li key={index} className="list-group-item d-flex justify-content-between align-items-center px-0">
                                            <div>
                                                <span className="fw-medium">{item.productName}</span>
                                                <div className="small text-muted">
                                                    {item.quantity} x {item.unitPrice} €
                                                </div>
                                            </div>
                                            <span>{item.subtotal} €</span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="d-grid">
                                    <button className="btn btn-sm btn-secondary">Détails de la commande</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default MyOrders;
