import { createContext, useState } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(localStorage.getItem('user'))

    const login = (username, token) => {
        localStorage.setItem('user', username)
        localStorage.setItem('token', token)
        setCurrentUser(username)
    }

    const logout = () => {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
        setCurrentUser(null)
    }

    return (
        <AuthContext.Provider value={{ currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}