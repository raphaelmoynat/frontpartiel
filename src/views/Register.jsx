import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Register() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate();
    const [error, setError] = useState('')

    async function handleRegister(e) {
        e.preventDefault();
        try {
            const response = await axios.post('https://backendpartiel.raphaelmoynat.com/register', {
                username,
                password
            })
            setUsername('')
            setPassword('')
            console.log("inscription réussie")

            navigate('/login');

        } catch (error) {
            console.log(error);
            setError( "Une erreur s'est produite")
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Inscription</h1>
            {error && (
                <div className="alert alert-danger" role="alert">
                    {error}
                </div>
            )}
            <form onSubmit={handleRegister} className="card p-4 shadow-sm">
                <div className="mb-3">
                    <label className="form-label">
                        Nom d'utilisateur
                    </label>
                    <input
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="Nom d'utilisateur"
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">
                        Mot de passe
                    </label>
                    <input
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        type="password"
                        className="form-control"
                        placeholder="Mot de passe"
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    S'inscrire
                </button>
            </form>
        </div>
    )
}

export default Register