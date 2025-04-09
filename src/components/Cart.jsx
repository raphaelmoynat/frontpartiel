import { useContext } from 'react'
import { CartContext } from '../context/CartContext'
import {Link, useNavigate} from 'react-router-dom'

function Cart() {
    const { cart, removeFromCart, updateQuantity, clearCart, getTotalPrice } = useContext(CartContext)
    const navigate = useNavigate()

    if (cart.length === 0) {
        return (
            <div className="container py-5 text-center">
                <h1>Panier vide</h1>
                <Link to="/scan" className="btn btn-primary mt-3">
                    Retour au scan
                </Link>
            </div>
        )
    }

    const goConfirmation = () => {
        if (cart.length > 0) {
            navigate('/order-confirmation', {
                state: {
                    orderItems: cart,
                    orderTotal: getTotalPrice()
                }
            });
        }
    };

    return (
        <div className="container my-3">
            <h2 className="mb-4 text-center">Panier</h2>
            <div className="d-block d-md-none">
                {cart.map(item => (
                    <div className="card mb-3" key={item.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content-between mb-1">
                                <h5>{item.name}</h5>
                                <span>prix : {item.price} €</span>
                            </div>

                            <div className="d-flex justify-content-between align-items-center mb-2">
                                <span>Quantité:</span>
                                <div className="input-group" style={{maxWidth: "120px"}}>
                                    <button className="btn btn-secondary" type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))}>
                                        -
                                    </button>
                                    <div className="text-center mx-2 align-content-center">{item.quantity}</div>
                                    <button className="btn btn-secondary" type="button" onClick={() => updateQuantity(item.id, Math.max(1, item.quantity + 1))}>
                                        +
                                    </button>
                                </div>
                            </div>

                            <div className="d-flex justify-content-between mb-3">
                                <span>Total:</span>
                                <strong>{(item.price * item.quantity)} €</strong>
                            </div>

                            <button
                                className="btn btn-danger btn-sm w-100"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="card mb-4 d-none d-md-block">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-hover">
                            <thead>
                            <tr>
                                <th>Produit</th>
                                <th>Prix</th>
                                <th>Quantité</th>
                                <th>Total</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody>
                            {cart.map(item => (
                                <tr key={item.id}>
                                    <td>{item.name}</td>
                                    <td>{item.price.toFixed(2)} €</td>
                                    <td>
                                        <div className="input-group" style={{ maxWidth: "120px" }}>
                                            <input
                                                type="number"
                                                className="form-control text-center"
                                                value={item.quantity}
                                                onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
                                                min="1"
                                            />
                                        </div>
                                    </td>
                                    <td>{(item.price * item.quantity)} €</td>
                                    <td>
                                        <button className="btn btn-danger btn-sm"
                                            onClick={() => removeFromCart(item.id)}
                                        >
                                            Supprimer
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="card mb-4">
                <div className="card-body">
                    <h5>Récapitulatif</h5>
                    <div className="d-flex justify-content-between mb-3">
                        <span>Total:</span>
                        <strong>{getTotalPrice()} €</strong>
                    </div>
                    <div className="d-grid gap-2">
                        <button
                            className="btn btn-success"
                            onClick={goConfirmation}
                            disabled={cart.length === 0}
                        >Valider panier
                        </button>
                        <button className="btn btn-danger" onClick={clearCart}>Vider panier</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart;
