import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [msg, setMsg] = useState('')
  const nav = useNavigate()

  const doSignIn = async (e)=>{
    e.preventDefault()
    setMsg('')
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    if(error){ setMsg(error.message); return }
    nav('/admin')
  }
  const doSignUp = async (e)=>{
    e.preventDefault()
    setMsg('')
    const { error } = await supabase.auth.signUp({ email, password })
    if(error){ setMsg(error.message); return }
    setMsg('Usuario creado. Verifica tu correo si se requiere confirmación. Luego inicia sesión.')
  }

  return (
    <section style={{maxWidth:420}}>
      <h2 style={{fontSize:24, marginBottom:16}}>Acceso administrativo</h2>
      <form onSubmit={doSignIn} className="paper">
        <label style={{display:'block', marginBottom:10}}>
          <div style={{fontSize:12}}>Email</div>
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} style={{width:'100%'}} required />
        </label>
        <label style={{display:'block', marginBottom:10}}>
          <div style={{fontSize:12}}>Contraseña</div>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} style={{width:'100%'}} required />
        </label>
        <div style={{display:'flex', gap:8}}>
          <button type="submit">Entrar</button>
          <button onClick={doSignUp} type="button">Crear usuario</button>
        </div>
        {msg && <div style={{marginTop:12, color:'#fca5a5'}}>{msg}</div>}
      </form>
    </section>
  )
}
