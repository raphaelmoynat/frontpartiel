import {useContext, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import {AuthContext} from "../context/AuthContext.jsx";

function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()
    const { login } = useContext(AuthContext)

    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await axios.post('https://backendpartiel.raphaelmoynat.com/api/login', {
                username,
                password
            })
            login(username, response.data.token)
            console.log('réussi')
            navigate('/')

        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className="container mt-5">
            <h1 className="text-center">Connexion</h1>
            <form onSubmit={handleLogin} className="card p-4 shadow-sm">
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
                <button type="submit" className="btn btn-primary w-100">
                    Se connecter
                </button>
            </form>
        </div>
    )
}

export default Login