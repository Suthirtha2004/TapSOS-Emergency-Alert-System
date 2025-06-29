import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import LandingPage from './Pages/LandingPage'
import Login from './Pages/Login'
import DetailsPage from './Pages/DetailsPage'
import Tap from './Pages/Tap'
import UserProfile from './Pages/UserProfile'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/details" element={<DetailsPage />} />
        <Route path="/tap" element={<Tap />} />
        <Route path="/userprofile" element={<UserProfile />} />
      </Routes>
    </Router>
  )
}

export default App
