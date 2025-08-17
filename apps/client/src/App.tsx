import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/HomePage"
import RegisterPage from "./pages/RegisterPage"
import LoginPage from "./pages/LoginPage"
import ProfilePage from "./pages/ProfilePage"
import NotificationsPage from "./pages/NotificationsPage"
import MessagesPage from "./pages/MessagesPage"
import { LandingPage } from "./pages/LandingPage"

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<HomePage />} />
      <Route path="/register" element={<RegisterPage/>} />
      <Route path="/login" element={<LoginPage/>} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/notifications" element={<NotificationsPage/>} />
      <Route path="/messages" element={<MessagesPage/>} />
    </Routes>
  )
}

export default App
