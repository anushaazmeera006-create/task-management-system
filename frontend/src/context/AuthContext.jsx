import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const API_URL = import.meta.env.PROD 
  ? 'https://task-management-system-1-hmcw.onrender.com' 
  : 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL
})

const AuthContext = createContext()

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    const checkAuth = async () => {
      const storedToken = localStorage.getItem('token')
      if (storedToken) {
        try {
          const response = await api.get('/api/auth/me', {
            headers: { Authorization: `Bearer ${storedToken}` }
          })
          setUser(response.data.user)
          setToken(storedToken)
        } catch (error) {
          localStorage.removeItem('token')
          setToken(null)
        }
      }
      setLoading(false)
    }
    checkAuth()
  }, [])

  const login = async (email, password) => {
    const response = await api.post('/api/auth/login', { email, password })
    localStorage.setItem('token', response.data.token)
    setToken(response.data.token)
    setUser(response.data.user)
    return response.data
  }

  const signup = async (name, email, password) => {
    const response = await api.post('/api/auth/signup', { name, email, password })
    localStorage.setItem('token', response.data.token)
    setToken(response.data.token)
    setUser(response.data.user)
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, token, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
