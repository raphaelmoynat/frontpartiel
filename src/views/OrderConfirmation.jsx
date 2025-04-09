import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { CartContext } from '../context/CartContext';
import axios from "axios"; // Ajustez le chemin selon votre structure

function OrderConfirmation() {
    const location = useLocation();
    const navigate = useNavigate();
    const { clearCart } = useContext(CartContext);
    const { orderItems, orderTotal } = location.state || {};
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [confirmationStatus, setConfirmationStatus] = useState(null);

    const token = localStorage.getItem('token')

    const handleConfirmOrder = async () => {
        console.log(token)
        setIsSubmitting(true)
        try {
            const orderData = {
                items: orderItems.map(item => ({
                    productId: item.id,
                    quantity: item.quantity
                }))
            };
            console.log(orderData);
            const response = await axios.post(
                'https://backendpartiel.raphaelmoynat.com/api/orders/create',
                orderData,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            const data = response.data;
            setConfirmationStatus('success');
            clearCart();

            setTimeout(() => {
                navigate('/order-success');
            }, 2000);

        } catch (error) {
            console.error(error);
            setConfirmationStatus('error');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!orderItems) {
        return (
            <div className="container text-center">
                <h2>Aucune commande</h2>
                <Link to="/cart" className="btn btn-primary mt-3">
                    Retour au panier
                </Link>
            </div>
        );
    }

    return (
        <div className="container mt-3 mb-4">
            <div className="card border-success mb-4">
                <div className="card-header bg-success text-white">
                    <h3 className="my-2 text-center">Récapitulatif de votre commande</h3>
                </div>
                <div className="card-body">
                <h5 className="text-center">Articles commandés</h5>
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                            </tr>
                            </thead>
                            <tbody>
                            {orderItems.map((item) => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price} €</td>
                                    <td>{item.quantity}</td>
                                    <td>{(item.price * item.quantity)} €</td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="d-flex justify-content-between mt-4">
                            <h5>Total</h5>
                            <h4>{orderTotal} €</h4>
                    </div>

                    {confirmationStatus === 'success' && (
                        <div className="alert alert-success mt-3">
                            Commande créée redirection en cours...
                        </div>
                    )}

                    {confirmationStatus === 'error' && (
                        <div className="alert alert-danger mt-3">
                            Erreur voir logs
                        </div>
                    )}
                </div>
                <div className="card-footer">
                    <div className="d-flex justify-content-between">
                        <Link to="/cart" className="btn btn-secondary me-2">
                            Retour
                        </Link>

                        <button
                            className="btn btn-success"
                            onClick={handleConfirmOrder}
                            disabled={isSubmitting}
                        >
                            {isSubmitting ? (
                                <>
                                    <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                    Traitement en cours...
                                </>
                            ) : (
                                'Confirmer'
                            )}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderConfirmation;
