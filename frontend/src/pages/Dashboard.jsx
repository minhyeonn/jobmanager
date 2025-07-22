import { Link, useNavigate } from 'react-router-dom'
import logo from '../assets/letter-j.png'
import axiosInstance from '../utils/axios'
import { useState } from 'react'

const Signup = () => {
  const navigate = useNavigate()
  const [error, setError] = useState(false)

  const handleSignup = async (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const dataObj = Object.fromEntries(data)

    try {
      const res = await axiosInstance.post('/auth/register', dataObj)
      setError(false)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      setError(true)
    }
  }

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: '100vh', background: '#eef2f7' }}>
      <div style={{
        width: '100%',
        maxWidth: 400,
        background: '#fff',
        borderRadius: 12,
        boxShadow: '0 4px 16px rgba(0,0,0,0.08)',
        padding: '2.5rem 2rem'
      }}>
        <div className="text-center mb-4">
          <Link to="/">
            <img src={logo} height="64px" alt="Logo" style={{ borderRadius: '50%', background: '#e9ecef', padding: '8px' }} />
          </Link>
          <h2 className="mt-3 mb-2" style={{ fontWeight: 600, color: '#222' }}>Sign Up</h2>
          <p style={{ color: '#666', fontSize: '1rem' }}>Create your account to start managing jobs.</p>
        </div>
        <form onSubmit={handleSignup}>
          <div className="mb-3">
            <label htmlFor="name" style={{ fontWeight: 500, color: '#444' }}>Name</label>
            <input
              type="text"
              name="name"
              id="name"
              className="form-control"
              placeholder="Your Name"
              required
              style={{ fontSize: '1rem', marginTop: '4px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="email" style={{ fontWeight: 500, color: '#444' }}>Email</label>
            <input
              type="email"
              name="email"
              id="email"
              className="form-control"
              placeholder="Email Address"
              required
              autoComplete="email"
              style={{ fontSize: '1rem', marginTop: '4px' }}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" style={{ fontWeight: 500, color: '#444' }}>Password</label>
            <input
              type="password"
              name="password"
              id="password"
              className="form-control"
              placeholder="Password"
              required
              autoComplete="new-password"
              style={{ fontSize: '1rem', marginTop: '4px' }}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary w-100"
            style={{ fontWeight: 'bold', letterSpacing: '1px', fontSize: '1.1rem', marginTop: '10px' }}
          >
            Sign up
          </button>
          <p className="mt-3 text-center" style={{ fontSize: '0.95rem' }}>
            Already have an account? <Link to="/login">Log in</Link>
          </p>
        </form>
        {error && (
          <div className="alert alert-danger mt-3 text-center">
            Could not sign up. Please try again.
          </div>
        )}
      </div>
    </div>
  )
}

export default Signup