import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { supabase } from '../lib/supabaseClient'

export default function Sidebar(){
  const { user } = useAuth()
  const nav = useNavigate()
  const cls = ({isActive}) => (isActive ? 'bg-[rgba(43,108,176,0.18)]' : '')
  return (
    <aside className="sidebar">
      <div className="mb-4">
        <div style={{fontSize:12, color:'#9ae6b4', letterSpacing:2}}>FEDERAL INVESTIGATIVE ARCHIVE</div>
        <div style={{fontWeight:'bold', fontSize:24, color:'#fff', marginTop:8}}>DOSSIER</div>
        <div style={{fontSize:12, color:'#9aa9b8', marginTop:4}}>Confidential — Authorized Personnel Only</div>
      </div>
      <nav>
        <NavLink to="/" className={cls}>Historia</NavLink>
        <NavLink to="/movimientos" className={cls}>Movimientos bélicos</NavLink>
        <NavLink to="/miembros" className={cls}>Posibles miembros</NavLink>
        <NavLink to="/mapa" className={cls}>Mapa Jerárquico</NavLink>
        <NavLink to="/spots" className={cls}>Spots</NavLink>
        <NavLink to="/admin" className={cls}>Admin</NavLink>
      </nav>
      <div style={{marginTop:16}}>
        {user ? (
          <button onClick={async()=>{ await supabase.auth.signOut(); nav('/'); }} style={{padding:'6px 10px', border:'1px solid #ef4444', borderRadius:6, color:'#fff', background:'#ef4444'}}>Salir</button>
        ) : (
          <NavLink to="/login">Login</NavLink>
        )}
      </div>
    </aside>
  )
}
