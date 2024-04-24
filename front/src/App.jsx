import './App.scss'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/pages/Login/Login'
import Inscription from './components/pages/Inscription/Inscription';
import Films from './components/pages/Films/Films';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/inscription' element={<Inscription />} />
        <Route path='/films' element={<Films />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
