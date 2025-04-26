import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { AuthProvider } from './context/AuthContext'
import Login from './pages/login/Login'
import Cadastro from './pages/cadastro-usuario/Cadastro'
import Home from './components/home/Home'
import Fans from './pages/fans/Fans'
import Perfil from './pages/perfil/Perfil'

function App() {
  return (
    <>
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/home" element={<Home/>} />
            <Route path="/fans" element={<Fans/>} />
            <Route path="/perfil" element={<Perfil/>} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
