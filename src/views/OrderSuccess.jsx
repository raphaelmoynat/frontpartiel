import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function OrderSuccess() {
    const navigate = useNavigate();
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {navigate('/login')}
    }, [navigate])

    return (
        <div className="container mt-5">
            <div className="card border-success shadow-sm">
                <div className="card-body text-center p-4">
                    <h2 className="card-title mb-3">Commande validée</h2>
                    <p className="card-text mb-4">Votre commande a été traitée avec succès.</p>
                    <div className="d-grid gap-3 mt-4">
                        <Link to="/my-orders" className="btn btn-primary btn-lg d-flex align-items-center justify-content-center gap-2">
                           Voir mes commandes
                        </Link>

                        <Link to="/" className="btn btn-secondary d-flex align-items-center justify-content-center gap-2">
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default OrderSuccess;
