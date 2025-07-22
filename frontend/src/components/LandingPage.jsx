import { Link, useNavigate } from 'react-router-dom'
import board from '../assets/Whiteboard.png'

const LandingPage = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => {
    const token = localStorage.getItem('token')
    if (token) {
      navigate('/dashboard')
    } else {
      navigate('/signup')
    }
  }

  return (
    <div className="container d-flex min-vh-100 align-items-center justify-content-center">
      <div className="row">
        <div className="col-12 col-md-6 me-md-5">
          <img className="w-100" src={board} />
        </div>
        <div className="col-md-5">
          <h1 className="display-1 text-center mt-4">JOB MANAGER</h1>
          <p className="mt-4">
            Take charge of your workday with Job Manager — the easiest way to organize, 
            track, and prioritize your tasks. Whether you're juggling freelance projects, 
            client work, or team assignments, our clean and intuitive dashboard keeps you 
            focused and on schedule. Add, update, and complete jobs effortlessly 
            — all in one place.
          </p>
          <p>
            Built for professionals who value clarity and control, Job Manager streamlines 
            your workflow so you can focus on getting things done. From job creation to 
            progress tracking, you’ll always know your next step. Start today and discover 
            a smarter, simpler way to manage your workload.
          </p>
          <button
            className="btn btn-lg btn-primary d-block"
            onClick={handleGetStarted}
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  )
}

export default LandingPage