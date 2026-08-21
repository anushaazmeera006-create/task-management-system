import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const { darkMode } = useTheme()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={`min-h-screen flex items-center justify-center ${darkMode ? 'bg-violet-950' : 'bg-gradient-to-br from-violet-50 to-violet-100'}`}>
      <div className={`max-w-md w-full mx-4 p-8 rounded-2xl shadow-xl ${darkMode ? 'bg-violet-900' : 'bg-white'}`}>
        <h1 className={`text-3xl font-bold text-center mb-8 ${darkMode ? 'text-white' : 'text-violet-900'}`}>Welcome Back</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              required
            />
          </div>

          <div>
            <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-violet-200' : 'text-gray-700'}`}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full px-4 py-3 rounded-lg border focus:ring-2 focus:ring-violet-500 focus:border-transparent outline-none transition ${darkMode ? 'bg-violet-800 border-violet-700 text-white' : 'bg-gray-50 border-gray-300'}`}
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className={`text-center mt-6 ${darkMode ? 'text-violet-300' : 'text-gray-600'}`}>
          Don't have an account?{' '}
          <Link to="/signup" className="text-violet-600 hover:text-violet-700 font-semibold">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  )
}

export default Login
