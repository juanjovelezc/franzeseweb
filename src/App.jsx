import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Historia from './pages/Historia'
import Movimientos from './pages/Movimientos'
import Miembros from './pages/Miembros'
import MapaJerarquico from './pages/MapaJerarquico'
import Spots from './pages/Spots'
import Admin from './pages/Admin'
import Login from './pages/Login'
import Protected from './components/Protected'
import MemberProfile from './components/MemberProfile'

export default function App(){
  return (
    <Router>
      <div className="app-shell">
        <Sidebar />
        <main className="main">
          <MemberProfile />
          <Routes>
            <Route path="/" element={<Historia />} />
            <Route path="/movimientos" element={<Movimientos />} />
            <Route path="/miembros" element={<Miembros />} />
            <Route path="/mapa" element={<MapaJerarquico />} />
            <Route path="/spots" element={<Spots />} />
            <Route path="/admin" element={<Protected><Admin /></Protected>} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}
