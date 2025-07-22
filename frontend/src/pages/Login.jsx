import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import axiosInstance from '../utils/axios'
import { useState } from 'react'

const Login = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      const res = await axiosInstance.post('/auth/login', dataObj)
      setError(false)
      console.log('Token:', res.data.token)
      console.log('Saving token to localStorage')
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      console.log(err)
      setError(true)
    }
  }

  return (
    <>
      <div className="text-center mt-5">
        <form
          style={{
            maxWidth: '350px',
            margin: 'auto',
            background: '#f8f9fa',
            padding: '2rem',
            borderRadius: '10px',
            boxShadow: '0 2px 8px rgba(0,0,0,0.07)'
          }}
          onSubmit={handleLogin}
        >
          <Link to="/">
            <img className="mt-4 mb-2" src={logo} height="72px" alt="Logo" />
          </Link>
          <h1 className="mt-2 mb-3 fw-normal" style={{ fontSize: '2rem', color: '#333' }}>
            Please log in
          </h1>
          <input
            type="email"
            name="email"
            className="form-control mb-3"
            placeholder="Email Address"
            required
            autoFocus="true"
            autoComplete="email"
            style={{ fontSize: '1rem' }}
          />
          <input
            type="password"
            name="password"
            className="form-control mb-3"
            placeholder="Password"
            required
            autoComplete="current-password"
            style={{ fontSize: '1rem' }}
          />
          <div className="mt-4">
            <button
              type="submit"
              className="btn btn-lg btn-primary w-100"
              style={{ fontWeight: 'bold', letterSpacing: '1px' }}
            >
              Log in
            </button>
            <p className="mt-3" style={{ fontSize: '0.95rem' }}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </p>
          </div>
        </form>
        {error && (
          <div className="alert alert-danger col-6 col-md-2 m-auto mt-3">
            Incorrect email or password
          </div>
        )}
      </div>
    </>
  )
}

export default Login